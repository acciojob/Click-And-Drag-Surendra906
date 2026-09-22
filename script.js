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

    // Store mouse click position relative to the item's top-left corner
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Position item relative to container's top-left boundary
    const initialLeft = itemRect.left - containerRect.left;
    const initialTop = itemRect.top - containerRect.top;

    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = '1000';
    activeItem.style.left = `${initialLeft}px`;
    activeItem.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container border box
  let left = e.clientX - containerRect.left - startX;
  let top = e.clientY - containerRect.top - startY;

  // Maximum allowed bounds inside container
  const minLeft = 0;
  const minTop = 0;
  const maxLeft = containerRect.width - activeItem.offsetWidth;
  const maxTop = containerRect.height - activeItem.offsetHeight;

  // Clamp left and top strictly within [min, max]
  if (left < minLeft) left = minLeft;
  if (top < minTop) top = minTop;
  if (left > maxLeft) left = maxLeft;
  if (top > maxTop) top = maxTop;

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