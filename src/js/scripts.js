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
    document.querySelector('#sale-city').textContent = `من ${saleCities[saleIndex]} / ${saleCities[saleIndex]}`;
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

  if (window.AOS) AOS.init({ once: true, duration: 700, offset: 65, easing: 'ease-out-cubic' });
});
