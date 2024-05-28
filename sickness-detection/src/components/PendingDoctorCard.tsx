import Drawer from "./Drawer"
export default function PendingDoctorCard(){
    return(
        <div className="cardPattern flex flex-col shadow p-4 gap-1 bg-white rounded-md border-sickness-border border text-sm">
            <div className="flex w-full justify-between">
                <p className="truncate max-w-48 text-sickness-orange font-semibold"> Name: <span className="text-sickness-primaryText"> Mohamed Mouhib </span> </p>
                <Drawer triggerButton={<button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> VIEW CARDS </button>} />
            </div>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Lastname: <span className="text-sickness-primaryText"> Naffeti </span> </p>
            <p className="text-sickness-orange font-semibold"> Speciality: <span className="text-sickness-primaryText"> Cardiologist </span> </p>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Phone: <span className="text-sickness-primaryText"> +21692144354 </span> </p>
            <p className="truncate max-w-96 text-sickness-orange font-semibold"> Email: <span className="text-sickness-primaryText"> contact.mohamednaffeti@gmail.com </span> </p>
        </div>
    )
}