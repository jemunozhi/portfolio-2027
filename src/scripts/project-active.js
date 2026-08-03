const projectPanel = document.querySelector('.projects-panel');
const projectListContainer = document.querySelector('.project-list-container');
const projectList = document.querySelector('.project-list');
const caseDetails = document.querySelector('[data-case-details]');
const caseTitle = caseDetails?.querySelector('[data-case-title]');
const caseDescription = caseDetails?.querySelector('[data-case-description]');
const caseTags = caseDetails?.querySelector('[data-case-tags]');
const footerTrigger = projectList?.querySelector('[data-footer-trigger]');
const siteFooter = projectListContainer?.querySelector('[data-site-footer]');
const projectItems = projectList
  ? [...projectList.querySelectorAll('.project-item, [data-footer-trigger]')]
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
    const isFooterActive = activeItem === footerTrigger;

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

    projectPanel?.classList.toggle('has-active-project', hasActiveItem && !isFooterActive);
    projectPanel?.classList.toggle('has-active-footer', isFooterActive);

    if (caseDetails) {
      caseDetails.hidden = !hasActiveItem || isFooterActive;
    }

    if (siteFooter) {
      siteFooter.hidden = !isFooterActive;
      siteFooter.classList.toggle('is-visible', isFooterActive);
    }

    if (!activeItem || isFooterActive) return;

    caseTitle.textContent = activeItem.dataset.caseTitle;
    caseDescription.textContent = activeItem.dataset.caseDescription;
    const tags = activeItem.dataset.caseTags?.split('|').filter(Boolean) ?? [];
    caseTags.replaceChildren(...tags.map((tag) => {
      const tagElement = document.createElement('li');
      tagElement.textContent = tag;
      return tagElement;
    }));
    caseTags.hidden = tags.length === 0;
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
  window.addEventListener('scroll', requestActiveProjectUpdate, { passive: true });
}
