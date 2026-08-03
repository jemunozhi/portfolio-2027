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
  let previousActiveProject = null;
  let detailsTransitionTimer;

  const renderCaseDetails = (item) => {
    caseTitle.textContent = item.dataset.caseTitle;
    caseDescription.textContent = item.dataset.caseDescription;
    const tags = item.dataset.caseTags?.split('|').filter(Boolean) ?? [];

    caseTags.replaceChildren(...tags.map((tag) => {
      const tagElement = document.createElement('li');
      tagElement.textContent = tag;
      return tagElement;
    }));
    caseTags.hidden = tags.length === 0;
  };

  const updateCaseDetails = (item, shouldAnimate) => {
    if (!caseDetails) return;

    window.clearTimeout(detailsTransitionTimer);

    if (!item) {
      caseDetails.hidden = true;
      previousActiveProject = null;
      return;
    }

    caseDetails.hidden = false;

    if (!shouldAnimate) {
      renderCaseDetails(item);
      return;
    }

    caseDetails.classList.add('is-changing');
    detailsTransitionTimer = window.setTimeout(() => {
      renderCaseDetails(item);
      requestAnimationFrame(() => caseDetails.classList.remove('is-changing'));
    }, 180);
  };

  const updateProjectsView = () => {
    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    ) || 0;
    const panelRect = projectPanel.getBoundingClientRect();
    const isProjectsView = panelRect.top <= headerHeight && panelRect.bottom > headerHeight;

    document.body.classList.toggle('is-projects-view', isProjectsView);
  };

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

    const nextActiveProject = hasActiveItem && !isFooterActive ? activeItem : null;
    const shouldAnimateDetails = Boolean(
      nextActiveProject && previousActiveProject && nextActiveProject !== previousActiveProject,
    );

    updateCaseDetails(nextActiveProject, shouldAnimateDetails);
    previousActiveProject = nextActiveProject;

    if (siteFooter) {
      siteFooter.hidden = !isFooterActive;
      siteFooter.classList.toggle('is-visible', isFooterActive);
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
      updateProjectsView();
      frameRequested = false;
    });
  };

  projectList.addEventListener('scroll', requestActiveProjectUpdate, { passive: true });
  projectList.addEventListener('pointerdown', activateCenteredMode, { passive: true });
  projectList.addEventListener('touchstart', activateCenteredMode, { passive: true });
  projectList.addEventListener('wheel', activateCenteredMode, { passive: true });
  window.addEventListener('resize', requestActiveProjectUpdate);
  window.addEventListener('scroll', requestActiveProjectUpdate, { passive: true });
  updateProjectsView();
}
