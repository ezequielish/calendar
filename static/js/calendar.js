export default class Calendar {
  constructor(el, yearFree, hours, minutes, continent, country) {
    this.el = el; //calendar container
    this.yearFree = yearFree;
    this.$bodyYears = this.el.querySelector(".calendar__body-years");
    this.$listYears = this.$bodyYears.querySelector(".list_years");
    this.$days = this.el.querySelector(".calendar__body-days");
    this.$headYear = this.el.querySelector("#calendar__head-year");
    this.$headDay = this.el.querySelector("#calendar__head-day");
    this.$headDayWeek = this.el.querySelector("#calendar__head-dayname");
    this.$headMonth = this.el.querySelector("#calendar__head-month");
    this.$btnL = this.el.querySelector("#btn-l");
    this.$btnR = this.el.querySelector("#btn-r");
    this.$dateInArrows = this.el.querySelector("#date_in_arrows");
    this.$hoursAndMinutes = document.querySelector(".hours_and_minutes");
    this.getDay = new Date().getDate();
    this.getMonth = new Date().getMonth();
    this.getYear = new Date().getFullYear();
    this.getDayWeek = new Date().getDay();
    this.daySelected = [new Date().getDate(), new Date().getMonth()];
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
    this.daysOfWeek = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
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
    return this.getYear;
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
   * returns the day of the week, being 0 Sunday the first day and 6 saturday the last day.
   */
  getDayForWeek(year, month, day) {
    return new Date(year, month, day).getDay();
  }

  getDayOffWeekForDay(day) {
    return this.daysOfWeek[day];
  }

  getDaysOfWeek() {
    return this.daysOfWeek;
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
  handleDaysOffDisabled() {
    this.el.querySelectorAll(".calendar__body-day").forEach((element, i) => {
      const dayForWeek = this.daysOff.includes(
        this.getDayForWeek(this.getYear, this.getMonth, i + 1)
      );
      if (dayForWeek) {
        element.classList.add("disabled");
      }
    });
  }

  handleClickInDay() {
    this.$days.querySelectorAll("div").forEach((dayElement) => {
      dayElement.addEventListener("click", () => {
        const isDisabled = dayElement.className.split(" ").includes("disabled");
        const isDayOff = this.daysOff.includes(
          this.getDayForWeek(
            this.getYear,
            this.getMonth,
            dayElement.dataset.day
          )
        );
        if (!isDisabled && !isDayOff) {
          this.handleDayActive(parseInt(dayElement.dataset.day));
          this.handleDaySelected(parseInt(dayElement.dataset.day));
        }
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

  handleHoursChange(hours, minutes, continent, country) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const date = new Date(year, month, day, hours, minutes);
    return date.toLocaleString("en-US", {
      timeZone: `${continent}/${country}`,
    });
  }
  buildDays(day, index) {
    const getDay = new Date().getDate();
    const getMonths = new Date().getMonth();
    const getFullYear = new Date().getFullYear();
    const daysOfWeek = this.getDayForWeek(this.getYear, this.getMonth, day);
    if (day < getDay && !this.yearFree) {
      if (this.getMonth == getMonths && this.getYear == getFullYear) {
        return `<div class="calendar__body-day disabled " data-day="${day}" style="grid-column:${
          daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
        }">${day}</div>`;
      } else {
        return `<div class="calendar__body-day selectable selectable ${
          this.daySelected[0] == day &&
          this.daySelected[1] == this.getMonth &&
          "active"
        }" data-day="${day}" style="grid-column:${
          daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
        }">${day}</div>`;
      }
    } else {
      return `<div class="calendar__body-day selectable ${
        this.daySelected[0] == day &&
        this.daySelected[1] == this.getMonth &&
        "active"
      }" data-day="${day}" style="grid-column:${
        daysOfWeek == 0 && index == 0 ? 7 : daysOfWeek
      }">${day}</div>`;
    }
  }

  buildYears(year) {
    return `<li id="${year}" class="item_year ${
      this.fullYear == year && `list_years-active`
    }" data-year=${year}>${year}</li>`;
  }

  renderDays() {
    this.$days.innerHTML = "";
    const days = this.getNumDayForMonth(this.getMonth, this.getYear);
    days.map((day, i) => {
      return (this.$days.innerHTML += this.buildDays(day, i));
    });
    this.handleDaysOffDisabled();
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
    this.getHours.map((hours, i) => {
      const result = this.handleHoursChange(
        hours,
        this.getMinutes[i],
        this.getContinent,
        this.getCountry
      );
      const hoursResult = result.split(" ")[1];
      const turnResult = result.split(" ")[2];

      return (this.$hoursAndMinutes.innerHTML += `<div>${hoursResult} ${turnResult}</div>`);
    });
  }

  render() {
    this.handleArrows();
    this.$dateInArrows.innerHTML = `${this.months()[this.getMonth]} ${
      this.getYear
    }`;
    this.$headYear.innerHTML = this.getYear;
    this.$headDay.innerHTML = this.getDay;
    this.$headMonth.innerHTML = this.months()[this.getMonth];

    this.$headDayWeek.innerHTML = `${this.getDayOffWeekForDay(
      this.getDayWeek
    )},`;
    this.renderDays();
    this.renderSelectionOfYears();
    console.log("sss", this.yearFree);
    if (this.yearFree == false) {
      this.renderHours();
    }
    this.handleClickInDay();
  }
}
