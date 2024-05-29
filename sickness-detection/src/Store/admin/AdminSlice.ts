import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface adminSliceType {
    selectedDoctor: any,
    drawerOpen: boolean
    MainPageData: any
}

const initialState: adminSliceType = {
    selectedDoctor: null,
    drawerOpen: false,
    MainPageData: null
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

export const { setSelectedDoctor, openDrawer } = adminSlice.actions

export default adminSlice.reducer