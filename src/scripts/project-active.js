const projectList = document.querySelector('.project-list');
const projectItems = projectList
  ? [...projectList.querySelectorAll('.project-item')]
  : [];

if (projectList && projectItems.length) {
  let frameRequested = false;

  const updateActiveProject = () => {
    const listRect = projectList.getBoundingClientRect();
    const listCenter = listRect.top + listRect.height / 2;
    let closestItem = null;
    let closestDistance = Infinity;

    for (const item of projectItems) {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemCenter - listCenter);

      if (distance < closestDistance) {
        closestItem = item;
        closestDistance = distance;
      }
    }

    for (const item of projectItems) {
      const isActive = item === closestItem;
      item.classList.toggle('is-active', isActive);

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
