import { addDays, format, startOfDay, compareAsc } from "date-fns"
export function compareDateWithToday(date: any){
    const stripTime = (date: Date) => startOfDay(date)
    const today = stripTime(new Date())
    const selectedDate = stripTime(date)
    const comparison = compareAsc(selectedDate, today)
    if (comparison === 0) {
        return true
    }else{
        return false
    }
}

export const getMonthName = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' })
};

export function isToday(date: Date){
    const today = new Date()

    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()

    const Year = date.getFullYear()
    const Month = date.getMonth()
    const Day = date.getDate()

    return (todayDay === Day && todayMonth === Month && todayYear === Year)
}

export function isYesterday(date: Date){
    const today = new Date()

    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate() - 1

    const Year = date.getFullYear()
    const Month = date.getMonth()
    const Day = date.getDate()

    return (todayDay === Day && todayMonth === Month && todayYear === Year)
}

export function compareDates(date1: Date,date2: Date){

    const Year1 = date1.getFullYear()
    const Month1 = date1.getMonth()
    const Day1 = date1.getDate() 

    const Year2 = date2.getFullYear()
    const Month2 = date2.getMonth()
    const Day2 = date2.getDate()

    return (Day1 === Day2 && Month1 === Month2 && Year1 === Year2)
}

export function getHoursAndMinutes(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { hours, minutes };
}


export function Greeting() {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}