import { Symptom } from "@/app/interfaces/interfaces";
import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type listItemType = {
    nom: string, 
    etat: boolean
}

interface PredictType {
    listItems: Array<listItemType>,
    currentItem: string,
    Symptoms: Array<Symptom>,
    SelectedSymptoms: Array<string>,
    PredictionResult: Array<any>,
    predicting: boolean,
    sex: string,
    age: number
}

const initialState: PredictType = {
    listItems: [
        { nom: 'informations', etat: true },
        { nom: 'Symptoms', etat: false },
        { nom: 'Conditions', etat: false },
        { nom: 'result', etat: false },
        { nom: 'recommendations', etat: false },
        { nom: 'doctors', etat: false }
    ],
    currentItem: 'informations',
    Symptoms: [],
    SelectedSymptoms: [],
    PredictionResult: [],
    predicting: true,
    sex: "",
    age: NaN
}

const PredictSlice = createSlice({
    name: "Predict",
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
        },
        selectSymptoms: (state, action: PayloadAction<{etat: any, symptom: string}>) => {
            if(action.payload.etat){
                state.SelectedSymptoms.push(action.payload.symptom)
            }else{
                const updatedSymptoms = state.SelectedSymptoms.filter((i)=> i !== action.payload.symptom)
                state.SelectedSymptoms = updatedSymptoms
                
            }
        },
        resetSymptomsArray: (state) => {
            state.Symptoms = []
        },
        setPredictionResult: (state, action: PayloadAction<Array<any>>)=>{
            console.log(action.payload)
            const Predictions: Array<any> = []
            action.payload.map((prediction: any, index: number)=>{
                if(index < 4){
                    Predictions.push(prediction)
                }
            })
            state.PredictionResult = Predictions
        },
        setPredictingState: (state, action: PayloadAction<boolean> )=>{
            console.log(action.payload)
            state.predicting = action.payload
        },
        selectAge: (state, action: PayloadAction<number>) => {
            console.log(action.payload)
            state.age = action.payload
        },
        selectSex: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.sex = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSymptoms.fulfilled, (state, action: PayloadAction<Array<Symptom>>)=>{
            console.log('fetched...')
            state.Symptoms = action.payload
        })
        .addCase(fetchSymptomsByFilter.fulfilled, (state, action: PayloadAction<Array<Symptom>>)=>{
            console.log('fetched...')
            state.Symptoms = action.payload
        })
    },
})

export const fetchSymptoms = createAsyncThunk(
    "Predict/fetchSymptoms",
    async () => {
        try {
            const resp = await fetch(`${next_backend_route}/Symptom/sicknesses_symptoms`);
            console.log(resp)
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

export const fetchSymptomsByFilter = createAsyncThunk(
    // when searching for jaw get this also : Temporomandibular Joint (TMJ)
    "Predict/fetchSymptomsByBodyPart",
    async({filter, gender}: {filter: string, gender: string}) => {
        try{
            const response = await fetch(`${next_backend_route}/Symptom/SymptomsByBodyPart?filter=${filter}&gender=${gender}`)
            if(response.ok){
                const data = await response.json()
                return data.Symptoms
            }else{
                throw new Error('Failed to fetch symptoms')
            }
        }catch(err){
            console.error('Error fetching symptoms: ', err)
            throw err
        }
    }
)


export const { changeEtatByNom, selectSymptoms, setPredictionResult, setPredictingState, selectAge, selectSex, resetSymptomsArray } = PredictSlice.actions

export default PredictSlice.reducer