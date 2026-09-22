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
    e.preventDefault();

    isDragging = true;
    activeItem = item;

    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Distance between the item's current edges
    // and the container's edges.
    const leftSpace = itemRect.left - containerRect.left;
    const rightSpace = containerRect.right - itemRect.right;
    const topSpace = itemRect.top - containerRect.top;
    const bottomSpace = containerRect.bottom - itemRect.bottom;

    // Convert available space into translation limits.
    minAllowedX = initialX - leftSpace;
    maxAllowedX = initialX + rightSpace;

    minAllowedY = initialY - topSpace;
    maxAllowedY = initialY + bottomSpace;

    activeItem.style.zIndex = '1000';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  let targetX = initialX + deltaX;
  let targetY = initialY + deltaY;

  // Keep the entire item inside the container.
  targetX = Math.max(
    minAllowedX,
    Math.min(targetX, maxAllowedX)
  );

  targetY = Math.max(
    minAllowedY,
    Math.min(targetY, maxAllowedY)
  );

  activeItem.dataset.x = targetX;
  activeItem.dataset.y = targetY;

  // IMPORTANT:
  // Preserve the original 3D transform.
  const isEven = [...items].indexOf(activeItem) % 2 === 1;

  const rotation = isEven
    ? 'scaleX(1.31) rotateY(40deg)'
    : 'scaleX(1.31) rotateY(-40deg)';

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