import { createContext, useState } from "react";

type SymptomsCheckerContextType = {
    ListItems: any,
    setListItems: React.Dispatch<React.SetStateAction<any>>,
}

export const SymptomsCheckerContext = createContext<SymptomsCheckerContextType>({
    ListItems: [
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors for you', etat: false },
    ],
    setListItems: () => {}
})

export const SymptomsCheckerProvider = ({ children }: {children: React.ReactNode}) => {
    const [ListItems, setListItems] = useState<any>([
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors for you', etat: false },
    ])
    return (
        <SymptomsCheckerContext.Provider value={{ListItems, setListItems}}> 
            { children }
        </SymptomsCheckerContext.Provider>
    )
}