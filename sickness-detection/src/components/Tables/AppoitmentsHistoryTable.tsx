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

import { BookUserIcon } from "lucide-react"

const appointments = [
    {
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        date: "17/11/2001"
    },
    {
        name: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        date: "17/11/2001"
    },
    {
        name: "Alice",
        lastname: "Johnson",
        email: "alice.johnson@example.com",
        phone: "555-555-5555",
        date: "17/11/2001"
    },
    {
        name: "Bob",
        lastname: "Brown",
        email: "bob.brown@example.com",
        phone: "111-222-3333",
        date: "17/11/1999"
    },
    {
        name: "Emily",
        lastname: "Davis",
        email: "emily.davis@example.com",
        phone: "444-444-4444",
        date: "17/11/2001"
    },
    {
        name: "Michael",
        lastname: "Wilson",
        email: "michael.wilson@example.com",
        phone: "666-777-8888",
        date: "17/11/2002"
    },
    {
        name: "Sarah",
        lastname: "Taylor",
        email: "sarah.taylor@example.com",
        phone: "999-999-9999",
        date: "17/11/2001"
    }
];


export function AppointmentsTable() {
return (
    <Table>
        <TableCaption className="border-t border-sickness-border pt-3">A list of your appointments.</TableCaption>
        <TableHeader className="hover:bg-sickness-primary/20 transition delay-100 ease-in">
            <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {appointments.map((appointment) => (
            <TableRow key={appointment.email}>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.lastname}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell> <button className="bg-sickness-primary text-white font-semibold text-sm hover:bg-sickness-primary/80 transition delay-100 ease-in flex px-2 py-1 w-fit h-fit rounded-md gap-2"> Details <BookUserIcon className="w-5 h-5" /> </button> </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
)
}
    