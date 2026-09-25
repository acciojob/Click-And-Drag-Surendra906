const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeItem = item;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Calculate click offset inside the clicked item
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    // Convert item position to absolute inside the container upon first drag
    if (activeItem.style.position !== 'absolute') {
      const initialLeft = itemRect.left - containerRect.left - container.clientLeft;
      const initialTop = itemRect.top - containerRect.top - container.clientTop;

      activeItem.style.position = 'absolute';
      activeItem.style.left = `${initialLeft}px`;
      activeItem.style.top = `${initialTop}px`;
      activeItem.style.width = `${itemRect.width}px`;
      activeItem.style.height = `${itemRect.height}px`;
    }

    // Bring active item to the front
    activeItem.style.zIndex = '1000';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeItem) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate potential new X and Y coordinates relative to container
  let newLeft = e.clientX - containerRect.left - container.clientLeft - offsetX;
  let newTop = e.clientY - containerRect.top - container.clientTop - offsetY;

  // Maximum allowed positions within container boundaries
  const maxLeft = container.clientWidth - activeItem.offsetWidth;
  const maxTop = container.clientHeight - activeItem.offsetHeight;

  // Clamp values inside boundaries [0, max]
  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (isDragging && activeItem) {
    isDragging = false;
    activeItem.style.zIndex = '';
    activeItem = null;
  }
});