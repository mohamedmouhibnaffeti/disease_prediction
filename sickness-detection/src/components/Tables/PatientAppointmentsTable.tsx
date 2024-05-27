import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"
    
    import { BookUserIcon, BookmarkCheckIcon, Clock9Icon, MinusIcon, XCircleIcon } from "lucide-react"
    
    export function PatientAppointmentsTable({appointments}: {appointments: Array<any>}) {
    return (
        <Table>
            <TableCaption className="border-t border-sickness-border pt-3">A list of your appointments.</TableCaption>
            <TableHeader className="hover:bg-sickness-primary/20 transition delay-100 ease-in">
                <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Doctor Name</TableHead>
                <TableHead>Doctor Lastname</TableHead>
                <TableHead>Doctor Speciality</TableHead>
                <TableHead>Doctor Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => {
                    const date = new Date(appointment.requestedAt)
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    return(
                        <TableRow key={appointment._id} className="font-medium">
                            <TableCell>{appointment.state === "pending" ? <Clock9Icon className="text-orange-400" /> : (appointment.state === "finished" ? <BookmarkCheckIcon className="text-green-500" /> : ( appointment.state === "refused" ? <XCircleIcon className="text-red-500" /> : "" ))}</TableCell>
                            <TableCell>{appointment.doctor.name}</TableCell>
                            <TableCell>{appointment.doctor.lastname}</TableCell>
                            <TableCell>{appointment.doctor.speciality}</TableCell>
                            <TableCell>+{appointment.doctor.phone}</TableCell>
                            <TableCell>{dateString}</TableCell>
                            <TableCell>{appointment.state === "finished" ? <button className="bg-green-500 hover:bg-green-600 transition delay-100 ease-in-out text-white text-sm px-2 py-1 rounded-md font-semibold"> View Details </button> : <MinusIcon className="text-sickness-gray translate-x-8" />}</TableCell>
                        </TableRow>
                        )
                })}
            </TableBody>
        </Table>
    )
    }
        