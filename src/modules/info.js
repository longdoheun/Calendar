
//object
const Today = new Date()

/** object of today's information */
const TODAY = {
  year  : Today.getFullYear(),
  month : Today.getMonth()+1,
  day  : Today.getDate(),
}

class MonthInfo{
  constructor(year, month, day) {
      this.year = year;
      this.month = month;
      this.day = day;
  };
  goLastMonth() {
    return {
      year: this.month > 1 ? this.year : this.year - 1,
      month: this.month > 1 ? this.month - 1 : 12,
      day: this.day
    };
  };
  goNextMonth() {
    return {
      year: this.month < 12 ? this.year : this.year + 1,
      month: this.month < 12 ? this.month + 1 : 1,
      day: this.day
    };
  };
  getDayIndex() {
    const LeapYear = Math.floor(this.year / 4) - (Math.floor(this.year / 100) - Math.floor(this.year / 400));
    const totalSum = this.year + 2 * (this.month - 1) + (this.day - 1) + LeapYear + MONTH[this.month - 1].residual
    const expression = this.month > 2 && this.isLeapYear() ? totalSum + 1 : totalSum;
    return expression % 7
  };
  isLeapYear() {
    const discriminant = this.year % 4 !== 0 || (this.year % 100 === 0 && this.year % 400 !== 0);
    return discriminant ? false : true;
  };
  generateDate() {
    MONTH[1].totalDate = this.isLeapYear() ? 29 : 28;
    const firstDayIndex = this.getDayIndex();
    const sufficientNum = firstDayIndex + MONTH[this.month - 1].totalDate;
    const necessaryNum = sufficientNum > 35 ? 42 : 42;
    const dayArray = []
    for (let i = 0; i < necessaryNum; i++) {
      if (i >= sufficientNum || i < firstDayIndex) {
      dayArray.push("");
    } else {
      dayArray.push(`${i - firstDayIndex + 1}`);
      };
    };
    const matrix = [[], [], [], [], [], [], []];
    for (let i = 0; i < dayArray.length; i++) {
      matrix[i % 7].push(dayArray[i]);
    };
    return matrix
  }
  getTotalDate() {
    return this.year * 365 + this.month * 31 + this.day;
  }
  adjustNum(num) {
    return num < 10 ? `0${num}` : num
  }
  getISOdate() {
    return `${this.year}-${this.adjustNum(this.month)}-${this.adjustNum(this.day)}`
  }
};

class MonthIso{
  constructor(isoString="2022-09-30T14:19:00.000Z") {
    const [year, month, day, hour, min, sec] = isoString.split(/[-T:.]/);
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.min = min;
    this.sec = sec;
  }
  getDayId() {
    return `${this.year}-${this.month}-${this.day}`
  }
  getDateKOR() {
    return `${this.year}년 ${this.month}월 ${this.day}일`
  }
  getTimeKOR() {
    return `${this.hour}시 ${this.min}분 ${this.sec}초`
  }
  getTime() {
    return `${this.hour}:${this.min}`
  }
}

class DailyInfo{
  constructor(data, liPx, borderPx) {
    const [startHour, startMin ] = new MonthIso(data.start).getTime().split(":")
    const [finishHour, finishMin ] = new MonthIso(data.end).getTime().split(":")
    this.startHour = Number(startHour.substr(0,1) === "0" ? startHour.substr(1) : startHour)
    this.startMin = Number(startMin);
    this.finishHour = Number(finishHour.substr(0,1) === "0" ? finishHour.substr(1) : finishHour);
    this.finishMin = Number(finishMin);
    this.color = data.color;
    this.liPx = liPx;
    this.borderPx = borderPx;
    console.log(this.startHour, this.startMin, this.finishHour, this.finishMin);
  }
  change_total_min(){
    return (this.finishHour - this.startHour)*60 + (this.finishMin - this.startMin);
  }
  calculateMarginTop (){
    return (this.liPx) * this.startHour + this.liPx / 60 * this.startMin + this.borderPx;
  }
  calculateHeight (){
    const totalMin = this.change_total_min();
    const fisrtTerm = this.liPx/60*totalMin;
    return parseInt(totalMin/60)-1 >= 0 ? fisrtTerm + (parseInt(totalMin/60)-1)*this.borderPx : fisrtTerm ;
  }
  getEventStyle (){
    return {
      top: `${this.calculateMarginTop()}px`,
      background: `${this.color}`,
      height: `${this.calculateHeight()}px`,
    };
  }
};
  
const DAY_OF_THE_WEEK = {
  kor: ["일", "월", "화", "수", "목", "금", "토"],
  eng: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  engAbb: ["S", "M", "T", "W", "T", "F", "S"]
  }

const COLOR_LIST = [
  "rgba(250,128,114,0.5)", 
  "rgba(0,128,0,0.5)",
  "rgba(0,128,114,0.5)",
  "green", 
  "salmon", 
  "red", 
  "rgba(192, 218, 179, 0.5)",
  "rgba(231, 212,133, 0.5)",
  "rgba(225,143,229, 0.5)",
  "rgba(180,179,219, 0.5)",
]

const MONTH = [
  {
    name : "JANUARY",
    number : "01",
    totalDate : 31,
    residual : 0
  },
  {
    name : "FEBRUARY",
    number : "02",
    totalDate : 28,
    residual : 1,
  },
  {
    name : "MARCH",
    number : "03",
    totalDate : 31,
    residual : -1
  },
  {
    name : "APRIL",
    number : "04", 
    totalDate : 30,
    residual : 0
  },
  {
    name : "MAY",
    number : "05",
    totalDate : 31,
    residual : 0
  },
  {
    name : "JUNE",
    number : "06",
    totalDate : 30,
    residual : 1
  },
  {
    name : "JULY",
    number : "07",
    totalDate : 31,
    residual : 1
  },
  {
    name : "AUGUST",
    number : "08",
    totalDate : 31,
    residual : 2
  },
  {
    name : "SEPTEMBER",
    number : "09",
    totalDate : 30,
    residual : 3
  },
  {
    name : "OCTOBER",
    number : "10", 
    totalDate : 31,
    residual : 3
  },
  {
    name : "NOVEMBER",
    number : "11", 
    totalDate : 30,
    residual : 4
  },
  {
    name : "DECEMBER",
    number : "12", 
    totalDate : 31,
    residual : 4
  }
]

  const darkStyle = {
    cover: {
      backgroundColor: "#fff",
      borderColor: "#161b22",
    },
    btn: {
      marginLeft: "22px",
      backgroundColor: "#161b22",
    }
  };

  const lightStyle = {
    cover: {
      backgroundColor: "#161b22",
      borderColor: "#fff",
    },
    btn: {
      marginLeft: "3px",
      backgroundColor: "#fff",
    }
  };

export { MONTH, TODAY, DAY_OF_THE_WEEK, COLOR_LIST, darkStyle, lightStyle, MonthInfo, MonthIso, DailyInfo }