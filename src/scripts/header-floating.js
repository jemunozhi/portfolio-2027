const header = document.querySelector('.site-header');

if (header) {
  let lastScrollY = window.scrollY;

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY <= 16 || !isScrollingDown) {
      header.classList.remove('is-floating');
    } else {
      header.classList.add('is-floating');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
}
