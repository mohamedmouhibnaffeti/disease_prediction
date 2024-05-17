export default function TodayAppointmentsCard() {
    return(
        <div className="flex gap-2 border border-sickness-border shadow-md rounded-md pl-2 cursor-pointer hover:bg-sickness-primary/10 transition ease-in delay-100 lg:w-fit w-full">
            <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit my-2">
                <p> MN </p>
            </div>
            <div className="flex flex-col gap-2 my-2 w-full">
                <h3 className="font-semibold text-sickness-primaryText"> Mouhib Naffeti </h3>
                <p className="font-semibold text-sickness-primaryText"> New Visit </p>
            </div>
            <div className="border-l border-sickness-border flex justify-center items-center text-lg font-semibold px-4">
                9:15
            </div>
        </div>
    )
}