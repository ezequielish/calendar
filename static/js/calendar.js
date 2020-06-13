import Day from "./day.js";
export default class Calendar {
  constructor(el, yearFree, hours, minutes, continent, country) {
    this.el = el; //calendar container
    this.$headMonthName = el.querySelector("#calendar-head-month_name");
    this.$headYear = el.querySelector("#calendar-head-year");
    this.$days = this.el.querySelectorAll(".calendar-body-days");

    // this.$daysOffContainer = el.querySelector('.days-off-container')
    // this.$daysOffContainer = el.querySelector('.days-off-container')
    // this.$daysOffContainer = el.querySelector('.days-off-container')
    this.yearFree = yearFree;
    // this.$bodyYears = this.el.querySelector(".calendar__body-years");
    // this.$listYears = this.$bodyYears.querySelector(".list_years");
    // this.$headYear = this.el.querySelector("#calendar__head-year");
    // this.$headDay = this.el.querySelector("#calendar__head-day");
    // this.$headDayWeek = this.el.querySelector("#calendar__head-dayname");
    // this.$headMonth = this.el.querySelector("#calendar__head-month");
    this.$btnL = this.el.querySelector("#btn-l");
    this.$btnR = this.el.querySelector("#btn-r");
    // this.$dateInArrows = this.el.querySelector(".calendar-head-arrows-month");
    // this.$hoursAndMinutes = document.querySelector(".hours_and_minutes");
    // this.$morning = this.$hoursAndMinutes.querySelector(
    //   ".hours_and_minutes__schedule_morning"
    // );

    // this.$afterNoon = this.$hoursAndMinutes.querySelector(
    //   ".hours_and_minutes__schedule_atfer-noon"
    // );
    // this.$night = this.$hoursAndMinutes.querySelector(
    //   ".hours_and_minutes__schedule_nigth"
    // );

    // this.getDay = new Date().getDate();
    this.getMonth = new Date().getMonth();
    this.getYear = new Date().getFullYear();
    // this.getDayWeek = new Date().getDay();
    this.daySelected = [new Date().getDate(), new Date().getMonth()];
    // this.getHoursSelected = false;
    // this.getMinutesSelected = false;
    // this.getHours = hours;
    // this.getMinutes = minutes;
    // this.getContinent = continent;
    // this.getCountry = country;
    this.daysOff = [0, 5];
    this.monthsArray = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    this.daysOffWeek = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    this.render();
  }

  addDayOff(day) {
    this.daysOff.push(day);
    this.render();
  }
  removeDayOff(day) {
    const key = this.daysOff.indexOf(day);
    this.daysOff.splice(key, 1);
    this.render();
  }
  getDayFn() {
    return this.getDay;
  }
  getMonthFn() {
    return this.getMonth;
  }
  getYearFn() {
    return this;
  }
  getDayOffWeekFn() {
    return this.getDayWeek;
  }
  months() {
    return this.monthsArray;
  }

  getNumDayForMonth(month, year) {
    const days = new Date(year, month + 1, 0).getDate();
    let daysArray = [];
    for (let day = 1; day <= days; day++) {
      daysArray.push(day);
    }

    return daysArray;
  }

  /**
   * returns day of the week, being 0 Sunday the first day and 6 saturday the last day.
   */
  getDayForWeek(year, month, day) {
    return new Date(year, month, day).getDay();
  }

  getDayOffWeekForDay(day) {
    return this.daysOffWeek[day];
  }

  getDaysOfWeek() {
    return this.daysOffWeek;
  }

  decrementMonth() {
    this.getMonth--;
    this.render();
  }

  incrementMonth() {
    this.getMonth++;
    this.render();
  }

  setYear(year) {
    this.handleYearActive();
    this.getYear = year;

    this.getYear == new Date().getFullYear()
      ? (this.getMonth = new Date().getMonth())
      : "";
    this.render();
  }
  handleDaySelected(day) {
    this.getDay = day;
    this.daySelected[0] = day;
    this.daySelected[1] = this.getMonth;
    this.render();
  }

  listOfYears() {
    let years = [];
    const getYear = new Date().getFullYear();
    let minYear = this.yearFree ? 1930 : getYear;
    const year = this.yearFree ? getYear : getYear + 1;
    for (let index = minYear; index <= year; index++) {
      years.push(index);
    }

    return years;
  }

