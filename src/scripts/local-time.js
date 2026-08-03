const timeElements = [...document.querySelectorAll('[data-time-zone]')];

if (timeElements.length) {
  const updateLocalTimes = () => {
    const now = new Date();

    for (const timeElement of timeElements) {
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        timeZone: timeElement.dataset.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).formatToParts(now);

      const parts = Object.fromEntries(
        formattedTime.map(({ type, value }) => [type, value]),
      );

      timeElement.querySelector('[data-clock-hours]').textContent = parts.hour;
      timeElement.querySelector('[data-clock-minutes]').textContent = parts.minute;
      timeElement.querySelector('[data-clock-period]').textContent = parts.dayPeriod;
      timeElement.dateTime = now.toISOString();
      timeElement.style.setProperty('--clock-second-delay', `-${now.getSeconds()}s`);
    }
  };

  updateLocalTimes();
  window.setInterval(updateLocalTimes, 1_000);
}
