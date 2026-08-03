const sectionJumps = [...document.querySelectorAll('[data-section-jump]')];

if (sectionJumps.length) {
  const showSection = (section) => {
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  for (const link of sectionJumps) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showSection(link.dataset.sectionJump);
    });
  }
}
