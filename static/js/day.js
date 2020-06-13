/**
 *
 * @param {Element} el
 * @param {number} day
 * @param {number} key
 * @param {number} getYear
 * @param {number} getMonth
 * @param {Array} daySelected
 * @param {function getDayForWeek(year, month, day) {}}
 * @param {boolean} yearFree
 */
const Day = (
  el,
  day,
  key,
  getYear,
  getMonth,
  daySelected,
  getDayForWeek,
  yearFree
) => {
  const buildDays = (
    el,
    day,
    index,
    year,
    month,
    daySelected,
    getDayForWeek,
    yearFree
  ) => {
    const getDay = new Date().getDate();
    const getMonth = new Date().getMonth();
    const getFullYear = new Date().getFullYear();
    let daysOfWeek = getDayForWeek(year, month, day);
    // el.style.gridColumn= daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek

    // el[daysOfWeek];
    // console.log(el[daysOfWeek]);

    if (day < getDay && !yearFree) {
      if (month == getMonth && year == getFullYear) {
        return `<p data-day=${day}>${day}</p>`;
      } else {
        return `
            <p data-day=${day} class="${
          daySelected[0] == day && daySelected[1] == month && "active"
        }">
            ${day}
            </p>
         `;
      }
    } else {
      return ` 
        <p data-day=${day} class="${
        daySelected[0] == day && daySelected[1] == month && "active"
      }">${day}</p>`;
    }
  };

  const keyCalendarNodyDays = (el, key,year, month, day, getDayForWeek) => {
    let numberDayForWeek = getDayForWeek(year, month, day);
    // numberDayForWeek = numberDayForWeek == 0 ? 7 : numberDayForWeek
    // console.log( el[key]);
    if(el[numberDayForWeek]){
      console.log('numberDayForWeek',el[numberDayForWeek]);
      return el[numberDayForWeek]
    }
  
    // console.log(key);
    // const dayofweek = el[key].dataset.dayofweek
    // // const 
    // // if(el[key].dataset){
    //   console.log(el[key].dataset);
      
    
    // }
    // return _el == 0 ? el[6] : el[key];
  };
  return (keyCalendarNodyDays(
    el,
    key,
    getYear,
    getMonth,
    day,
    getDayForWeek
  ).innerHTML += buildDays(
    el,
    day,
    key,
    getYear,
    getMonth,
    daySelected,
    getDayForWeek,
    yearFree
  ));
};

export default Day;
