const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;

let startMouseX = 0;
let startMouseY = 0;

let initialX = 0;
let initialY = 0;

let minAllowedX = 0;
let maxAllowedX = 0;
let minAllowedY = 0;
let maxAllowedY = 0;

items.forEach((item) => {
  item.dataset.x = '0';
  item.dataset.y = '0';

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    // Read saved transform offsets
    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Calculate boundary constraints relative to initial transform
    // left/top relative to container border box
    const currentLeft = itemRect.left - containerRect.left;
    const currentTop = itemRect.top - containerRect.top;

    // Calculate bounds based on client dimensions
    minAllowedX = initialX - currentLeft;
    maxAllowedX = initialX + (container.clientWidth - (currentLeft + item.offsetWidth));

    minAllowedY = initialY - currentTop;
    maxAllowedY = initialY + (container.clientHeight - (currentTop + item.offsetHeight));

    activeItem.style.zIndex = '1000';
    activeItem.style.willChange = 'transform';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  let targetX = initialX + deltaX;
  let targetY = initialY + deltaY;

  // Enforce boundary constraints
  targetX = Math.max(minAllowedX, Math.min(targetX, maxAllowedX));
  targetY = Math.max(minAllowedY, Math.min(targetY, maxAllowedY));

  activeItem.dataset.x = targetX;
  activeItem.dataset.y = targetY;
  activeItem.style.transform = `translate(${targetX}px, ${targetY}px)`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.zIndex = '1';
  }
  isDragging = false;
  activeItem = null;
});