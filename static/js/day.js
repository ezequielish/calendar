/**
 *
 * @param {Element} el
 * @param {number} day
 * @param {number} key
 * @param {number} getYear
 * @param {number} getMonth
 * @param {function getDayForWeek(year, month, day) {}}
 * @param {boolean} calendarYearOpen
 */
const Day = (
  el,
  day,
  key,
  getYear,
  getMonth,
  getDayForWeek,
  calendarYearOpen
) => {
  const buildDays = (
    day,
    index,
    year,
    month,
    getDayForWeek,
    calendarYearOpen
  ) => {
    const getDay = new Date().getDate();
    const getMonth = new Date().getMonth();
    const getFullYear = new Date().getFullYear();
    const daysOfWeek = getDayForWeek(year, month, day);
    if (day < getDay && !calendarYearOpen) {
      if (month == getMonth && year == getFullYear) {
        return `<div class="calendar-body-day disabled " data-day="${day}" style="grid-column:${
          daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
        }"><p class="disabled" data-day="${day}">${day}</p></div>`;
      } else {
        return `<div class="calendar-body-day selectable" data-day="${day}" style="grid-column:${
          daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
        }">
            <p class="selectable" data-day="${day}">
            ${day}
            </p>
          </div>`;
      }
    } else {
      return `<div class="calendar-body-day selectable" data-day="${day}" style="grid-column:${
        daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
      }">  <p class="selectable" data-day="${day}">${day}</p></div>`;
    }
  };
  return (el.innerHTML += buildDays(
    day,
    key,
    getYear,
    getMonth,
    getDayForWeek,
    calendarYearOpen
  ));
};

export default Day;
