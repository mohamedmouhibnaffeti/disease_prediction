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
    
    import { BookUserIcon, BookmarkCheckIcon, CheckCircle2Icon, Clock9Icon, XCircleIcon } from "lucide-react"
    
    export function ActionsTable({actions}: {actions: Array<any>}) {
    return (
        <Table>
            <TableCaption className="border-t border-sickness-border pt-3">A list of all actions.</TableCaption>
            <TableHeader className="hover:bg-sickness-primary/20 transition delay-100 ease-in">
                <TableRow>
                <TableHead>Action ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Lastname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {actions.map((action: any) => {
                    const date = new Date(action.requestedAt)
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    return(
                        <TableRow key={action._id}>
                            <TableCell>{action.state === "pending" ? <Clock9Icon className="text-orange-400" /> : (history.state === "finished" ? <BookmarkCheckIcon className="text-green-500" /> : ( history.state === "refused" ? <XCircleIcon className="text-red-500" /> : ( history.state === "accepted" ? <CheckCircle2Icon className="text-green-800" /> : "") ))}</TableCell>
                            <TableCell>{action.patient.name}</TableCell>
                            <TableCell>{action.patient.lastname}</TableCell>
                            <TableCell>{action.patient.email}</TableCell>
                            <TableCell>+{action.patient.phone}</TableCell>
                            <TableCell>{dateString}</TableCell>
                        </TableRow>
                        )
                })}
            </TableBody>
        </Table>
    )
    }
        