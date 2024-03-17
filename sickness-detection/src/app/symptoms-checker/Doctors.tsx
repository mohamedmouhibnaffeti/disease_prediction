import { lazy } from "react"
import { getRandomColor } from "@/lib/statics/Colors"
import { useDispatch } from "react-redux"
import { changeEtatByNom } from "@/Store/InsertSymptoms/InsertSymptomsSlice"
const DoctorCard = lazy(()=>import('@/components/DoctorCard'))

let doctors = [
    {
        "first_name": "John",
        "last_name": "Smith",
        "specialty": "Cardiologist",
        "years_of_experience": 15,
        "rating": 4.8
    },
    {
        "first_name": "Emily",
        "last_name": "Johnson",
        "specialty": "Pediatrician",
        "years_of_experience": 10,
        "rating": 4.5
    },
    {
        "first_name": "Michael",
        "last_name": "Brown",
        "specialty": "Dermatologist",
        "years_of_experience": 20,
        "rating": 4.9
    },
    {
        "first_name": "John",
        "last_name": "Smith",
        "specialty": "Cardiologist",
        "years_of_experience": 15,
        "rating": 4.8
    },
    {
        "first_name": "Emily",
        "last_name": "Johnson",
        "specialty": "Pediatrician",
        "years_of_experience": 10,
        "rating": 4.5
    },
    {
        "first_name": "John",
        "last_name": "Smith",
        "specialty": "Cardiologist",
        "years_of_experience": 15,
        "rating": 4.8
    },
    {
        "first_name": "Emily",
        "last_name": "Johnson",
        "specialty": "Pediatrician",
        "years_of_experience": 10,
        "rating": 4.5
    },
];
export default () => {
    const dispatch = useDispatch()
    return(
        <div className="w-full mt-[2rem] md:px-[16rem] px-4 pb-12 flex flex-col md:ml-0 ml-[12rem]">
            <h1 className="md:text-3xl text-xl font-bold text-sickness-primaryText md:self-start self-center"> Doctors for your sickness : </h1>
            <div className="w-full flex flex-wrap justify-center items-center mt-4 gap-6 px-4">
                {doctors.map((doctor, index)=>{
                    return(
                        <DoctorCard doctor={doctor} color={getRandomColor()} key={index} />
                    )
                })}
                
            </div>
            
            <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6 self-center" onClick={()=>dispatch(changeEtatByNom('recommendations'))}> Back </button>
        </div>
    )
}