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

    // Read stored transform translation coordinates
    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Determine the element's original untranslated position
    const untranslatedLeft = itemRect.left - containerRect.left - container.clientLeft - initialX;
    const untranslatedTop = itemRect.top - containerRect.top - container.clientTop - initialY;

    // Exact min/max translations allowed
    minAllowedX = -untranslatedLeft;
    maxAllowedX = container.clientWidth - item.offsetWidth - untranslatedLeft;

    minAllowedY = -untranslatedTop;
    maxAllowedY = container.clientHeight - item.offsetHeight - untranslatedTop;

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

  // Strict boundary clamping
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