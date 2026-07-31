const projectList = document.querySelector('.project-list');
const projectItems = projectList
  ? [...projectList.querySelectorAll('.project-item')]
  : [];

if (projectList && projectItems.length) {
  let frameRequested = false;

  const updateActiveProject = () => {
    const listRect = projectList.getBoundingClientRect();
    const listCenter = listRect.top + listRect.height / 2;
    let activeItem = null;

    for (const item of projectItems) {
      const itemRect = item.getBoundingClientRect();

      if (itemRect.top <= listCenter && itemRect.bottom >= listCenter) {
        activeItem = item;
        break;
      }
    }

    const hasActiveItem = Boolean(activeItem);

    for (const item of projectItems) {
      const isActive = item === activeItem;
      item.classList.toggle('is-active', isActive);
      item.classList.toggle('is-disabled', hasActiveItem && !isActive);

      if (isActive) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    }
  };

  const activateCenteredMode = () => {
    if (!projectList.classList.contains('is-initial')) return;

    projectList.classList.remove('is-initial');
    updateActiveProject();
  };

  const requestActiveProjectUpdate = () => {
    if (frameRequested) return;

    frameRequested = true;
    requestAnimationFrame(() => {
      updateActiveProject();
      frameRequested = false;
    });
  };

  projectList.addEventListener('scroll', requestActiveProjectUpdate, { passive: true });
  projectList.addEventListener('pointerdown', activateCenteredMode, { passive: true });
  projectList.addEventListener('touchstart', activateCenteredMode, { passive: true });
  projectList.addEventListener('wheel', activateCenteredMode, { passive: true });
  window.addEventListener('resize', requestActiveProjectUpdate);
}
