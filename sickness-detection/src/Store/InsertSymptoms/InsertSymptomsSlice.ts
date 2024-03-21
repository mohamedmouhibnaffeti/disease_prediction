import { Symptom } from "@/app/interfaces/interfaces";
import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type listItemType = {
    nom: string, 
    etat: boolean
}

interface SymptomsStateType {
    listItems: Array<listItemType>,
    currentItem: string,
    Symptoms: Array<Symptom>
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
    currentItem: 'informations',
    Symptoms: []
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSymptoms.fulfilled, (state, action: PayloadAction<Array<Symptom>>)=>{
            console.log('fetched...')
            state.Symptoms = action.payload
        })
    },
})

export const fetchSymptoms = createAsyncThunk(
    "insertSymptoms/fetchSymptoms",
    async () => {
        try {
            const resp = await fetch(`${next_backend_route}/symptom/sicknesses_symptoms`);
            
            if (resp.ok) {
                const data = await resp.json();
                return data.Symptoms
            } else {
                throw new Error('Failed to fetch symptoms')
            }
        } catch (error) {
            console.error('Error fetching symptoms:', error)
            throw error
        }
    }
)

export const { changeEtatByNom } = InsertSymptomsSlice.actions

export default InsertSymptomsSlice.reducer