  handleYearActive() {
    this.el
      .querySelectorAll(".calendar__body-years .list_years li")
      .forEach((element, i) => {
        element.classList.remove("list_years-active");
      });
    this.el
      .querySelectorAll(".calendar__body-years .list_years li")
      .forEach((element, i) => {
        const yearData = parseInt(element.dataset.year);
        if (yearData == this.getYear) {
          element.classList.add("list_years-active");
        }
      });
  }
  handleDayActive(day) {
    this.el.querySelectorAll(".calendar__body-day").forEach((element, i) => {
      element.classList.remove("active");
    });
    this.el.querySelectorAll(".calendar__body-day").forEach((element, i) => {
      if (day == parseInt(element.dataset.day)) {
        element.classList.add("active");
      }
    });
  }
  handleClickHoursStyles(_element) {
    this.$hoursAndMinutes.querySelectorAll("div p").forEach((element, i) => {
      element.classList.remove("active");
    });
    this.$hoursAndMinutes.querySelectorAll("div p").forEach((element, i) => {
      if (element === _element) {
        _element.classList.add("active");
      }
    });
  }
  handleStylesOfDaysOff() {
    const $daysForWeekContainer = this.el.querySelectorAll(
      ".calendar-body-days"
    );
    const $daysForWeek = this.el.querySelectorAll(".calendar-body-days p");
    let $elementsDown = [];
    let dayWeekDayOne = "";
    $daysForWeek.forEach((dayelement, i) => {
      // console.log(parseInt(dayelement.dataset.day));
      if (
        parseInt(dayelement.dataset.day) >= 1 &&
        parseInt(dayelement.dataset.day) <= 7
      ) {
        if (parseInt(dayelement.dataset.day) === 1) {
          // elementsDown.push(dayelement.parentNode)
          // console.log(dayelement)
          // console.log(dayelement.parentNode.dataset.dayofweek)
          dayWeekDayOne = parseInt(dayelement.parentNode.dataset.dayofweek);
        }
      }
    });
    $daysForWeekContainer.forEach((container) => {
      if (parseInt(container.dataset.dayofweek) < dayWeekDayOne) {
        
        container.querySelectorAll('p').forEach((dayelement, i) => {
          console.log(i+2);
          dayelement.style.gridRow=`${i+2}/${i+2}`
        });
      }
    });
    // console.log($dayWeekDayOne );

    // //we add styles in the days of week off
    // this.el.querySelectorAll(".calendar-body-day").forEach((element, i) => {
    //   const dayForWeek = this.daysOff.includes(
    //     this.getDayForWeek(this.getYear, this.getMonth, i + 1)
    //   );
    //   if (dayForWeek) {
    //     element.classList.add("disabled");
    //   }
    // });
    // //we add styles in the header day of week in calendar
    // const $daysOffWeek = document.querySelectorAll(
    //   ".calendar-body-weekdays div"
    // );

    // $daysOffWeek.forEach((element) => {
    //   const parse = parseInt(element.dataset.dayofweek);
    //   if (this.daysOff.includes(parse)) {
    //     element.classList.add("disabled");
    //   }
    // });
  }

  handleClickInDay() {
    // this.$days.querySelectorAll("div").forEach((dayElement) => {
    //   dayElement.addEventListener("click", () => {
    //     const isDisabled = dayElement.className.split(" ").includes("disabled");
    //     const isDayOff = this.daysOff.includes(
    //       this.getDayForWeek(
    //         this.getYear,
    //         this.getMonth,
    //         dayElement.dataset.day
    //       )
    //     );
    //     if (!isDisabled && !isDayOff) {
    //       this.handleDayActive(parseInt(dayElement.dataset.day));
    //       this.handleDaySelected(parseInt(dayElement.dataset.day));
    //     }
    //   });
    // });
  }
  handleClickHours() {
    this.$hoursAndMinutes.querySelectorAll("div p").forEach((element, i) => {
      element.addEventListener("click", () => {
        this.handleClickHoursStyles(element);
        this.getHoursSelected = parseInt(element.dataset.hours);
        this.getMinutesSelected = parseInt(element.dataset.minutes);
      });
    });
  }
  handleArrows() {
    if (this.getYear <= new Date().getFullYear() && !this.yearFree) {
      if (this.getMonth <= 0 || this.getMonth === new Date().getMonth()) {
        this.$btnL.disabled = true;
        this.$btnL.querySelector("svg").setAttribute("fill", "grey");
      } else {
        this.$btnL.disabled = false;
        this.$btnL.querySelector("svg").setAttribute("fill", "black");
      }
    } else {
      if (this.getMonth <= 0) {
        this.$btnL.disabled = true;
        this.$btnL.querySelector("svg").setAttribute("fill", "grey");
      } else {
        this.$btnL.disabled = false;
        this.$btnL.querySelector("svg").setAttribute("fill", "black");
      }
    }
    if (this.getMonth >= 11) {
      this.$btnR.disabled = true;
      this.$btnR.querySelector("svg").setAttribute("fill", "grey");
    } else {
      this.$btnR.disabled = false;
      this.$btnR.querySelector("svg").setAttribute("fill", "black");
    }
  }

