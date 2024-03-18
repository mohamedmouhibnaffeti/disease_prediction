import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type listItemType = {
    nom: string, 
    etat: boolean
}

interface SymptomsStateType {
    listItems: Array<listItemType>,
    currentItem: string
}

const initialState: SymptomsStateType = {
    listItems: [
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors', etat: false }
    ],
    currentItem: 'informations'
}

const InsertSymptomsSlice = createSlice({
    name: "insertSymptoms",
    initialState,
    reducers: {
        changeEtatByNom: (state, action: PayloadAction<string>) => {
            state.listItems = [...state.listItems].map((item: any)=>{
                if(item.nom === action.payload){
                    state.currentItem = item.nom
                }
                return(
                {...item, etat: item.nom === action.payload}
            )
        })
        }
    }
})

export const { changeEtatByNom } = InsertSymptomsSlice.actions

export default InsertSymptomsSlice.reducer