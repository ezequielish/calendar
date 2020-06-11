import Calendar from "./calendar.js";
import timeZone from "./timezone.js";

const $calendarContainer = document.querySelector(".calendar");
const $timeZone = document.querySelector("#timeZone");
const $daysOff = document.querySelector(".days-day_off");
const $btnL = document.querySelector("#btn-l");
const $btnR = document.querySelector("#btn-r");
const $getFullDate = document.querySelector("#get_full_date");

const hours = [12, 16, 8, 22];
const minutes = [0, 30, 8, 0];
const calendar = new Calendar(
  $calendarContainer,
  false,
  hours,
  minutes,
  false,
  false
);

const localeHour = new Date().toString().split("(")[1].split(")")[0];

document.addEventListener("DOMContentLoaded", () => {
  $timeZone.innerHTML = `<option>${localeHour}</option`;
  listTimeZone()
    .then((option) => {
      $timeZone.innerHTML += option;
    })
    .then(() => {
      return $timeZone.addEventListener("change", (ev) => {
        const value = ev.target.value;
        calendar.handleHorusChangeEvent(value);
      });
    });

  //render days week
  calendar.getDaysOfWeek().map((day, i) => {
    return ($daysOff.innerHTML += `<div data-day=${i} class="day_week">${day}</div>`);
  });

  //handle days off of week
  const $daysWeek = $daysOff.querySelectorAll(".day_week");
  $daysWeek.forEach((element) => {
    element.addEventListener("click", () => {
      const dayActive = element.className.split(" ").includes("active"); //we look for the active class in divs
      if (dayActive) {
        element.classList.remove("active"); //we remove the styles of this element
        const day = parseInt(element.dataset.day); //we make sure what it is a  number value
        calendar.removeDayOff(day); //we remove the day off
      } else {
        element.classList.add("active"); //we add the styles of this element
        const day = parseInt(element.dataset.day);
        calendar.addDayOff(day); //we add the day off
      }
    });
  });

  $btnL.addEventListener("click", () => {
    calendar.decrementMonth();
  });
  $btnR.addEventListener("click", () => {
    calendar.incrementMonth();
  });

  $getFullDate.addEventListener("click", () => {
    const result = calendar.getFullDate();
    console.log(result);
    
  });


});

const functionWithPromise = (value, timeZone) => {
  //a function that returns a promise
  return Promise.resolve(` <option value="${value}">${timeZone}</option>`);
};

const timeZoneFormat = async (timeZone) => {
  const value = timeZone.split(" ")[1];
  return functionWithPromise(value, timeZone);
};

async function listTimeZone() {
  const timeZoneList = timeZone();
  return Promise.all(timeZoneList.map((timeZone) => timeZoneFormat(timeZone)));
}