  handleHorusChangeEvent(timeZone) {
    const continent = timeZone.split("/")[0];
    const country = timeZone.split("/")[1];
    this.getContinent = continent;
    this.getCountry = country;

    this.render();
  }

  handleHoursValue(hours, minutes, continent, country) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const date = new Date(year, month, day, hours, minutes);
    const timeZone = continent
      ? date.toLocaleString("en-US", {
          timeZone: continent ? `${continent}/${country}` : " ",
        })
      : date.toLocaleString("en-US");

    return timeZone;
  }

  buildYears(year) {
    return `<li id="${year}" class="item_year ${
      this.fullYear == year && `list_years-active`
    }" data-year=${year}>${year}</li>`;
  }

  handleClickDay() {
    // const allDays = this.$days.querySelectorAll(".calendar-body-day");
    // allDays.forEach((day) => {
    //   day.addEventListener("click", () => {});
    // });
  }
  addEventListeners() {
    // this.handleClickDay();
    this.handleClickInDay();
  }

  //DAYS
  resetDaysCalendar() {
    const $days = this.el.querySelectorAll(".calendar-body-days");
    $days.forEach((element) => (element.innerHTML = ""));
  }
  renderDays() {
    // this.$days.innerHTML = "";
    this.resetDaysCalendar()
    // for (let index = 0; index < 31; index++) {
    //   this.$days.innerHTML += "<div class='calendar-body-day'></div>";
    // }

    const days = this.getNumDayForMonth(this.getMonth, this.getYear);

    days.map((day, key) => {
      Day(
        this.$days,
        day,
        key,
        this.getYear,
        this.getMonth,
        this.daySelected,
        this.getDayForWeek,
        this.yearFree
      );
    });

    // this.handleStylesOfDaysOff();
  }

  renderSelectionOfYears() {
    const listYears = this.listOfYears();
    this.$listYears.innerHTML = "";
    listYears.map((year) => {
      return (this.$listYears.innerHTML += this.buildYears(year));
    });

    this.handleYearActive();
    this.$headYear.addEventListener("click", () => {
      this.$bodyYears.style.visibility = "visible";
    });
    this.el.querySelectorAll(".item_year").forEach((liYear) => {
      liYear.addEventListener("click", () => {
        this.setYear(parseInt(liYear.dataset.year));
        this.$bodyYears.style.visibility = "hidden";
      });
    });
  }

  renderHours() {
    this.$morning.innerHTML = "";
    this.$afterNoon.innerHTML = "";
    this.$night.innerHTML = "";

    this.getHours.map((hours, i) => {
      const result = this.handleHoursValue(
        hours,
        this.getMinutes[i],
        this.getContinent,
        this.getCountry
      );
      const hoursResult = result.split(" ")[1];
      const turnResult = result.split(" ")[2];

      const getHours = hoursResult.split(":")[0];
      const getMinutes = hoursResult.split(":")[1];

      if (this.getHours[i] < 12) {
        return (this.$morning.innerHTML += `<p data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours">${getHours}:${getMinutes} ${turnResult}</p>`);
      } else if (this.getHours[i] < 18 && this.getHours[i] >= 12) {
        return (this.$afterNoon.innerHTML += `<p  data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours" >${getHours}:${getMinutes} ${turnResult}</p>`);
      } else if (this.getHours[i] < 25 && this.getHours[i] > 18) {
        return (this.$night.innerHTML += `<p  data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours" >${getHours}:${getMinutes} ${turnResult}</p>`);
      }
    });
  }

  getFullDate() {
    let fullDate = {};

    if (this.getHoursSelected) {
      fullDate = {
        year: this.getYear,
        month: this.getMonth,
        day: this.getDay,
        hours: this.getHoursSelected,
        minutes: this.getMinutesSelected,
      };
    } else {
      fullDate = {
        year: this.getYear,
        month: this.getMonth,
        day: this.getDay,
      };
    }
    return fullDate;
  }

  render() {
    this.handleArrows();

    this.$headMonthName.innerHTML = this.months()[this.getMonth];
    this.$headYear.innerHTML = this.getYear;
    // this.$headDay.innerHTML = this.getDay;
    // this.$headMonth.innerHTML = this.months()[this.getMonth];

    // this.$headDayWeek.innerHTML = `${this.getDayOffWeekForDay(
    //   this.getDayWeek
    // )},`;
    this.renderDays();

    this.addEventListeners();
    // this.renderSelectionOfYears();

    // if (this.yearFree == false) {
    //   this.renderHours();
    // }
    // this.handleClickInDay();
    // this.handleClickHours();
  }
}
