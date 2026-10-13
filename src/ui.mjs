export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  loop: '<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>',
  chair: '<path d="M7 12V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6M4 11v6h16v-6M7 17v4m10-4v4M4 13h16"/>',
  shirt: '<path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4c-1 3-7 3-8 0Z"/>',
  tech: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
  book: '<path d="M12 5C8 2 3 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-1-1-6-2-10 1Zm0 0v15"/>',
  bike: '<circle cx="5" cy="17" r="4"/><circle cx="19" cy="17" r="4"/><path d="m5 17 5-9 5 9H5m5-9h6m-9-3h5m3-3h3l2 9"/>',
  plant: '<path d="M8 15h8l-1 7H9l-1-7Zm4 0V6M12 10c-5 0-7-3-7-7 5 0 7 3 7 7Zm0-2c0-4 3-6 7-6 0 4-3 6-7 6Z"/>',
  spark: '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
  chat: '<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z"/><path d="M8 10h8m-8 4h5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  heart: '<path d="M12 21 3 12C-2 6 6 0 12 6c6-6 14 0 9 6l-9 9Z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
};
export function icon(name, className = '') {
  return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
}
