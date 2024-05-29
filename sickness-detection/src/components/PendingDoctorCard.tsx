import { useDispatch } from "react-redux"
import Drawer from "./Drawer"
import { AppDispatch } from "@/Store/store"
import { openDrawer, setSelectedDoctor } from "@/Store/admin/AdminSlice"
export default function PendingDoctorCard({doctor}: {doctor: any}){
    const dispatch = useDispatch<AppDispatch>()
    const handleSelectDoctor = () => {
        dispatch(openDrawer(true))
        dispatch(setSelectedDoctor(doctor._id))
    }
    return(
        <div className="cardPattern flex flex-col shadow p-4 gap-1 bg-white rounded-md border-sickness-border border text-sm">
            <div className="flex w-full justify-between">
                <p className="truncate max-w-48 text-sickness-orange font-semibold"> Name: <span className="text-sickness-primaryText"> {doctor.name} </span> </p>
                <button onClick={handleSelectDoctor} className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button>
            </div>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Lastname: <span className="text-sickness-primaryText"> {doctor.lastname} </span> </p>
            <p className="text-sickness-orange font-semibold"> Speciality: <span className="text-sickness-primaryText"> {doctor.speciality} </span> </p>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Phone: <span className="text-sickness-primaryText"> +{doctor.phone} </span> </p>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Email: <span className="text-sickness-primaryText"> {doctor.email} </span> </p>
        </div>
    )
}