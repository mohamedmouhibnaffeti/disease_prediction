import { createContext, useState } from "react";

type SymptomsCheckerContextType = {
    ListItems: any,
    setListItems: React.Dispatch<React.SetStateAction<any>>,
    getEtatByName: any,
    changeEtatByName: any,
}

export const SymptomsCheckerContext = createContext<SymptomsCheckerContextType>({
    ListItems: [
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors', etat: false },
    ],
    setListItems: () => {},
    getEtatByName: () => {},
    changeEtatByName: () => {},
})

export const SymptomsCheckerProvider = ({ children }: {children: React.ReactNode}) => {
    const [ListItems, setListItems] = useState<any>([
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors', etat: false },
    ])

    const getEtatByName = (name: string) => {
        const item = ListItems.find((item: any) => item.nom === name);
        return item ? item.etat : null;
    };

    const changeEtatByName = (name: string) => {
        setListItems((prevState: any) =>
            prevState.map((item: any) =>
                ({ ...item, etat: item.nom === name })
            )
        );
    };
    
    return (
        <SymptomsCheckerContext.Provider value={{
            ListItems, 
            setListItems,
            getEtatByName,
            changeEtatByName
            }}> 
            { children }
        </SymptomsCheckerContext.Provider>
    )
}