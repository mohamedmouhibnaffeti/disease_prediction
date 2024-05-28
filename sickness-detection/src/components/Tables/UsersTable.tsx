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
    
    
    export function UsersTable({ users }: { users: Array<any> }) {
    return (
        <Table className="border">
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader className="border">
            <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
            <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>+{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell> <button className={`${false ? "bg-red-500/70 cursor-default" : "bg-red-500 hover:bg-red-600"} text-white flex justify-center items-center px-4 py-2 text-sm font-semibold rounded-md gap-2 w-28`}> Delete { false && <SmallWhiteLoader /> } </button> </TableCell>
                <TableCell></TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
      