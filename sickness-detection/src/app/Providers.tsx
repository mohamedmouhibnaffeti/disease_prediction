"use client"
import { SymptomsProvider } from "@/components/HumanModel/SymptomsContext"
import { SymptomsCheckerProvider } from "./symptoms-checker/SymptomsCheckerContext"
import { Provider } from "react-redux"
import { store } from "@/Store/store"

export function Providers ({ children }: {children: React.ReactNode}){
    return(
        <Provider store={store}>
            <SymptomsCheckerProvider>
                <SymptomsProvider>
                    {children}
                </SymptomsProvider>
            </SymptomsCheckerProvider>
        </Provider>
    )
}