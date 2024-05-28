import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"

import { BookmarkCheckIcon, CheckCircle2Icon, Clock9Icon, XCircleIcon } from "lucide-react"

export function AppointmentsTable({appointments}: {appointments: Array<any>}) {
return (
    <Table>
        <TableCaption className="border-t border-sickness-border pt-3">A list of your appointments.</TableCaption>
        <TableHeader className="hover:bg-sickness-primary/20 transition delay-100 ease-in">
            <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {appointments.map((appointment) => {
                const date = new Date(appointment.requestedAt)
                const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                return(
                    <TableRow key={appointment._id}>
                        <TableCell>{appointment.state === "pending" ? <Clock9Icon className="text-orange-400" /> : (appointment.state === "finished" ? <BookmarkCheckIcon className="text-green-500" /> : ( appointment.state === "refused" ? <XCircleIcon className="text-red-500" /> : ( appointment.state === "accepted" ? <CheckCircle2Icon className="text-green-800" /> : "") ))}</TableCell>
                        <TableCell>{appointment.patient.name}</TableCell>
                        <TableCell>{appointment.patient.lastname}</TableCell>
                        <TableCell>{appointment.patient.email}</TableCell>
                        <TableCell>+{appointment.patient.phone}</TableCell>
                        <TableCell>{dateString}</TableCell>
                    </TableRow>
                    )
            })}
        </TableBody>
    </Table>
)
}
    