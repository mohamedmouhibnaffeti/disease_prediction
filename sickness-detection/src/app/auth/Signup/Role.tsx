import DocAvatar from "@/components/SVG/DocAvatar"
import PatientAvatar from "@/components/SVG/patientAvatar"

export default () => {
    return(
        <div className="w-[32rem] shadow-md rounded-lg flex justify-center items-center flex-col gap-4 py-4 px-8 bg-white border border-sickness-border">
            <h1 className="text-sickness-primaryText text-3xl font-semibold"> Signup as... </h1>
            <button className="mt-4 w-full rounded-md text-lg text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"> Patient <PatientAvatar /> </button>
            <button className="mt-4 w-full rounded-md text-lg text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"> Doctor <DocAvatar /> </button>
        </div>
    )
}