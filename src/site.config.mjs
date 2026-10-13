// Сілтемелерді осы жерден өзгертіп, npm run build командасын орындаңыз.
export const siteConfig = {
  name: 'Ainalym',
  baseUrl: 'https://ainalym-market-ak-1013.akmyrzakartanbaj.chatgpt.site',
  links: { publish: 'seller.html', view: 'buyer.html' },
  contactEmail: 'hello@ainalym.example',
  pricing: {
    minDays: 1,
    maxDays: 30,
    defaultDays: 7,
    currency: 'KZT',
    services: {
      highlight: { name: 'Ерекшелеу', dailyRate: 250 },
      top: { name: 'Жоғарыға шығару', dailyRate: 400 },
      combo: { name: 'Екеуі бірге', dailyRate: 550 }
    }
  }
};
