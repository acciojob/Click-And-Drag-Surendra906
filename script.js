// Your code here.
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

    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    item.style.position = 'absolute';
    item.style.zIndex = '1000';

    const initialLeft = itemRect.left - containerRect.left;
    const initialTop = itemRect.top - containerRect.top;

    item.style.left = `${initialLeft}px`;
    item.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  let left = e.clientX - containerRect.left - startX;
  let top = e.clientY - containerRect.top - startY;

  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

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