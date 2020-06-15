import Day from "./day.js";
export default class Calendar {
  constructor(el, calendarYearOpen, hours, minutes, continent, country) {
    this.el = el; //calendar container
    this.$headMonthName = el.querySelector("#calendar-head-month_name");
    this.$headYear = el.querySelector("#calendar-head-year");
    this.$days = this.el.querySelector(".calendar-body-days");
    this.calendarYearOpen = calendarYearOpen;
    this.$appointment = document.querySelector(".appointment");
    this.$result = document.querySelector(".result");
    this.$bodyYears = this.el.querySelector(".calendar-body-years");
    this.$listYears = this.$bodyYears.querySelector(
      ".calendar-body-years .list-years"
    );

    this.$btnL = this.el.querySelector("#btn-l");
    this.$btnR = this.el.querySelector("#btn-r");
    this.$time = document.querySelector(".time");
    this.$morning = this.$time.querySelector(".hours-schedule-morning div");

    this.$afterNoon = this.$time.querySelector(
      ".hours-minutes-schedule-atfer-noon div"
    );
    this.$night = this.$time.querySelector(".hours-minutes-schedule-nigth div");

    // this.getDay = new Date().getDate();
    this.getMonth = new Date().getMonth();
    this.getYear = new Date().getFullYear();
    // this.getDayWeek = new Date().getDay();
    //save the day and month selected
    this.daySelected = [0, 0];
    this.getHoursSelected = false;
    this.getMinutesSelected = false;
    this.getHours = hours;
    this.getMinutes = minutes;
    this.getContinent = continent;
    this.getCountry = country;
    this.daysOff = [];
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
    this.handleActiveYearStyle();
    this.getYear = year;

    this.getYear == new Date().getFullYear()
      ? (this.getMonth = new Date().getMonth())
      : "";
    this.render();
  }
  setDaySelected(day) {
    this.getDay = day;
    this.daySelected[0] = day;
    this.daySelected[1] = this.getMonth;
    // this.render();
  }

  listOfYears() {
    let years = [];
    const getYear = new Date().getFullYear();
    let minYear = this.calendarYearOpen ? 1930 : getYear;
    const year = this.calendarYearOpen ? getYear : getYear + 1;
    for (let index = minYear; index <= year; index++) {
      years.push(index);
    }

    return years;
  }

  //HANDLE STYLES

  handleStylesOfDaysOff() {
    //we add styles in the days of week off
    this.el.querySelectorAll(".calendar-body-day").forEach((element, i) => {
      const dayForWeek = this.daysOff.includes(
        this.getDayForWeek(this.getYear, this.getMonth, i + 1)
      );
      if (dayForWeek) {
        element.classList.add("disabled");
      }
    });
    //we add styles in the header day of week in calendar
    const $daysOffWeek = document.querySelectorAll(
      ".calendar-body-weekdays div"
    );

    //we look the  backdrop layer
    $daysOffWeek.forEach((element) => {
      const parseDayOfWeek = parseInt(element.dataset.dayofweek);
      if (this.daysOff.includes(parseDayOfWeek)) {
        element.querySelector("div").style.visibility = "visible"; //layer
      } else {
        //we hide the  backdrop layer
        element.querySelector("div")
          ? (element.querySelector("div").style.visibility = "hidden")
          : "";
      }
    });
  }

  /**
   *
   * @param {Element} dayElement element DOM day selected
   * @param {number} day day selected
   */
  handleDayActiveStyles(dayElement, day) {
    this.el.querySelectorAll(".calendar-body-day p").forEach((element, i) => {
      element.classList.remove("active");
    });

    document.querySelectorAll(".calendar-body-day p").forEach((element, i) => {
      if (day == parseInt(element.dataset.day)) {
        dayElement.classList.add("active");
      }
    });
  }

