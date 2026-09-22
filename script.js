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

    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const left = itemRect.left - containerRect.left;
    const top = itemRect.top - containerRect.top;
    const right = containerRect.right - itemRect.right;
    const bottom = containerRect.bottom - itemRect.bottom;

    minAllowedX = initialX - left;
    maxAllowedX = initialX + right;

    minAllowedY = initialY - top;
    maxAllowedY = initialY + bottom;

    activeItem.style.zIndex = '1000';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  let targetX = initialX + deltaX;
  let targetY = initialY + deltaY;

  targetX = Math.max(minAllowedX, Math.min(targetX, maxAllowedX));
  targetY = Math.max(minAllowedY, Math.min(targetY, maxAllowedY));

  activeItem.dataset.x = targetX;
  activeItem.dataset.y = targetY;

  const index = Array.from(items).indexOf(activeItem);
  const rotation = index % 2 === 0
    ? 'scaleX(1.31) rotateY(-40deg)'
    : 'scaleX(1.31) rotateY(40deg)';

  activeItem.style.transform =
    `translate(${targetX}px, ${targetY}px) ${rotation}`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.zIndex = '1';
  }

  isDragging = false;
  activeItem = null;
});