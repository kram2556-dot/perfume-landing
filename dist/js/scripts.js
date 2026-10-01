/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const languageToggle = document.querySelector('#language-toggle');
  const form = document.querySelector('#order-form');
  const status = document.querySelector('.form-status');
  const whatsappNumber = '201000000000';

  const setLanguage = (language) => {
    root.dataset.lang = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    languageToggle.textContent = language === 'ar' ? 'EN' : 'عربي';
    document.title = language === 'ar' ? 'Légende Noire | العطر الذي يترك أثراً' : 'Légende Noire | The scent that stays';
    document.querySelectorAll('[data-placeholder-ar]').forEach((field) => {
      field.placeholder = language === 'ar' ? field.dataset.placeholderAr : field.dataset.placeholderEn;
    });
    document.querySelectorAll('option[data-ar]').forEach((option) => {
      option.textContent = language === 'ar' ? option.dataset.ar : option.dataset.en;
    });
    localStorage.setItem('legende-language', language);
  };
  setLanguage(localStorage.getItem('legende-language') === 'en' ? 'en' : 'ar');
  languageToggle.addEventListener('click', () => setLanguage(root.dataset.lang === 'ar' ? 'en' : 'ar'));

  const countdown = document.querySelector('#countdown');
  let remaining = (4 * 60 * 60) + (12 * 60) + 35;
  const updateCountdown = () => {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    countdown.textContent = `${hours}:${minutes}:${seconds}`;
    remaining = remaining > 0 ? remaining - 1 : (4 * 60 * 60) + (12 * 60) + 35;
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const sale = document.querySelector('#recent-sale');
  const saleNames = ['محمد', 'سارة', 'أحمد', 'ريم'];
  const saleCities = ['المنصورة', 'القاهرة', 'الإسكندرية', 'جدة'];
  let saleIndex = 0;
  const showSale = () => {
    document.querySelector('#sale-name').textContent = saleNames[saleIndex];
    document.querySelector('#sale-city').textContent = root.dataset.lang === 'ar' ? `من ${saleCities[saleIndex]}` : `From ${saleCities[saleIndex]}`;
    sale.classList.add('is-visible');
    window.setTimeout(() => sale.classList.remove('is-visible'), 4800);
    saleIndex = (saleIndex + 1) % saleNames.length;
  };
  window.setTimeout(showSale, 4200);
  window.setInterval(showSale, 14000);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const english = root.dataset.lang === 'en';
    const message = english
      ? ['Hello, I would like to order Légende Noire.', `Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Address: ${data.get('address')}`, `City: ${data.get('city')}`, `Bundle: ${data.get('package')}`, 'Payment: Cash on delivery'].join('\n')
      : ['مرحباً، أرغب في طلب عطر Légende Noire.', `الاسم: ${data.get('name')}`, `رقم الهاتف: ${data.get('phone')}`, `العنوان: ${data.get('address')}`, `المدينة: ${data.get('city')}`, `الباقة: ${data.get('package')}`, 'طريقة الدفع: الدفع عند الاستلام'].join('\n');
    status.textContent = english ? 'Opening WhatsApp with your order details...' : 'جاري فتح واتساب برسالة الطلب...';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    document.documentElement.classList.add('motion-enabled');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll('#navbarResponsive .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('#navbarResponsive');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
