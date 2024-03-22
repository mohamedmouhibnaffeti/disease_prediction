"use client"
import { AlertOctagon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { useDispatch } from "react-redux"
import { changeEtatByNom } from "@/Store/Predict/PredictSlice"
export default () => {
    const dispatch = useDispatch()
    return (
        <div className="md:w-[44rem] w-[30rem] flex flex-col bg-white border-[1px] border-sickness-border shadow-md rounded-lg md:mt-[8rem] mt-[2rem] py-8 px-4 md:ml-0 ml-[12.8rem]">
            <p className="text-center text-sickness-primaryText font-semibold">Identify possible conditions and treatment related to your symptoms.</p>
            <AlertOctagon  className="text-sickness-ashGray font-semibold self-center h-12 w-12 mt-3"/>
            <div className="flex gap-1 text-sickness-ashGray font-semibold w-full justify-center items-center mt-2"> <p>Please note that this tool doesn't replace a medical professional</p> </div>
            <p className="text-center text-sickness-ashGray font-semibold"> Don't worry, after the prediction is made we'll recommend a doctor near you so you can ask for an appointment </p>
            <div className="flex gap-4 mt-4 ">
                <div className="flex flex-col gap-3  justify-center items-center w-full translate-y-3">
                    <p className="bg-sickness-carolinaBlue px-4 py-2 w-fit font-medium text-white rounded-sm"> Age </p>
                    <input type="text" pattern="[1-9][0-9]" maxLength={2} placeholder="18" className="w-[4rem] h-[3rem] pl-4 text-sickness-ashGray font-medium text-2xl focus:outline-none border-[1px] border-sicness-border focus:border-sickness-carolinaBlue rounded-md" />
                </div>
                <div className="flex flex-col gap-3 mt-6 justify-center items-center w-full">
                    <p className="bg-sickness-carolinaBlue px-4 py-2 w-fit font-medium text-white rounded-sm"> Sex </p>
                    <RadioGroup className="flex gap-2">
                    <div className="flex items-center h-[3rem] space-x-4 px-4 w-full bg-settaFill border-[1px] border-settaBorder py-3 pl-2 rounded-md text-[#999999]">
                        <RadioGroupItem value="Male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center h-[3rem] space-x-4 px-4 bg-settaFill border-[1px] border-settaBorder py-3 rounded-md text-[#999999]">
                        <RadioGroupItem value="Female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                    </div>
                </RadioGroup>
                </div>
            </div>
            <button className="bg-sickness-primary border-2 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6 md:self-end self-center" onClick={()=>dispatch(changeEtatByNom('Symptoms'))}> Continue </button>
        </div>
    )
}