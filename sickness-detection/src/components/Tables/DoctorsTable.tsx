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
import SmallRedLoader from "../Loaders/SmallRedLoader"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import { changeDoctorState, openDrawer, selectState, setSelectedDoctor } from "@/Store/admin/AdminSlice"
import { ArchiveIcon, CheckCircle2, Clock10Icon, MinusIcon, XCircleIcon } from "lucide-react"
import ManageDoctorsDrawer from "../manage_doctors_drawer"
import { useToast } from "../ui/use-toast"
import { useState } from "react"

export function DoctorsTable({ doctors }: { doctors: Array<any> }) {
    const dispatch = useDispatch<AppDispatch>()
    const handleSelectDoctor = (id: any) => {
        dispatch(openDrawer(true))
        dispatch(setSelectedDoctor(id))
        dispatch(selectState("accepted"))
    }
    const [deleting, setDeleting] = useState({state: false, id: ""})
    const { toast } = useToast()
    const changeDoctorStateCall = async ({state, id}: {state: string, id: any}) => {
        setDeleting({state: true, id: id})
        dispatch(selectState(state))
        dispatch(setSelectedDoctor(id))
        const response = await dispatch(changeDoctorState())
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
                description: <p> Couldn&apos;t update doctor, Please try again later. </p>,
                })
            }
    }
return (
    <Table className="border">
    <TableCaption>A list of your doctors.</TableCaption>
    <TableHeader className="border">
        <TableRow>
        <TableHead>Status</TableHead>
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
            <TableCell className={`flex gap-2 font-medium ${doctor.state === "accepted" ? "text-green-500" : (doctor.state === "pending" ? "text-orange-400" : (doctor.state === "refused" ? "text-red-500" : (doctor.state === "archived" ? "text-sickness-gray" : "")))}`}>
                { 
                    doctor.state === "accepted" ? <CheckCircle2 className="w-5 h-5" /> : (doctor.state === "pending" ? <Clock10Icon className="w-5 h-5" /> : (doctor.state === "refused" ? <XCircleIcon className="w-5 h-5" /> : (doctor.state === "archived" ? <ArchiveIcon className="w-5 h-5" /> : "")))
                }
                {doctor.state}
                    
            </TableCell>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.lastname}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>+{doctor.phone}</TableCell>
            <TableCell>{doctor.speciality}</TableCell>
            <TableCell> 
                { 
                    doctor.state === "accepted" ? 
                    <button disabled={deleting.state} onClick={()=>changeDoctorStateCall({state: "archived", id: doctor._id})} className={`border rounded-sm ${(deleting.state && deleting.id === doctor._id) ? "text-red-500 border-red-500" : "text-sickness-border border-sickness-border hover:border-red-500 hover:text-red-500"} transition ease-out delay-100 text-xs px-1 py-1 flex justify-center items-center gap-2`}> ARCHIVE {(deleting.state && deleting.id === doctor._id) ? <SmallRedLoader /> : <ArchiveIcon className="w-[0.9rem] h-[0.9rem] " />} </button> 
                            : (doctor.state === "pending" ? <button onClick={()=>handleSelectDoctor(doctor._id)} className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button> 
                                : (doctor.state === "refused" ? <button onClick={()=>handleSelectDoctor(doctor._id)} className="border border-sickness-border rounded-sm text-sickness-border hover:border-red-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button> 
                                    : (doctor.state === "archived" ? 
                                        <button onClick={()=>handleSelectDoctor(doctor._id)} className="border border-sickness-border rounded-sm text-sickness-border hover:border-red-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button>  
                                        : 
                                        "")
                                    )
                                )
                }
            </TableCell>
        </TableRow>
        ))}
    </TableBody>
    <ManageDoctorsDrawer />
    </Table>
)
}
    