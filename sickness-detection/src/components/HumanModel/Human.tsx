"use client"

import { useState } from "react"
import MaleBack from "./MaleBack"
import MaleFront from "./MaleFront"
import FemaleBack from "./FemaleBack"
import FemaleFront from "./FemaleFront"

const Human = () => {
    const [Side, setSide] = useState(false)
    return (
        <div className="w-96 h-fit py-8 bg-white">
            <button className="px-2 py-1 bg-black text-white" onClick={()=>setSide(prevside => !prevside)}> Rotate </button>
            {Side ? <MaleBack /> : <MaleFront />}
        </div>
    )
}

export default Human