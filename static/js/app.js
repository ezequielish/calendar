import Calendar from "./calendar.js";

const $calendarContainer = document.querySelector(".calendar");
const $daysOff = document.querySelector(".days-day_off");
const $btnL = document.querySelector("#btn-l");
const $btnR = document.querySelector("#btn-r");
const hours = [12, 16, 8];
const minutes = [0, 30, 8];
const calendar = new Calendar($calendarContainer,false, hours, minutes, 'America', 'Panama');
const hoursAndMinutes = document.querySelectorAll(".hours_and_minutes");
document.addEventListener("DOMContentLoaded", () => {
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
        element.classList.remove("active");
        const day = parseInt(element.dataset.day);
        calendar.removeDayOff(day);
      } else {
        element.classList.add("active");
        const day = parseInt(element.dataset.day);
        calendar.addDayOff(day);
      }
    });
  });

  $btnL.addEventListener("click", () => {
    calendar.decrementMonth();
  });
  $btnR.addEventListener("click", () => {
    calendar.incrementMonth();
  });
});
