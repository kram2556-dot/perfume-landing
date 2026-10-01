/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.querySelector('#language-toggle');
  const orderForm = document.querySelector('#order-form');
  const status = document.querySelector('.form-status');
  const whatsappNumber = '201000000000';

  const setLanguage = (language) => {
    root.dataset.lang = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    toggle.textContent = language === 'ar' ? 'EN' : 'عربي';
    document.title = language === 'ar' ? 'عطر أسطورة | سر الحضور الذي لا يُنسى' : 'As6oura | The signature that stays';
    localStorage.setItem('as6oura-language', language);
  };

  const savedLanguage = localStorage.getItem('as6oura-language');
  setLanguage(savedLanguage === 'en' ? 'en' : 'ar');
  toggle.addEventListener('click', () => setLanguage(root.dataset.lang === 'ar' ? 'en' : 'ar'));

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!orderForm.reportValidity()) return;
    const data = new FormData(orderForm);
    const isEnglish = root.dataset.lang === 'en';
    const message = isEnglish
      ? ['Hello, I would like to order As6oura perfume.', `Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Address: ${data.get('address')}`, `City: ${data.get('city')}`, `Bundle: ${data.get('package')}`, 'Payment: Cash on delivery'].join('\n')
      : ['مرحباً، أرغب في طلب عطر أسطورة.', `الاسم: ${data.get('name')}`, `رقم الهاتف: ${data.get('phone')}`, `العنوان: ${data.get('address')}`, `المدينة: ${data.get('city')}`, `الباقة: ${data.get('package')}`, 'طريقة الدفع: الدفع عند الاستلام'].join('\n');
    status.textContent = isEnglish ? 'Opening WhatsApp with your order details...' : 'جاري فتح واتساب برسالة الطلب...';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  if (window.AOS) AOS.init({ once: true, duration: 850, offset: 70, easing: 'ease-out-cubic' });
});
