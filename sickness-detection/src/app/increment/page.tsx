"use client"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import { fetchData } from "@/Store/counter/counterSlice"
import withAuth from "@/components/HOC/AuthHOC"

const Increment = () => {
    const count = useSelector((state: RootState)=>state.counter?.value)
    const dispatch = useDispatch<AppDispatch>()
    return(
        <div className="flex justify-center items-center h-screen w-screen gap-8">
            <button className="px-4 py-2 bg-sickness-lightBlue" onClick={()=>dispatch(fetchData())} >
                Increment
            </button>
            {count}
        </div>
    )
}

export default withAuth(Increment, ["doctor"])