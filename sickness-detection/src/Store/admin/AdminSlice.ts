import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface adminSliceType {
    selectedDoctor: any,
    selectedPatient: null,
    drawerOpen: boolean,
    selectedState: string,
    MainPageData: any,
    manageDoctorsData: any,
    manageUsersData: any
}

const initialState: adminSliceType = {
    selectedDoctor: null,
    selectedPatient: null,
    selectedState: "",
    drawerOpen: false,
    MainPageData: null,
    manageDoctorsData: null,
    manageUsersData: null
}

const adminSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setSelectedDoctor: (state, action: PayloadAction<any>) => {
            state.selectedDoctor = action.payload
        },
        openDrawer: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload
        },
        selectState: (state, action: PayloadAction<string>) => {
            state.selectedState = action.payload
        },
        selectPatient: (state, action: PayloadAction<any>) =>{
            state.selectedPatient = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDashboardMainData.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200){
                state.MainPageData = action.payload
            }
        })
        .addCase(acceptDoctor.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200) {
                state.MainPageData.body.pendingDoctors = state.MainPageData.body.pendingDoctors.filter(
                  (doctor: any) => doctor._id !== state.selectedDoctor
                );
                state.drawerOpen = false
                state.selectedDoctor = null
            }
        })
        .addCase(changeDoctorState.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200) {
                state.drawerOpen = false
                state.selectedDoctor = null
                state.selectedState = ""
            }
        })
        .addCase(getDoctors.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200){
                state.manageDoctorsData = action.payload
            }
        })
        .addCase(getPatients.fulfilled, (state, action: PayloadAction<any>)=>{
            if(action.payload.status === 200){
                state.manageUsersData = action.payload
            }
        })
    }
})

export const fetchDashboardMainData = createAsyncThunk(
    "admin/AdmindashboardMain",
    async() => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/admin/main`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const fetchDoctorImages = createAsyncThunk(
    "admin/fetchDoctorImages",
    async(_, { getState }) => {
        try{
            const state: RootState = getState() as RootState
            const { selectedDoctor } = state.Admin
            console.log(selectedDoctor)
            const response = await fetch(`${next_backend_route}/user/doctor/get_doctor_images?doctorID=${selectedDoctor}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const acceptDoctor = createAsyncThunk(
    "admin/acceptDoctor",
    async(_, { getState }) => {
        try{
            const state: RootState = getState() as RootState
            const { selectedDoctor } = state.Admin
            console.log(selectedDoctor)
            const response = await fetch(`${next_backend_route}/user/doctor/accept_doctor?doctorID=${selectedDoctor}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const changeDoctorState = createAsyncThunk(
    "admin/changeDoctorState",
    async(_, { getState }) => {
        try{
            const state: RootState = getState() as RootState
            const { selectedDoctor, selectedState } = state.Admin

            const response = await fetch(`${next_backend_route}/user/doctor/change_doctor_state`, {
                method: 'POST',
                body: JSON.stringify({doctorID: selectedDoctor, state: selectedState})
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const getDoctors = createAsyncThunk(
    "admin/getDoctors",
    async() => {
        try{
            const response = await fetch(`${next_backend_route}/user/doctor/get_all_doctors`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const getPatients = createAsyncThunk(
    "admin/getPatients",
    async() => {
        try{
            const response = await fetch(`${next_backend_route}/user/patient/get_all_patients`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)
export const changePatientState = createAsyncThunk(
    "admin/changePatientState",
    async(_, { getState }) => {
        try{
            const state: RootState = getState() as RootState
            const { selectedPatient, selectedState } = state.Admin

            const response = await fetch(`${next_backend_route}/user/patient/change_patient_state`, {
                method: 'POST',
                body: JSON.stringify({patientID: selectedPatient, state: selectedState})
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const { setSelectedDoctor, openDrawer, selectState, selectPatient } = adminSlice.actions

export default adminSlice.reducer