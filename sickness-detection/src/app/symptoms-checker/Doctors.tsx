import { lazy, useEffect, useLayoutEffect, useState } from "react"
import { getRandomColor } from "@/lib/statics/Colors"
import { useDispatch, useSelector } from "react-redux"
import { changeEtatByNom } from "@/Store/Predict/PredictSlice"
import { AppDispatch, RootState } from "@/Store/store"
import { fetchDoctorsBySpeciality } from "@/Store/doctor/doctorSlice"
const DoctorCard = lazy(()=>import('@/components/DoctorCard'))

export default () => {
    const dispatch = useDispatch<AppDispatch>()
    const { doctors } = useSelector((state: RootState) => state.Doctor)
    const [sickness, setSickness] = useState<any>()
    const fetchDoctors = async() => {
        await dispatch(fetchDoctorsBySpeciality({speciality: sickness?.Sickness?.speciality}))
    }
    useLayoutEffect(()=>{
        const stringSickness = localStorage.getItem("sickness") || ""
        console.log(stringSickness)
        setSickness((prevSickness: any) => JSON.parse(stringSickness))
    }, [])
    useEffect(()=>{
        console.log(sickness)
        if(sickness){
            fetchDoctors()
        }
    }, [sickness])
    console.log(doctors)
    return(
        <div className="w-full mt-[2rem] px-8 py-4 flex flex-col">
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