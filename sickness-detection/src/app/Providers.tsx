"use client"
import { SymptomsProvider } from "@/components/HumanModel/SymptomsContext"
import { SymptomsCheckerProvider } from "./symptoms-checker/SymptomsCheckerContext"

export function Providers ({ children }: {children: React.ReactNode}){
    return(
        <SymptomsCheckerProvider>
            <SymptomsProvider>
                {children}
            </SymptomsProvider>
        </SymptomsCheckerProvider>
    )
}