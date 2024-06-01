import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sendAuthenticatedRequest } from "@/lib/functions/auth";

interface adminSliceType {
    selectedDoctor: any,
    selectedPatient: null,
    drawerOpen: boolean,
    selectedState: string,
    MainPageData: any,
    manageDoctorsData: any,
    manageUsersData: any,
    actionsData: any
}

const initialState: adminSliceType = {
    selectedDoctor: null,
    selectedPatient: null,
    selectedState: "",
    drawerOpen: false,
    MainPageData: null,
    manageDoctorsData: null,
    manageUsersData: null,
    actionsData: null
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
        .addCase(fetchActions.fulfilled, (state, action: PayloadAction<any>)=>{
            if(action.payload.status === 200){
                state.actionsData = action.payload
            }
        })
    }
})

export const fetchDashboardMainData = createAsyncThunk(
    "admin/AdmindashboardMain",
    async() => {
        try{
            const response = await sendAuthenticatedRequest(`/dashboard/admin/main`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const response = await sendAuthenticatedRequest(`/user/doctor/get_doctor_images?doctorID=${selectedDoctor}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const admin = localStorage.getItem("user") || ""
            const parsedAdmin = JSON.parse(admin)
            const response = await sendAuthenticatedRequest(`/user/doctor/accept_doctor?doctorID=${selectedDoctor}&adminID=${parsedAdmin._id}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const admin = localStorage.getItem("user") || ""
            const parsedAdmin = JSON.parse(admin)
            const response = await sendAuthenticatedRequest(`/user/doctor/change_doctor_state`, {
                method: 'POST',
                body: JSON.stringify({adminID: parsedAdmin._id, doctorID: selectedDoctor, state: selectedState})
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const response = await sendAuthenticatedRequest(`/user/doctor/get_all_doctors`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const response = await sendAuthenticatedRequest(`/user/patient/get_all_patients`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
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
            const admin = localStorage.getItem("user") || ""
            const parsedAdmin = JSON.parse(admin)
            const { selectedPatient, selectedState } = state.Admin
            const response = await sendAuthenticatedRequest(`/user/patient/change_patient_state`, {
                method: 'POST',
                body: JSON.stringify({adminID: parsedAdmin._id, patientID: selectedPatient, state: selectedState})
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const updateAdmin = createAsyncThunk(
    "admin/updateAdmin",
    async({adminID, name, lastname, phone}: {adminID: any, name: string, lastname: string, phone: string}) => {
        try{
            const response = await sendAuthenticatedRequest(`/user/admin/update_user`, {
                method: 'PUT',
                body: JSON.stringify({
                    adminID: adminID,
                    name: name,
                    lastname: lastname,
                    phone: phone
                })
            })
            if(response.ok){
                const data = await response.json()
                localStorage.setItem("user", JSON.stringify(data.admin))
                return { ...data, status: 204 }
            }else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }else{
                return { status: 500 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const fetchActions = createAsyncThunk(
    "admin/fetchActions",
    async(_, { getState }) => {
        try{
            const state: RootState = getState() as RootState
            const { selectedDoctor } = state.Admin
            console.log(selectedDoctor)
            const response = await sendAuthenticatedRequest(`/dashboard/admin/history`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
            else{
                const data = await response.json()
                return { ...data, status: 500 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)


export const { setSelectedDoctor, openDrawer, selectState, selectPatient } = adminSlice.actions

export default adminSlice.reducer