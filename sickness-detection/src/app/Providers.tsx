"use client"
import { SymptomsProvider } from "@/components/HumanModel/SymptomsContext"
import { Provider } from "react-redux"
import { store } from "@/Store/store"

export function Providers ({ children }: {children: React.ReactNode}){
    return(
        <Provider store={store}>
                <SymptomsProvider>
                    {children}
                </SymptomsProvider>
        </Provider>
    )
}