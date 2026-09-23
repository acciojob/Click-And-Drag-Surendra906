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

    // Store mouse displacement inside the clicked block
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Convert from CSS grid layout to absolute position on first drag
    if (activeItem.style.position !== 'absolute') {
      const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
      const initialTop = itemRect.top - containerRect.top - container.clientTop;

      activeItem.style.position = 'absolute';
      activeItem.style.left = `${initialLeft}px`;
      activeItem.style.top = `${initialTop}px`;
      activeItem.style.width = `${itemRect.width}px`;
      activeItem.style.height = `${itemRect.height}px`;
    }

    activeItem.style.zIndex = '1000';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Position relative to container inner padding/border edge
  let newLeft = e.clientX - containerRect.left - container.clientLeft - startX;
  let newTop = e.clientY - containerRect.top - container.clientTop - startY;

  // Enforce boundary constraints inside the container
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (isDragging && activeItem) {
    activeItem.style.zIndex = '1';
    isDragging = false;
    activeItem = null;
  }
});