import { getHoursAndMinutes } from "@/lib/functions/dates"
export default function TodayAppointmentsCard({appointment, setAppointmentDetails, setDetailsOpen}: {appointment: any, setAppointmentDetails: any, setDetailsOpen: any}) {
    const handleOpenCard = () => {
        setDetailsOpen(true)
        setAppointmentDetails((prev: any) => appointment)
    }
    const date = new Date(appointment.requestedAt)
    const time = getHoursAndMinutes(date)
    return(
        <div className="flex gap-2 border border-sickness-border shadow-md rounded-md pl-2 cursor-pointer hover:bg-sickness-primary/10 transition ease-in delay-100 xl:w-fit w-full" onClick={handleOpenCard} >
            <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit my-2">
                <p> {`${appointment.patient.name[0]}${appointment.patient.lastname[0]}`} </p>
            </div>
            <div className="flex flex-col gap-2 my-2 w-full">
                <h3 className="font-semibold text-sickness-primaryText"> {`${appointment.patient.name} ${appointment.patient.lastname}`} </h3>
                <p className="font-semibold text-sickness-primaryText"> {appointment.lastChecked.firstTime ? appointment.lastChecked.message : "Scheduled" } </p>
            </div>
            <div className="border-l border-sickness-border flex justify-center items-center text-lg font-semibold px-4 w-fit">
                {time.hours}:{time.minutes}
            </div>
        </div>
    )
}