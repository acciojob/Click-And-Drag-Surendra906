const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;

// Initial cursor coordinates when click starts
let startMouseX = 0;
let startMouseY = 0;

// Current translation values of active item
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

items.forEach((item) => {
  // Store cumulative translation offsets on the element
  item.dataset.x = '0';
  item.dataset.y = '0';

  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    // Read stored translations or default to 0
    initialX = parseFloat(item.dataset.x) || 0;
    initialY = parseFloat(item.dataset.y) || 0;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    // Bring active item above others without altering grid layout
    activeItem.style.zIndex = '1000';
    activeItem.style.willChange = 'transform';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // Mouse movement delta
  const deltaX = e.clientX - startMouseX;
  const deltaY = e.clientY - startMouseY;

  // Candidate translation positions
  let targetX = initialX + deltaX;
  let targetY = initialY + deltaY;

  // Calculate current bounds relative to container inner edge
  const currentLeft = itemRect.left - containerRect.left;
  const currentTop = itemRect.top - containerRect.top;
  const currentRight = containerRect.right - itemRect.right;
  const currentBottom = containerRect.bottom - itemRect.bottom;

  // Clamp movement so item never exceeds container bounds
  const minX = targetX - currentLeft;
  const maxX = targetX + currentRight;
  const minY = targetY - currentTop;
  const maxY = targetY + currentBottom;

  currentX = Math.max(minX, Math.min(targetX, maxX));
  currentY = Math.max(minY, Math.min(targetY, maxY));

  // Apply position smoothly via CSS transform
  activeItem.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    // Persist position for future drags
    activeItem.dataset.x = currentX;
    activeItem.dataset.y = currentY;
    activeItem.style.zIndex = '1';
  }
  isDragging = false;
  activeItem = null;
});