  handleActiveYearStyle() {
    this.el
      .querySelectorAll(".calendar-body-years .list-years li")
      .forEach((element, i) => {
        element.classList.remove("list-years-active");
      });
    this.el
      .querySelectorAll(".calendar-body-years .list-years li")
      .forEach((element, i) => {
        const yearData = parseInt(element.dataset.year);
        if (yearData == this.getYear) {
          element.classList.add("list-years-active");
        }
      });
  }

  handleClickHoursStyles(_element) {
    this.$time.querySelectorAll(".schedule div p").forEach((element, i) => {
      element.classList.remove("active");
    });
    this.$time.querySelectorAll(".schedule div p").forEach((element, i) => {
      if (element === _element) {
        _element.classList.add("active");
      }
    });
  }

  handleStylesAppointmentButton() {
    const hours = this.getHoursSelected;
    const day = this.daySelected[0];

    if (hours && day) {
      this.$appointment.disabled = false;
    }
  }

  handleToogleResultStyles() {
    const hours = this.getHoursSelected;
    const day = this.daySelected[0];

    if (hours && day) {
      this.$result.classList.add("open");
      this.$result.classList.remove("close");
    } else {
      this.$result.classList.add("close");
      this.$result.classList.remove("open");
    }
  }
  ///////////////////////////////////////////

  //HANDLE EVENTS
  handleArrows() {
    const fullYear = new Date().getFullYear();
    const yearSelected = this.getYear;
    const month = new Date().getMonth();
    const monthSelected = this.getMonth;

    if (yearSelected <= fullYear && !this.calendarYearOpen) {
      if (monthSelected <= 0 || monthSelected === month) {
        this.$btnL.disabled = true;
        this.$btnL.querySelector("svg").setAttribute("fill", "grey");
      } else {
        this.$btnL.disabled = false;
        this.$btnL.querySelector("svg").setAttribute("fill", "black");
      }
    } else {
      if (monthSelected <= 0) {
        this.$btnL.disabled = true;
        this.$btnL.querySelector("svg").setAttribute("fill", "grey");
      } else {
        this.$btnL.disabled = false;
        this.$btnL.querySelector("svg").setAttribute("fill", "black");
      }
    }
    if (monthSelected >= 11) {
      this.$btnR.disabled = true;
      this.$btnR.querySelector("svg").setAttribute("fill", "grey");
    } else {
      this.$btnR.disabled = false;
      this.$btnR.querySelector("svg").setAttribute("fill", "black");
    }
  }
  handleClickInDay() {
    this.$days
      .querySelectorAll(".calendar-body-day p")
      .forEach((dayElement) => {
        dayElement.addEventListener("click", () => {
          const isDisabled = dayElement.className
            .split(" ")
            .includes("disabled"); //we verificate it is  disabled
          const isDayOff = this.daysOff.includes(
            this.getDayForWeek(
              this.getYear,
              this.getMonth,
              dayElement.dataset.day
            )
          );
          if (!isDisabled && !isDayOff) {
            this.handleDayActiveStyles(
              dayElement,
              parseInt(dayElement.dataset.day)
            );
            this.setDaySelected(parseInt(dayElement.dataset.day));
          }
          this.handleStylesAppointmentButton();
        });
      });
  }
  handleClickHours() {
    this.$time
      .querySelectorAll(".schedule div p")
      .forEach((hoursContainer, i) => {
        hoursContainer.addEventListener("click", () => {
          this.handleClickHoursStyles(hoursContainer);
          this.getHoursSelected = parseInt(hoursContainer.dataset.hours);
          this.getMinutesSelected = parseInt(hoursContainer.dataset.minutes);
          this.handleStylesAppointmentButton();
        });
      });
  }

  handleTimeZoneSelected(timeZone) {
    const continent = timeZone.split("/")[0];
    const country = timeZone.split("/")[1];
    this.getHoursSelected = 0;
    this.getMinutesSelected = 0;
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
    const dateTZ = timeZone.split(",")[0];
    const scheduleType = timeZone.split(",")[1].split(":")[2].split(" ")[1];
    const housTZ = timeZone.split(",")[1].split(":")[0];
    const minutesTZ = timeZone.split(",")[1].split(":")[1];
    const result = `${dateTZ} ${housTZ}:${minutesTZ} ${scheduleType}`;

    return result;
  }

