import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { siteConfig } from '../src/site.config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const pageFiles = ['index.html', 'seller.html', 'advantages.html', 'buyer.html', 'contacts.html', 'policy.html'];
const baseUrl = new URL(`${siteConfig.baseUrl.replace(/\/$/, '')}/`);
const errors = [];
const pages = new Map();
const files = new Map();
let referenceCount = 0;

function check(condition, message) {
  if (!condition) errors.push(message);
}
function decode(value = '') {
  return value.replace(/&(?:amp|quot|apos|lt|gt);|&#(?:x[\da-f]+|\d+);/gi, (entity) => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    return String.fromCodePoint(entity[2].toLowerCase() === 'x' ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10));
  });
}
function attributes(source) {
  const values = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of source.matchAll(pattern)) values[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  return values;
}
// A small tag reader is sufficient for these generated documents. Quoted >
// characters and comments are consumed as a unit; SVG elements retain parents.
function parse(html) {
  const nodes = [];
  const stack = [];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const tags = /<!--[\s\S]*?-->|<![^>]*>|<\/?([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi;
  for (const match of html.matchAll(tags)) {
    if (!match[1]) continue;
    const tag = match[1].toLowerCase();
    if (match[0].startsWith('</')) {
      const index = stack.findLastIndex((node) => node.tag === tag);
      if (index >= 0) {
        stack[index].contentEnd = match.index;
        stack.splice(index);
      }
      continue;
    }
    const node = { tag, attrs: attributes(match[2]), parent: stack.at(-1), contentStart: match.index + match[0].length, contentEnd: match.index + match[0].length };
    nodes.push(node);
    if (!voidTags.has(tag) && !/\/\s*>$/.test(match[0])) stack.push(node);
  }
  return { html, nodes, ids: new Map(nodes.filter((node) => 'id' in node.attrs).map((node) => [node.attrs.id, node])) };
}
function inside(node, parent) {
  for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) if (ancestor === parent) return true;
  return false;
}
function textOf(page, node) {
  if (!node) return '';
  return decode(page.html.slice(node.contentStart, node.contentEnd).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}
function hasLabel(page, node) {
  if (!node?.attrs) return false;
  return page.nodes.some((label) => label.tag === 'label' && (inside(node, label) || (node.attrs.id && label.attrs.for === node.attrs.id)) && textOf(page, label));
}
function read(relative) {
  const target = path.resolve(dist, relative);
  if (!files.has(target)) files.set(target, readFile(target));
  return files.get(target);
}
async function checkReference(value, fromFile, description) {
  check(Boolean(value), `${fromFile}: ${description} has an empty URL.`);
  if (!value) return;
  let url;
  try { url = new URL(value, new URL(fromFile, baseUrl)); }
  catch { check(false, `${fromFile}: invalid ${description} URL "${value}".`); return; }
  check(url.protocol !== 'javascript:', `${fromFile}: ${description} uses a javascript: URL.`);
  if (url.origin !== baseUrl.origin || !url.pathname.startsWith(baseUrl.pathname)) return;
  let relative;
  try { relative = decodeURIComponent(url.pathname.slice(baseUrl.pathname.length)); }
  catch { check(false, `${fromFile}: malformed URL encoding in "${value}".`); return; }
  relative ||= 'index.html';
  const resolved = path.resolve(dist, relative);
  check(resolved.startsWith(`${dist}${path.sep}`), `${fromFile}: local ${description} escapes dist: "${value}".`);
  if (!resolved.startsWith(`${dist}${path.sep}`)) return;
  referenceCount++;
  try { await read(relative); }
  catch { check(false, `${fromFile}: missing local file for ${description} "${value}" (${relative}).`); return; }
  if (url.hash && relative.endsWith('.html')) {
    const destination = pages.get(relative);
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); }
    catch { check(false, `${fromFile}: malformed fragment in "${value}".`); return; }
    check(Boolean(destination?.ids.has(id)), `${fromFile}: ${description} "${value}" points to missing id="${id}" in ${relative}.`);
  }
}

