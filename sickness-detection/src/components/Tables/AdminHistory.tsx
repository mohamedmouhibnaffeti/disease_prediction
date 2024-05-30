import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"
import { getHoursAndMinutes } from "@/lib/functions/dates"
    
    import { BookmarkCheckIcon, CheckCircle2Icon, Clock9Icon, XCircleIcon } from "lucide-react"
    
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
                <TableHead>description</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {actions.map((action: any) => {
                    const date = new Date(action.createdAt)
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${getHoursAndMinutes(date).hours}:${getHoursAndMinutes(date).minutes}`
                    return(
                        <TableRow key={action._id}>
                            <TableCell>{action._id}</TableCell>
                            <TableCell>{action.owner.name}</TableCell>
                            <TableCell>{action.owner.lastname}</TableCell>
                            <TableCell>{action.owner.email}</TableCell>
                            <TableCell>{action.description}</TableCell>
                            <TableCell>{dateString}</TableCell>
                        </TableRow>
                        )
                })}
            </TableBody>
        </Table>
    )
    }
        