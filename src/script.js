document.addEventListener('DOMContentLoaded', function() {
  const monthElement = document.querySelector('.month');
  const yearElement = document.querySelector('.year');
  const daysOfWeekElement = document.querySelector('.daysOfWeek');
  const daysElement = document.querySelector('.days');

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  function updateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    monthElement.textContent = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
    yearElement.textContent = year;

    daysOfWeekElement.innerHTML = '';
    daysElement.innerHTML = '';

    for (let i = 0; i < daysOfWeek.length; i++) {
      const dayOfWeek = daysOfWeek[i];
      const dayOfWeekElement = document.createElement('th');
      dayOfWeekElement.textContent = dayOfWeek;
      daysOfWeekElement.appendChild(dayOfWeekElement);
    }

    let dayCounter = 1;
    // Ajout des jours précédents
    const firstRow = document.createElement('tr');
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevMonthDay = new Date(year, month, 0 - i + 1);
      const prevMonthDayElement = document.createElement('td');
      prevMonthDayElement.textContent = prevMonthDay.getDate();
      prevMonthDayElement.classList.add('prevMonthDay');
      firstRow.appendChild(prevMonthDayElement);
    }

    for (let i = firstDayOfWeek; i < 7; i++) {
      const dayElement = document.createElement('td');
      dayElement.textContent = dayCounter;
      if (dayCounter === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
        dayElement.classList.add('today');
      }
      firstRow.appendChild(dayElement);
      dayCounter++;
    }
    daysElement.appendChild(firstRow);


    const remainingDays = lastDateOfMonth - dayCounter + 1;
    const remainingWeeks = Math.ceil(remainingDays / 7);

    for (let i = 0; i < remainingWeeks; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        if (dayCounter <= lastDateOfMonth) {
          const dayElement = document.createElement('td');
          dayElement.textContent = dayCounter;
          if (dayCounter === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
            dayElement.classList.add('today');
          }
          row.appendChild(dayElement);
          dayCounter++;
        } else {
          const nextMonthDay = new Date(year, month + 1, dayCounter - lastDateOfMonth);
          const nextMonthDayElement = document.createElement('td');
          nextMonthDayElement.textContent = nextMonthDay.getDate();
          nextMonthDayElement.classList.add('nextMonthDay');
          row.appendChild(nextMonthDayElement);
          dayCounter++;
        }
      }
      daysElement.appendChild(row);
    }
  }

  updateCalendar();
});
