import React, { useCallback, useEffect, useState } from 'react'

function getCurrentDate(){
    var time = new Date();
    const months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
        };
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateString = days[time.getDay()] + ", " + checkSingleDigit(time.getDate()) + " " +months[time.getMonth()] + " " + time.getFullYear();
    var hourString = checkSingleDigit(time.getHours()) + ":" + checkSingleDigit(time.getMinutes()) + ":" + checkSingleDigit(time.getSeconds());
    return [dateString, hourString];
}

function checkSingleDigit(target){
    if(target < 10){
        return "0" + target
    }else{
        return target
    }
}

function HeaderDate() {
    const [timeString, setTime] = useState(getCurrentDate());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentDate());
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='whiteBox-dateTime'>
            <div className='tealText-date'> { timeString[0] } </div> 
            <div className='tealText-hour'> { timeString[1] } </div> 
        </div>
    );
}

export default HeaderDate;