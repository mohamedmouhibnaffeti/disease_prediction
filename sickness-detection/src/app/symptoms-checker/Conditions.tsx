import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useContext, useState } from "react"
import React from "react"
import { PlusIcon } from "lucide-react"
import { SymptomsCheckerContext } from "./SymptomsCheckerContext"

const CalendarComponent = (props: {date: any, setDate: any}) => {
    const { date, setDate } = props
    return(
        <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal self-end rounded-l-none h-12 border-l-0",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    )
}

export default () => {
    const { changeEtatByName } = useContext(SymptomsCheckerContext) 
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
    return (
        <div className="w-[44rem] flex flex-col bg-white border-[1px] border-sickness-border shadow-md rounded-lg mt-[8rem] py-8 px-4">
            <p className="text-center text-sickness-primaryText font-semibold">Please provide details of your current and past medical conditions to help us understand your health history better and enhance our ability to make accurate predictions.</p>
            <div className="flex">
                <input type="text" placeholder="Hyper tension, ..." className="rounded-r-none w-full focus:outline-none focus:border-sickness-primary border-[1px] border-sickness-border rounded-md pl-4 py-2" />
                <CalendarComponent date={date} setDate={setDate} />
            </div>
            <button className="text-white bg-sickness-rosyBrown/70 flex justify-center items-center py-2 mt-3 font-semibold rounded-md"> <PlusIcon /> Add Condition </button>
            <div className="flex justify-between w-full">
                <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>changeEtatByName('Symptoms')}> Back </button>
                <button className="bg-sickness-primary border-2 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6"> Continue </button>
            </div>
        </div>
    )
}