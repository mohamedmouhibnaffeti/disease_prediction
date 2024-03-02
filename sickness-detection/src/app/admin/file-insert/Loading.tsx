"use client"
import { Progress } from "@/components/ui/progress"

const DataLoader = ({ status }: {status:number}) => {
    return(
        <div className="h-screen w-screen fixed flex justify-center items-center bg-[#69d2da61]">
            <div className="flex flex-col justify-center items-center bg-white w-[28rem] h-52 rounded-lg gap-6 px-2 py-7">
                <p className="text-slate-700 text-xl text-center font-semibold">Please wait for us to clean, prepare and merge your data...</p>
                <Progress value={status} color="bg-red-500" />
                <span className="font-semibold text-[#072A40] text-lg">{status}% completed</span>
            </div>
        </div>
    )
}

export default DataLoader