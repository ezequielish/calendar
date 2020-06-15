import Calendar from "./calendar.js";
// import timeZone from "./timezone.js";

const $calendar = document.querySelector(".calendar");
const $daysOffContainer = document.querySelector(".days-off-container");
const $timeZone = document.querySelector(".country");
const $btnL = document.querySelector("#btn-l");
const $btnR = document.querySelector("#btn-r");
const $appointment = document.querySelector(".appointment");
const $goBackButton = document.querySelector(".go-back")
const $result = document.querySelector(".result");
const localeHour = new Date().toString().split("(")[1].split(")")[0];

document.addEventListener("DOMContentLoaded", () => {
  const hours = [12, 16, 8, 22];
  const minutes = [0, 30, 8, 0];
  // new Calendar(DOMElement, calendar year open: true or false, array numeric, array numeric, any, any)
  const calendar = new Calendar($calendar, false, hours, minutes, false, false);

  //render days week
  calendar.getDaysOfWeek().map((day, i) => {
    return ($daysOffContainer.innerHTML += `<div data-day=${i} class="days-off-day">${day}</div>`);
  });
  $timeZone.innerHTML = `<option>${localeHour}</option`;

  import("./timezone.js").then((TZ) => {
    //dynamic import
    const timeZone = TZ.default();

    listTimeZone(timeZone)
      .then((option) => {
        $timeZone.innerHTML += option;
      })
      .then(() => {
        return $timeZone.addEventListener("change", (ev) => {
          const value = ev.target.value;
          calendar.handleTimeZoneSelected(value);
        });
      });
  });

  //handle days off of week
  const $daysWeek = $daysOffContainer.querySelectorAll(".days-off-day");
  $daysWeek.forEach((element) => {
    element.addEventListener("click", () => {
      const dayActive = element.className.split(" ").includes("active"); //we look  active class on divs
      if (dayActive) {
        element.classList.remove("active"); //we remove the styles of this element
        const day = parseInt(element.dataset.day); //we make sure that this is a  numeric value
        calendar.removeDayOff(day); //we remove a day off
      } else {
        element.classList.add("active"); //we add the styles of this element
        const day = parseInt(element.dataset.day);
        calendar.addDayOff(day); //we add a day off
      }
    });
  });
  $btnL.addEventListener("click", () => {
    calendar.decrementMonth();
  });

  $btnR.addEventListener("click", () => {
    calendar.incrementMonth();
  });

  $appointment.addEventListener("click", () => {
    const result = calendar.getFullDate();
    const montName = result.monthName.substr(0,3)

    document.querySelector(
      "#result-date p"
    ).innerHTML = `${result.day} ${montName}, ${result.year} <span>fecha</span>`;
    document.querySelector("#result-hour p").innerHTML = `${result.result} <span>hora</span>`;
  });

  $goBackButton.addEventListener("click", () => {
    $result.classList.remove("open")
    $result.classList.add("close")
  })
});

const functionWithPromise = (value, timeZone) => {
  //a function that returns a promise
  return Promise.resolve(` <option value="${value}">${timeZone}</option>`);
};

const timeZoneFormat = async (timeZone) => {
  const value = timeZone.split(" ")[1];
  return functionWithPromise(value, timeZone);
};

async function listTimeZone(timeZoneFn) {
  const timeZoneList = timeZoneFn;
  return Promise.all(timeZoneList.map((timeZone) => timeZoneFormat(timeZone)));
}
