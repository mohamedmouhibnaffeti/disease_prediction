export default function PendingAppointmentCard() {
    return(
        <div className="flex gap-2 border border-sickness-border shadow-md rounded-md p-2 cursor-pointer hover:bg-sickness-primary/10 transition ease-in delay-100">
            <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit">
                <p> MN </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-sickness-primaryText"> Bird Flu </h3>
                <p className="font-semibold text-sickness-primaryText"> Symptoms: <span className="font-normal text-sickness-gray"> headache, runny nose, runny nose, runny nose </span> </p>
            </div>
        </div>
    )
}