const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let startX = 0;
let startY = 0;

// Set position relative on container as anchor point
container.style.position = 'relative';

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Offset of mouse click relative to item's top-left corner
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Calculate initial position relative to container content area
    const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
    const initialTop = itemRect.top - containerRect.top - container.clientTop;

    // Convert to absolute positioning on drag start
    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = '1000';
    activeItem.style.left = `${initialLeft}px`;
    activeItem.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container inner top-left corner
  let left = e.clientX - containerRect.left - container.clientLeft - startX;
  let top = e.clientY - containerRect.top - container.clientTop - startY;

  // Exact maximum constraints inside container width and height
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Strict boundary clamping [0, max]
  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  // Update styles
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