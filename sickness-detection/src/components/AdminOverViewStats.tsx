import { User2Icon } from "lucide-react";
import Disease from "./SVG/Disease";
import DoctorIcon from "./SVG/DoctorIcon";
import Symptom from "./SVG/Symptom";

export default function AdminOverViewStats ({str, val}: {str: string, val: number}) {
    return(
        <div className="flex items-center shadow justify-between p-4 bg-white rounded-md border- border">
        <div>
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
                {str}
            </h6>
            <span className="text-xl font-semibold">{val}</span>
        </div>
        <div>
            {
                str === "Predicted Diseases" ?
                <Disease />
                :
                (
                    str === "Selected Symptoms"?
                        <Symptom />
                    :
                    (
                        str === "Doctors" ?
                            <DoctorIcon className="w-12 h-12 fill-sickness-primary text-sickness-primary" />
                            :
                            str === "Patients" ?
                            <User2Icon className="w-12 h-12 text-sickness-primary" />
                            :
                            ""
                    )

                )
            }
        </div>
    </div>
    )
}   