const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let startX = 0;
let startY = 0;

container.style.position = 'relative';

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Mouse offset inside the dragged item
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Calculate current position relative to container padding area
    const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
    const initialTop = itemRect.top - containerRect.top - container.clientTop;

    item.style.position = 'absolute';
    item.style.zIndex = '1000';
    item.style.left = `${initialLeft}px`;
    item.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container inner top-left
  let left = e.clientX - containerRect.left - container.clientLeft - startX;
  let top = e.clientY - containerRect.top - container.clientTop - startY;

  // Maximum allowed movement based on container scrollable/inner dimensions
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Enforce boundary clamping [0, max]
  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  activeItem.style.left = `${left}px`;
  activeItem.style.top = `${top}px`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.zIndex = '1';
  }
  isDragging = false;
  activeItem = null;
});