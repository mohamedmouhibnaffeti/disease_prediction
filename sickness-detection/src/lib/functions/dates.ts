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