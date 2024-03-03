"use client"

import { useState } from "react"
import MaleBack from "./MaleBack"
import MaleFront from "./MaleFront"
import FemaleBack from "./FemaleBack"
import FemaleFront from "./FemaleFront"

const Human = () => {
    const [Side, setSide] = useState(false)
    return (
        <div className="w-[34rem] flex">
            {Side ? <MaleBack /> : <MaleFront />}
            <div className="flex  flex-col gap-3 mt-12">
                <button className="px-4 py-1 h-fit bg-sickness-mayaBlue rounded-sm text-white" onClick={()=>setSide(prevside => !prevside)}> Rotate </button>
                <button className="px-4 py-1 h-fit bg-sickness-mayaBlue rounded-sm text-white"> Skin </button>
            </div>
        </div>
    )
}

export default Human