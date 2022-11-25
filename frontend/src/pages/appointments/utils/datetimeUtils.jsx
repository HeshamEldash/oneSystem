function formatDate(dateStr) {
  const date = new Date(dateStr);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedDate = {
    year: date.getFullYear(),
    monthNum: date.getMonth() + 1,
    month: months[date.getMonth()],
    weekDay: days[date.getDay()],
    dayOfMonth: date.getDate(),
    dateStr:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),

    hour: date.getHours(),
    minute: date.getUTCMinutes(),
    time: date.getTime(),

    timeStr: date.getHours() + ":" + date.getUTCMinutes(),
  };
  return formattedDate;
}

function formatMinutes(timeStr) {
  const minutesArray = timeStr.split(":");
  const minutes = minutesArray[1];

  return minutes;
}

function formatTime(timeStr) {
  const timeArr = timeStr.split(":");
  const timeHourMin = timeArr[0] + ":" + timeArr[1];

  return timeHourMin;
}

function dateFromCalenderObj(calenderObj) {
    // handles the output of the calender and returns a Date object 
  const outPutDate = new Date(
    calenderObj.year + "-" + calenderObj.month + "-" + calenderObj.day
  );
  return outPutDate;
}

function formatOneDigit(num){
    if (num.toString().length === 1){
      return `0${num}`
    }
    else return num
 
}

function dateStringFromCalenderObj(calenderObj) {
    // handles the output of the calender and returns a Date object 
  const outPutDate = 
    calenderObj.year + "-" + formatOneDigit(calenderObj.month) + "-" + formatOneDigit(calenderObj.day)
  console.log(outPutDate)
  return outPutDate;
}

function listOfDatesFromCalenderObj(objDatesArr) {
 // handles the output of the calender and returns an array of Date object 
  let formattedArray = [];
  objDatesArr.map((obj) => {
    let formattedDate = dateFromCalenderObj(obj);
    formattedArray.push(formattedDate);
  });

  return formattedArray;
}



export { formatDate, formatTime, formatMinutes ,listOfDatesFromCalenderObj, dateFromCalenderObj, dateStringFromCalenderObj};
