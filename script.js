const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let startX = 0;
let startY = 0;

// Ensure container acts as the positioning anchor for absolute children
container.style.position = 'relative';

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Store offset where the click occurred inside the cube
    startX = e.clientX - itemRect.left;
    startY = e.clientY - itemRect.top;

    // Calculate current position relative to container's content area
    const currentLeft = itemRect.left - containerRect.left;
    const currentTop = itemRect.top - containerRect.top;

    // Convert ONLY the clicked item to absolute position so grid stays intact
    activeItem.style.position = 'absolute';
    activeItem.style.zIndex = '1000';
    activeItem.style.left = `${currentLeft}px`;
    activeItem.style.top = `${currentTop}px`;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate top/left relative to container border box
  let left = e.clientX - containerRect.left - startX;
  let top = e.clientY - containerRect.top - startY;

  // Exact maximum coordinates to prevent spilling outside container bounds
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Strict boundary clamping
  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  // Apply clamped coordinates
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