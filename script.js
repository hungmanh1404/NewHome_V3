const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Mở menu' : 'Đóng menu');
  mobileMenu.hidden = isOpen;
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Mở menu');
}));

const filters = document.querySelectorAll('.filter');
const galleryItems = document.querySelectorAll('.gallery-item');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  galleryItems.forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
galleryItems.forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightbox.querySelector('p').textContent = item.dataset.caption;
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { lightboxImage.src = ''; });

document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Xin chào NEW HOME, tôi muốn trao đổi về ${data.get('service')}.\nTên: ${data.get('name')}\nSố điện thoại: ${data.get('phone')}`;
  const zaloWindow = window.open('about:blank', '_blank');
  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = 'Đã sao chép lời nhắn. Hãy dán vào cửa sổ Zalo vừa mở.';
    if (zaloWindow) zaloWindow.location.href = 'https://zalo.me/0901293593';
    else formStatus.innerHTML = 'Đã sao chép lời nhắn. <a href="https://zalo.me/0901293593" target="_blank" rel="noopener noreferrer">Mở Zalo tại đây</a> và dán nội dung.';
  } catch {
    if (zaloWindow) zaloWindow.close();
    formStatus.textContent = `Trình duyệt không thể sao chép tự động. Hãy gọi 0901 293 593 hoặc sao chép: ${message}`;
  }
});
