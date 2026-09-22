const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let startX = 0;
let startY = 0;

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Mouse offset inside the clicked block
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Initial position relative to container
    const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
    const initialTop = itemRect.top - containerRect.top - container.clientTop;

    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = '1000';
    activeItem.style.left = `${initialLeft}px`;
    activeItem.style.top = `${initialTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container inner top-left area
  let left = e.clientX - containerRect.left - container.clientLeft - startX;
  let top = e.clientY - containerRect.top - container.clientTop - startY;

  // Exact maximum constraints expected by the test
  const minLeft = 0;
  const minTop = 0;
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Enforce strict clamping
  left = Math.max(minLeft, Math.min(left, maxLeft));
  top = Math.max(minTop, Math.min(top, maxTop));

  // Set style
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