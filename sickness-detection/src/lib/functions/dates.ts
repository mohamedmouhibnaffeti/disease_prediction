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