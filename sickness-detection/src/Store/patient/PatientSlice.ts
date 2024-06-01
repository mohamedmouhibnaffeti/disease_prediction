import { sendAuthenticatedRequest } from "@/lib/functions/auth";
import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PatientSliceType {
    PatientHistoryItemOpen: boolean,
    PatientHistoryItem: any,
    mainData: any,
    historyData: any
}

const initialState: PatientSliceType = {
    PatientHistoryItemOpen: false,
    PatientHistoryItem: null,
    mainData: null,
    historyData: null
}

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setPatientHistoryItemOpen: (state, action: PayloadAction<boolean>) => {
            state.PatientHistoryItemOpen = action.payload
        },
        setPatientHistoryItem: (state, action: PayloadAction<any>) => {
            state.PatientHistoryItem = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPatientHistoryData.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200){
                state.historyData = action.payload
            }
        })
        .addCase(PatientDashMainPageData.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200){
                state.mainData = action.payload
            }
        })
    }
})

export const PatientDashMainPageData = createAsyncThunk(
    "patient/dashMain",
    async({patientID}: {patientID: string}) => {
        try{
            const response = await sendAuthenticatedRequest(`/dashboard/patient/main?patientID=${patientID}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 } 
            }else{
                return { error: "Error fetching", status: 500 }
            }
        }catch(err){
            return { error: err, status: 500 }
        }
    }
)

export const updatePatient = createAsyncThunk(
    "patient/updatePatient",
    async({patientID, name, lastname, phone, age, gender}: {patientID: any, name: string, lastname: string, phone: string, age: number, gender: string}) => {
        try{
            const response = await sendAuthenticatedRequest(`/user/patient/update_patient`, {
                method: 'PUT',
                body: JSON.stringify({
                    patientID: patientID,
                    name: name,
                    lastname: lastname,
                    phone: phone,
                    age: age,
                    gender: gender
                })
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data.patient))
                return { ...data, status: 204 }
            }else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const fetchPatientHistoryData = createAsyncThunk(
    "patient/PatientDashboardStatistics",
    async({patientID}: {patientID: any}) => {
        try{
            const response = await sendAuthenticatedRequest(`/dashboard/patient/history?patiendID=${patientID}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }else{
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const { setPatientHistoryItemOpen, setPatientHistoryItem } = patientSlice.actions

export default patientSlice.reducer