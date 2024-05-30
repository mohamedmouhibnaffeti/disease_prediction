import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { ArchiveIcon, CheckCircle2, CheckIcon, MinusIcon } from "lucide-react"
import { useState } from "react"
import SmallRedLoader from "../Loaders/SmallRedLoader"
import { changePatientState, selectPatient, selectState } from "@/Store/admin/AdminSlice"
import { useToast } from "../ui/use-toast"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import SmallGreenLoader from "../Loaders/SmallGreenLoader"


export function UsersTable({ users }: { users: Array<any> }) {
    const [deleting, setDeleting] = useState({state: false, id: ""})
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const changeDoctorStateCall = async ({state, id}: {state: string, id: any}) => {
        setDeleting({state: true, id: id})
        dispatch(selectState(state))
        dispatch(selectPatient(id))
        const response = await dispatch(changePatientState())
        setDeleting({state: true, id: ""})
        if(response.payload.status === 200){
            toast({
                title: "Congratulations !",
                description: <p> Doctor updated successfully.</p>,
                })
                window.location.reload()
            }
            else if(response.payload.status === 400){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> { response.payload.message } </p>,
                })
            }
            else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn't update doctor, Please try again later. </p>,
                })
            }
    }
return (
    <Table className="border">
    <TableCaption>A list of your users.</TableCaption>
    <TableHeader className="border">
        <TableRow>
        <TableHead>Status</TableHead>
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
            <TableCell className={`flex gap-2 font-medium ${user.state === "accepted" ? "text-green-500" : (user.state === "archived" ? "text-sickness-gray" : "")}`}>
                { 
                    user.state === "accepted" ? <CheckCircle2 className="w-5 h-5" /> : (user.state === "archived" ? <ArchiveIcon className="w-5 h-5" /> : "")
                }
                {user.state}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>+{user.phone}</TableCell>
            <TableCell>{user.gender}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell> 
                { 
                    user.state === "accepted" ? 
                    <button disabled={deleting.state} onClick={()=>changeDoctorStateCall({state: "archived", id: user._id})} className={`border rounded-sm ${(deleting.state && deleting.id === user._id) ? "text-red-500 border-red-500" : "text-sickness-border border-sickness-border hover:border-red-500 hover:text-red-500"} transition ease-out delay-100 text-xs px-1 py-1 flex justify-center items-center gap-2`}> ARCHIVE {(deleting.state && deleting.id === user._id) ? <SmallRedLoader /> : <ArchiveIcon className="w-[0.9rem] h-[0.9rem] " />} </button> 
                                    : (user.state === "archived" ? 
                                    <button disabled={deleting.state} onClick={()=>changeDoctorStateCall({state: "accepted", id: user._id})} className={`border rounded-sm ${(deleting.state && deleting.id === user._id) ? "text-green-500 border-green-500" : "text-sickness-border border-sickness-border hover:border-green-500 hover:text-green-500"} transition ease-out delay-100 text-xs px-1 py-1 flex justify-center items-center gap-2`}> ACCEPT {(deleting.state && deleting.id === user._id) ? <SmallGreenLoader /> : <CheckIcon className="w-[0.9rem] h-[0.9rem] " />} </button>  : 
                                        "")
                }
            </TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}
    