  handleClickInYearList() {
    this.$headYear.addEventListener("click", () => {
      this.$bodyYears.style.visibility = "visible";
    });
    this.el.querySelectorAll(".item-year").forEach((liYear) => {
      liYear.addEventListener("click", () => {
        this.setYear(parseInt(liYear.dataset.year));
        this.$bodyYears.style.visibility = "hidden";
      });
    });
  }

  //RENDERS
  buildYears(year) {
    return `<li id="${year}" class="item-year ${
      this.fullYear == year && `list-years-active`
    }" data-year=${year}>${year}</li>`;
  }

  renderDays() {
    this.$days.innerHTML = "";
    const days = this.getNumDayForMonth(this.getMonth, this.getYear);

    days.map((day, key) => {
      Day(
        this.$days,
        day,
        key,
        this.getYear,
        this.getMonth,
        this.getDayForWeek,
        this.calendarYearOpen
      );
    });

    this.handleStylesOfDaysOff();
  }

  renderSelectionOfYears() {
    const listYears = this.listOfYears();
    this.$listYears.innerHTML = "";
    listYears.map((year) => {
      return (this.$listYears.innerHTML += this.buildYears(year));
    });

    this.handleActiveYearStyle();
    this.handleClickInYearList();
  }

  renderHours() {
    this.$morning.innerHTML = "";
    this.$afterNoon.innerHTML = "";
    this.$night.innerHTML = "";
    const hours = this.getHours.map((hours, i) => {
      const result = this.handleHoursValue(
        hours,
        this.getMinutes[i],
        this.getContinent,
        this.getCountry
      );

      const hoursResult = result.split(" ")[2];
      const turnResult = result.split(" ")[3];

      if (this.getHours[i] < 12) {
        return (this.$morning.innerHTML += `<p data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours">${hoursResult} ${turnResult}</p>`);
      } else if (this.getHours[i] < 18 && this.getHours[i] >= 12) {
        return (this.$afterNoon.innerHTML += `<p  data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours" >${hoursResult} ${turnResult}</p>`);
      } else if (this.getHours[i] < 25 && this.getHours[i] > 18) {
        return (this.$night.innerHTML += `<p  data-minutes=${this.getMinutes[i]} data-hours=${this.getHours[i]} class="hours" >${hoursResult} ${turnResult}</p>`);
      }
    });
  }

  renderResult() {}

  render() {
    this.handleArrows();

    this.$headMonthName.innerHTML = this.months()[this.getMonth];
    this.$headYear.innerHTML = this.getYear;

    this.renderDays();

    this.renderSelectionOfYears();

    if (this.calendarYearOpen == false) {
      this.renderHours();
    }

    this.addEventListeners();
  }

  getFullDate() {
    let fullDate = {};
    const day = this.daySelected[0];
    const month = this.daySelected[1];
    const hours = this.getHoursSelected;
    const minutes = this.getMinutesSelected;
    const hoursFormat = this.handleHoursValue(
      hours,
      minutes,
      this.getContinent,
      this.getCountry
    );

    const result = hoursFormat.split(",")[0].split("  ")[1];

    if (day && month) {
      if (hours) {
        fullDate = {
          year: this.getYear,
          month: month,
          monthName: this.monthsArray[month],
          day: day,
          hours: hours,
          minutes: minutes,
          result: result,
        };
      } else {
        fullDate = {
          year: this.getYear,
          month: month,
          day: day,
        };
      }
    }
    this.handleToogleResultStyles();
    return fullDate;
  }

  addEventListeners() {
    this.handleClickInDay();
    this.handleClickHours();
    this.handleClickInYearList();
  }
}
