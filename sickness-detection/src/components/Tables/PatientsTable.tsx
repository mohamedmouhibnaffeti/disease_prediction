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

const patients = [
    {
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890"
    },
    {
        name: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210"
    },
    {
        name: "Alice",
        lastname: "Johnson",
        email: "alice.johnson@example.com",
        phone: "555-555-5555"
    },
    {
        name: "Bob",
        lastname: "Brown",
        email: "bob.brown@example.com",
        phone: "111-222-3333"
    },
    {
        name: "Emily",
        lastname: "Davis",
        email: "emily.davis@example.com",
        phone: "444-444-4444"
    },
    {
        name: "Michael",
        lastname: "Wilson",
        email: "michael.wilson@example.com",
        phone: "666-777-8888"
    },
    {
        name: "Sarah",
        lastname: "Taylor",
        email: "sarah.taylor@example.com",
        phone: "999-999-9999"
    }
];


export function PatientsTable({ patients }: { patients: Array<any> }) {
    console.log(patients)
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
            <TableCell>{patient.phone}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}
  