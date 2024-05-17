export default function AppointmentDetailsCard() {
    return(
        <div className="flex flex-col gap-2 border border-sickness-border shadow-md rounded-md pb-2 w-full">
            <div className="flex gap-2">
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit my-2 ml-2">
                    <p> MN </p>
                </div>
                <div className="flex flex-col gap-2  my-2 mx-2">
                    <h3 className="font-semibold text-sickness-primaryText"> Mouhib Naffeti </h3>
                    <p className="font-semibold text-sickness-primaryText"> Male, 20 years old </p>
                    <p className="font-semibold text-sickness-primaryText"> Symptoms: <span className="font-normal text-sickness-gray"> headache, runny nose, runny nose, runny nose </span> </p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-sickness-border" />
            <p className="font-semibold text-sickness-primaryText text-center self-center flex"> Last Checked: <span className="font-normal text-sickness-gray"> First visit </span> </p>
        </div>
    )
}