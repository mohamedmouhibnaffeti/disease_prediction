import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"


export function PatientsTable({ patients }: { patients: Array<any> }) {
return (
    <Table>
    <TableCaption>A list of your patients.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Lastname</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {patients.map(({patient}) => (
        <TableRow key={patient.email}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.lastname}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>+{patient.phone}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}
  