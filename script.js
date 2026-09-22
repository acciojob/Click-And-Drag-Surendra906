const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let startX = 0;
let startY = 0;

// Ensure container is the positioning parent
container.style.position = 'relative';

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Calculate cursor offset inside the clicked item
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Get position relative to the container's inner client area (excluding borders)
    const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
    const initialTop = itemRect.top - containerRect.top - container.clientTop;

    // Convert ONLY the clicked block to absolute positioning
    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = '1000';
    activeItem.style.left = `${initialLeft}px`;
    activeItem.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate top and left relative to container content area
  let left = e.clientX - containerRect.left - container.clientLeft - startX;
  let top = e.clientY - containerRect.top - container.clientTop - startY;

  // Exact bounds allowed inside the container
  const minLeft = 0;
  const minTop = 0;
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Strict boundary clamping
  left = Math.max(minLeft, Math.min(left, maxLeft));
  top = Math.max(minTop, Math.min(top, maxTop));

  // Apply clamped coordinates to styles
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