for (const file of pageFiles) {
  try { pages.set(file, parse((await read(file)).toString('utf8'))); }
  catch { check(false, `Missing built page dist/${file}. Run npm run build first.`); }
}

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
for (const [file, page] of pages) {
  const byTag = (tag) => page.nodes.filter((node) => node.tag === tag);
  const metadata = (key, attr = 'name') => page.nodes.filter((node) => node.tag === 'meta' && node.attrs[attr] === key);
  check(byTag('html').length === 1 && byTag('html')[0].attrs.lang === 'kk', `${file}: document must declare lang="kk".`);
  const titleNodes = byTag('title');
  const title = textOf(page, titleNodes[0]);
  check(titleNodes.length === 1 && Boolean(title), `${file}: expected one nonempty <title>.`);
  check(!titles.has(title), `${file}: duplicate title "${title}".`);
  titles.add(title);
  const descriptionNodes = metadata('description');
  const description = descriptionNodes[0]?.attrs.content;
  check(descriptionNodes.length === 1 && Boolean(description), `${file}: expected one nonempty description meta tag.`);
  check(!descriptions.has(description), `${file}: duplicate meta description.`);
  descriptions.add(description);
  const canonicalNodes = page.nodes.filter((node) => node.tag === 'link' && node.attrs.rel?.split(/\s+/).includes('canonical'));
  const canonical = canonicalNodes[0]?.attrs.href;
  check(canonicalNodes.length === 1 && canonical === new URL(file, baseUrl).href, `${file}: canonical must match the configured absolute page URL.`);
  check(!canonicals.has(canonical), `${file}: duplicate canonical URL.`);
  canonicals.add(canonical);
  for (const property of ['og:type', 'og:locale', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height']) {
    const found = metadata(property, 'property');
    check(found.length === 1 && Boolean(found[0]?.attrs.content), `${file}: expected one nonempty ${property} meta tag.`);
  }
  check(metadata('og:title', 'property')[0]?.attrs.content === title, `${file}: og:title differs from the document title.`);
  check(metadata('og:description', 'property')[0]?.attrs.content === description, `${file}: og:description differs from the meta description.`);
  check(metadata('og:url', 'property')[0]?.attrs.content === canonical, `${file}: og:url differs from canonical.`);
  check(metadata('og:locale', 'property')[0]?.attrs.content === 'kk_KZ', `${file}: og:locale must be kk_KZ.`);
  const imageUrl = metadata('og:image', 'property')[0]?.attrs.content;
  if (imageUrl) {
    check(/^https?:\/\//.test(imageUrl), `${file}: og:image must use an absolute http(s) URL.`);
    await checkReference(imageUrl, file, 'og:image');
  }
  for (const landmark of ['header', 'main', 'footer']) check(byTag(landmark).length === 1, `${file}: expected exactly one <${landmark}> landmark.`);
  const header = byTag('header')[0];
  const footer = byTag('footer')[0];
  check(byTag('nav').some((node) => inside(node, header)), `${file}: header navigation is missing.`);
  check(byTag('nav').some((node) => inside(node, footer)), `${file}: footer navigation is missing.`);
  check(byTag('h1').length === 1 && inside(byTag('h1')[0], byTag('main')[0]), `${file}: expected exactly one h1 inside main.`);
  const ids = new Set();
  for (const node of page.nodes) {
    if ('id' in node.attrs) {
      check(Boolean(node.attrs.id), `${file}: empty id attribute.`);
      check(!ids.has(node.attrs.id), `${file}: duplicate id="${node.attrs.id}".`);
      ids.add(node.attrs.id);
    }
    if (node.tag === 'img') check('alt' in node.attrs, `${file}: image "${node.attrs.src}" is missing alt.`);
    for (const attr of ['href', 'src']) if (attr in node.attrs) await checkReference(node.attrs[attr], file, `${node.tag}[${attr}]`);
  }
  for (const [action, type] of [['publish', 'primary'], ['view', 'secondary']]) {
    const links = byTag('a').filter((node) => node.attrs['data-action'] === action && inside(node, header));
    check(links.length === 1, `${file}: header must contain exactly one ${action} CTA.`);
    check(links[0]?.attrs.href === siteConfig.links[action], `${file}: header ${action} CTA differs from siteConfig.links.${action}.`);
    check(links[0]?.attrs['data-type'] === type, `${file}: header ${action} CTA must use data-type="${type}".`);
  }
}

try {
  const css = (await read('assets/styles.css')).toString('utf8');
  const selectors = [...css.matchAll(/([^{}]+)\{[^{}]*\}/g)].map((match) => match[1]);
  for (const type of ['primary', 'secondary']) check(selectors.some((selector) => new RegExp(`\\[data-type\\s*=\\s*["']?${type}["']?\\]`).test(selector)), `CSS: missing data-type="${type}" button style.`);
  for (const state of ['hover', 'focus-within']) check(selectors.some((selector) => selector.split(',').some((part) => part.includes(`:${state}`) && /\.dropdown\b/.test(part))), `CSS: dropdown must open using :${state}.`);
  const app = (await read('assets/app.js')).toString('utf8');
  for (const match of app.matchAll(/(?:querySelector(?:All)?|closest|matches)\s*\(\s*(['"`])([^'"`]*)\1/g)) {
    check(!/(?:\bnav\b|[.#](?:dropdown|mobile-navigation|desktop-nav|nav-parent|nav-list)\b)/.test(match[2]), `JavaScript: navigation selector "${match[2]}" found; dropdown navigation must remain CSS/native HTML.`);
  }
} catch { check(false, 'Built CSS or JavaScript is missing. Run npm run build first.'); }

try {
  const source = (await read('assets/config.js')).toString('utf8');
  const json = source.match(/^\s*window\.AINALYM_CONFIG\s*=\s*([\s\S]*?);?\s*$/)?.[1]?.replace(/;\s*$/, '');
  const builtConfig = JSON.parse(json);
  for (const key of ['links', 'pricing']) check(JSON.stringify(builtConfig[key]) === JSON.stringify(siteConfig[key]), `assets/config.js: generated ${key} config differs from source. Run npm run build.`);
} catch { check(false, 'assets/config.js: missing or invalid generated JSON configuration.'); }

const calculator = pages.get('advantages.html');
if (calculator) {
  const form = calculator.ids.get('pricing-calculator');
  check(form?.tag === 'form', 'advantages.html: pricing-calculator form is missing.');
  const range = calculator.ids.get('days');
  check(range?.tag === 'input' && range.attrs.type === 'range' && range.attrs.name === 'days' && inside(range, form), 'advantages.html: days must be a named range input inside the calculator.');
  for (const [attr, key] of [['min', 'minDays'], ['max', 'maxDays'], ['value', 'defaultDays']]) check(Number(range?.attrs[attr]) === siteConfig.pricing[key], `advantages.html: days ${attr} differs from pricing.${key}.`);
  check(hasLabel(calculator, range ?? {}), 'advantages.html: days range needs an associated label.');
  const daysOutput = calculator.ids.get('days-output');
  check(daysOutput?.tag === 'output' && daysOutput.attrs.for === 'days', 'advantages.html: days-output must be an output associated with days.');
  const numberIn = (node) => Number(textOf(calculator, node).replace(/[^\d]/g, ''));
  check(numberIn(daysOutput) === siteConfig.pricing.defaultDays, 'advantages.html: displayed day count differs from configured default.');
  const radios = calculator.nodes.filter((node) => node.tag === 'input' && node.attrs.type === 'radio' && node.attrs.name === 'service' && inside(node, form));
  const keys = Object.keys(siteConfig.pricing.services);
  check(radios.length === keys.length && new Set(radios.map((radio) => radio.attrs.value)).size === keys.length && radios.every((radio) => keys.includes(radio.attrs.value)), 'advantages.html: service radio choices must match the configured services.');
  const selected = radios.filter((radio) => 'checked' in radio.attrs);
  check(selected.length === 1, 'advantages.html: exactly one default service must be checked.');
  const selectedRate = siteConfig.pricing.services[selected[0]?.attrs.value]?.dailyRate;
  check(calculator.ids.has('price-total') && numberIn(calculator.ids.get('price-total')) === selectedRate * siteConfig.pricing.defaultDays, 'advantages.html: initial total differs from default rate × days.');
  check(calculator.ids.has('daily-rate') && numberIn(calculator.ids.get('daily-rate')) === selectedRate, 'advantages.html: initial daily-rate differs from the selected service.');
  try {
    const sourceText = await readFile(path.join(root, 'media-files/texts/seller-price-list.txt'), 'utf8');
    const bounds = sourceText.match(/Қызмет мерзімі:\s*(\d+)\s*[–-]\s*(\d+)\s*күн/);
    check(Number(bounds?.[1]) === siteConfig.pricing.minDays && Number(bounds?.[2]) === siteConfig.pricing.maxDays, 'seller-price-list.txt: day bounds differ from pricing config.');
    check(Number(sourceText.match(/Әдепкі мерзім:\s*(\d+)\s*күн/)?.[1]) === siteConfig.pricing.defaultDays, 'seller-price-list.txt: default days differ from pricing config.');
    for (const radio of radios) {
      check(hasLabel(calculator, radio), `advantages.html: service "${radio.attrs.value}" needs a label.`);
      let label = radio.parent;
      while (label && label.tag !== 'label') label = label.parent;
      const serviceName = textOf(calculator, calculator.nodes.find((node) => node.tag === 'strong' && inside(node, label)));
      const price = calculator.nodes.find((node) => node.attrs.class?.split(/\s+/).includes('service-price') && inside(node, label));
      const dailyRate = siteConfig.pricing.services[radio.attrs.value]?.dailyRate;
      check(numberIn(price) === dailyRate, `advantages.html: displayed price for "${radio.attrs.value}" differs from configured dailyRate.`);
      const escapedName = serviceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sourceRate = sourceText.match(new RegExp(`^${escapedName}\\s*[—-]\\s*(\\d+)\\s*₸\\/күн`, 'm'));
      check(Boolean(serviceName) && Number(sourceRate?.[1]) === dailyRate, `seller-price-list.txt: tariff for "${radio.attrs.value}" does not match the page/config.`);
    }
  } catch { check(false, 'Missing media-files/texts/seller-price-list.txt pricing source.'); }
}

const contacts = pages.get('contacts.html');
if (contacts) {
  const form = contacts.ids.get('contact-form');
  check(form?.tag === 'form', 'contacts.html: contact-form is missing.');
  for (const [name, tag, type] of [['name', 'input', 'text'], ['email', 'input', 'email'], ['message', 'textarea', undefined], ['consent', 'input', 'checkbox']]) {
    const fields = contacts.nodes.filter((node) => node.attrs.name === name && inside(node, form));
    check(fields.length === 1 && fields[0].tag === tag && (type === undefined || fields[0].attrs.type === type), `contacts.html: expected one ${tag}${type ? `[type=${type}]` : ''} named "${name}".`);
    check(fields[0] && 'required' in fields[0].attrs, `contacts.html: "${name}" must be required.`);
    check(fields[0] && hasLabel(contacts, fields[0]), `contacts.html: "${name}" needs an associated label.`);
  }
  check(contacts.nodes.some((node) => node.tag === 'button' && node.attrs.type === 'submit' && inside(node, form)), 'contacts.html: form needs a submit button.');
  const consent = contacts.nodes.find((node) => node.attrs.name === 'consent' && inside(node, form));
  const consentLabel = contacts.nodes.find((node) => node.tag === 'label' && (inside(consent ?? {}, node) || node.attrs.for === consent?.attrs.id));
  check(contacts.nodes.some((node) => node.tag === 'a' && node.attrs.href === 'policy.html' && inside(node, consentLabel)), 'contacts.html: consent label must link to policy.html.');
  const status = contacts.ids.get('form-status');
  check(status?.attrs.role === 'status' && status.attrs['aria-live'] === 'polite', 'contacts.html: form feedback needs a polite status region.');
}

if (errors.length) {
  console.error(`Static checks failed (${errors.length}):\n${errors.map((message) => `  - ${message}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Static checks passed: ${pages.size} pages, ${referenceCount} local references, unique SEO metadata, landmarks/labels, CSS dropdowns, pricing sources and contact fields.`);
}
