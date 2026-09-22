const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;

let startMouseX = 0;
let startMouseY = 0;

let initialX = 0;
let initialY = 0;

// Store allowable drag ranges relative to initial grid position
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

    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Calculate current un-translated position relative to container
    const un-translatedLeft = (itemRect.left - containerRect.left) - initialX;
    const un-translatedTop = (itemRect.top - containerRect.top) - initialY;

    // Calculate maximum translation bounds so cube stays completely within [0, clientWidth/Height]
    minAllowedX = -un-translatedLeft;
    maxAllowedX = container.clientWidth - item.offsetWidth - un-translatedLeft;

    minAllowedY = -un-translatedTop;
    maxAllowedY = container.clientHeight - item.offsetHeight - un-translatedTop;

    activeItem.style.zIndex = '1000';
    activeItem.style.willChange = 'transform';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  // Proposed new translate position
  let targetX = initialX + deltaX;
  let targetY = initialY + deltaY;

  // Strictly clamp inside allowable ranges
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