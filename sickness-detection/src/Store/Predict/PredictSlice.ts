import { Symptom } from "@/app/interfaces/interfaces";
import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type listItemType = {
    nom: string, 
    etat: boolean
}

interface PredictType {
    listItems: Array<listItemType>,
    currentItem: string,
    Symptoms: Array<Symptom>,
    SelectedSymptoms: Array<string>,
    PredictionResult: string,
    predicting: boolean,
    sex: string,
    age: number,
    sicknessDetails: any,
    SicknessToPush: {age: number, sex: string, conditions: Array<any>, sickness: string, symptoms: Array<string>}
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
    PredictionResult: "",
    predicting: true,
    sex: "",
    age: NaN,
    sicknessDetails: {},
    SicknessToPush: {age: NaN, sex: "", conditions: [], sickness: "", symptoms: []}
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
                state.SicknessToPush.symptoms.push(action.payload.symptom)
            }else{
                const updatedSymptoms = state.SelectedSymptoms.filter((i)=> i !== action.payload.symptom)
                state.SelectedSymptoms = updatedSymptoms
                state.SicknessToPush.symptoms = updatedSymptoms
            }
        },
        resetSymptomsArray: (state) => {
            state.Symptoms = []
            state.SicknessToPush.symptoms = []
        },
        setPredictionResult: (state, action: PayloadAction<string>)=>{
            state.PredictionResult = action.payload
            state.SicknessToPush.sickness = action.payload
        },
        setPredictingState: (state, action: PayloadAction<boolean> )=>{
            state.predicting = action.payload
        },
        selectAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload
            state.SicknessToPush.age = action.payload
        },
        selectSex: (state, action: PayloadAction<string>) => {
            state.sex = action.payload
            state.SicknessToPush.sex = action.payload
        },
        addConditionsToSickness: (state, action: PayloadAction<Array<any>>) => {
            state.SicknessToPush.conditions = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSymptoms.fulfilled, (state, action: PayloadAction<Array<Symptom>>)=>{
            state.Symptoms = action.payload
        })
        .addCase(fetchSymptomsByFilter.fulfilled, (state, action: PayloadAction<Array<Symptom>>)=>{
            state.Symptoms = action.payload
        })
        .addCase(fetchSicknessForPredictedSickness.fulfilled, (state, action: PayloadAction<any>) => {
            state.sicknessDetails = action.payload
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

export const fetchSicknessForPredictedSickness = createAsyncThunk(
    "Predict/fetchSicknessDetails",
    async({sicknessName}: {sicknessName: string}) => {
        try{
            const response = await fetch(`${next_backend_route}/Sickness/get_sickness_details?sickness=${sicknessName}`)
            if(response.ok){
                const data = await response.json()
                return {...data, status: 200}
            }else{
                const data = await response.json()
                return {...data, status: 400}
            }
        }catch(err){
            return {error: err, status: 500}
        }
    }
)

export const CreatePredictedSickness = createAsyncThunk(
    "Predict/PushSickness",
    async(_, {getState}) => {
        try{
            const state: RootState = getState() as RootState
            const {SicknessToPush} = state.Predict 
            const response = await fetch(`${next_backend_route}/Sickness/add_new_sickness`, {
                method: 'POST',
                body: JSON.stringify(SicknessToPush)
            })    
            if(response.ok){
                const data = await response.json()
                return {...data, status: 200}
            }else{
                const data = await response.json()
                return {...data, status: 400}
            }
        }catch(err){
            return {error: err, status: 400}
        }
    }
)


export const { changeEtatByNom, selectSymptoms, setPredictionResult, setPredictingState, selectAge, selectSex, resetSymptomsArray, addConditionsToSickness } = PredictSlice.actions

export default PredictSlice.reducer