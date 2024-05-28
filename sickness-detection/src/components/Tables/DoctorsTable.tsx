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
import SmallWhiteLoader from "../Loaders/WhiteButtonLoader"
import Drawer from "../Drawer"
    
    
    export function DoctorsTable({ doctors }: { doctors: Array<any> }) {
    return (
        <Table className="border">
        <TableCaption>A list of your doctors.</TableCaption>
        <TableHeader className="border">
            <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {doctors.map((doctor) => (
            <TableRow key={doctor.email}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.lastname}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>+{doctor.phone}</TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell> <Drawer triggerButton={<button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button>} /> </TableCell>
                <TableCell></TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
      