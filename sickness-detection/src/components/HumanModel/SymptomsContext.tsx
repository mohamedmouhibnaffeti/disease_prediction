import { createContext, useState } from "react";

export const SymptomsContext = createContext({

})

export function SymptomsProvider({ children }: {children: React.ReactNode}){
    const handSymptoms = []
    const legSymptoms = []
    const headSymptoms = []
    const chestSymptoms = []
    const stomackSymptoms = []
    return(
        <SymptomsContext.Provider value={{}}>
            { children }
        </SymptomsContext.Provider>
    )
}