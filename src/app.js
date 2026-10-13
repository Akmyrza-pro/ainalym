(() => {
  'use strict';
  const config = window.AINALYM_CONFIG;
  if (!config) return;
  document.querySelectorAll('a[data-action]').forEach((link) => {
    const destination = config.links[link.dataset.action];
    if (destination) link.href = destination;
  });

  const calculator = document.querySelector('#pricing-calculator');
  if (calculator) {
    const range = calculator.querySelector('#days');
    const daysOutput = document.querySelector('#days-output');
    const priceOutput = document.querySelector('#price-total');
    const dailyOutput = document.querySelector('#daily-rate');
    const number = new Intl.NumberFormat('kk-KZ');
    range.min = config.pricing.minDays;
    range.max = config.pricing.maxDays;
    range.value = config.pricing.defaultDays;
    const update = () => {
      const days = Math.min(config.pricing.maxDays, Math.max(config.pricing.minDays, Number(range.value)));
      const selected = calculator.querySelector('input[name="service"]:checked');
      const service = config.pricing.services[selected?.value || 'highlight'];
      daysOutput.textContent = `${days} күн`;
      priceOutput.textContent = `${number.format(days * service.dailyRate)} ₸`;
      dailyOutput.textContent = `${number.format(service.dailyRate)} ₸`;
      range.setAttribute('aria-valuetext', `${days} күн`);
      range.style.setProperty('--range-progress', `${(days - range.min) / (range.max - range.min) * 100}%`);
    };
    calculator.addEventListener('input', update);
    calculator.addEventListener('change', update);
    calculator.addEventListener('submit', (event) => event.preventDefault());
    update();
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('#form-status');
    const submit = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const name = String(values.get('name')).trim();
      const message = String(values.get('message')).trim();
      if (name.length < 2 || message.length < 10) {
        status.textContent = 'Атыңызды және кемінде 10 таңбадан тұратын хабарламаңызды жазыңыз.';
        return;
      }
      const text = `Кімнен: ${name}\nEmail: ${values.get('email')}\n\n${message}`;
      status.replaceChildren();
      const note = document.createElement('span');
      note.textContent = 'Хабарлама мәтіні дайын. Бұл оқу үлгісі, хабарлама серверге жіберілген жоқ. ';
      const download = document.createElement('a');
      const blobUrl = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      download.href = blobUrl;
      download.download = 'ainalym-habarlama.txt';
      download.textContent = 'Хабарламаны жүктеу';
      download.className = 'text-link';
      status.append(note, download);
      if (form.dataset.previousBlob) URL.revokeObjectURL(form.dataset.previousBlob);
      form.dataset.previousBlob = blobUrl;
    });
    submit.disabled = false;
  }
})();
