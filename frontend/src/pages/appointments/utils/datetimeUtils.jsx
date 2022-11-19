function formatDate(dateStr){
    const date = new Date(dateStr)

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const formattedDate = {
        year:date.getFullYear(), 
        monthNum: date.getMonth() +1,
        month: months[date.getMonth()],
        weekDay: days[date.getDay()],
        dayOfMonth: date.getDate(),
        dateStr: date.getDate() + "/" +  (date.getMonth()+1) + "/" +date.getFullYear(),

        hour:date.getHours(),
        minute:date.getUTCMinutes(),
        time: date.getTime(),

        timeStr: date.getHours() + ":"  + date.getUTCMinutes()
    }
    return formattedDate

}



function formatMinutes(timeStr){
    const minutesArray = timeStr.split(":")
    const minutes = minutesArray[1]

    return minutes

}

function formatTime(timeStr){
    const timeArr = timeStr.split(":")
    const timeHourMin = timeArr[0] + ":" +timeArr[1] 

    return timeHourMin
}




export {formatDate,formatTime, formatMinutes}