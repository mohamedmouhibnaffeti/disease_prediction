import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface doctorSliceType {
    doctors: Array<any>,
    updatedDoctors: Array<any>,
    requestLoading: boolean,
    AcceptAppointmentState: boolean
}

const initialState: doctorSliceType = {
    doctors: [],
    updatedDoctors: [],
    requestLoading: false,
    AcceptAppointmentState: false
}

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        updateDoctorsArray : (state, action:PayloadAction<Array<any>>) => {
            const sortedArray = action.payload.sort((a, b) => {
                if (isNaN(a.distance) && isNaN(b.distance)) {
                    return 0
                } else if (isNaN(a.distance)) {
                    return 1
                } else if (isNaN(b.distance)) {
                    return -1
                } else {
                    return a.distance - b.distance
                }
            });
            state.updatedDoctors = [...sortedArray]
        },
        setRequestLoading: (state, action: PayloadAction<boolean>) => {
            state.requestLoading = action.payload
        },
        setAcceptAppointmentOpen : (state, action: PayloadAction<boolean>) => {
            state.AcceptAppointmentState = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDoctorsBySpeciality.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload.status === 200){
                state.doctors = action.payload.doctors
            }
        })
    }
})

export const fetchDoctorsBySpeciality = createAsyncThunk(
    "doctor/fetchdoctorsbyspeciality",
    async({speciality}: { speciality: string }) => {
        try{
            const response = await fetch(`${next_backend_route}/user/doctor/get_doctor_by_speciality?speciality=${speciality}`)
            if(response.ok){
                const data = await response.json()
                return {...data, status: 200}
            }
        }catch(err){
            return { error: err, status: 500 }
        }
    }
)

export const requestAppointment = createAsyncThunk(
    "doctor/requestAppointment",
    async({ doctorID, patientID }: { doctorID: string, patientID: string }) => {
        try{
            const response = await fetch(`${next_backend_route}/Appointments/request_appointment`, {
                method: "POST",
                body: JSON.stringify({
                    doctorID: doctorID,
                    patientID: patientID
                })
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 201 } 
            }else{
                return { error: "Error fetching", status: 500 }
            }
        }catch(err){
            return { error: err, status: 500 }
        }
    }
)

export const acceptAppointment = createAsyncThunk(
    "doctor/acceptAppointment",
    async({ AppointmentID, from, to }: { AppointmentID: any, from: Date | undefined, to: Date | undefined }) => {
        try{
            const response = await fetch(`${next_backend_route}/Appointments/accepted_appointment`, {
                method: 'POST',
                body: JSON.stringify({
                    appointmentID: AppointmentID,
                    from: from,
                    to: to
                })
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 201 } 
            }
            else if(response.status === 404 || response.status === 400 || response.status === 409){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { error: err, status: 500 }
        }
    }
)

export const RefuseAppointment = createAsyncThunk(
    "doctor/acceptAppointment",
    async({ AppointmentID }: { AppointmentID: any }) => {
        try{
            const response = await fetch(`${next_backend_route}/Appointments/refused_appointment?AppointmentID=${AppointmentID}`, {
                method: 'DELETE'
            })
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 204 } 
            }
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { error: err, status: 500 }
        }
    }
)

//dashboard apis

export const fetchDashboardMainData = createAsyncThunk(
    "doctor/dashboardMain",
    async({doctorID}: {doctorID: any}) => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/doctor/main?doctorID=${doctorID}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const fetchStatisticsData = createAsyncThunk(
    "doctor/dashboardStatistics",
    async({doctorID}: {doctorID: any}) => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/doctor/statistics?doctorID=${doctorID}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const fetchAppointmentsData = createAsyncThunk(
    "doctor/dashboardStatistics",
    async({doctorID}: {doctorID: any}) => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/doctor/my_appointments?doctorID=${doctorID}`)
            if(response.ok){
                const data = await response.json()
                return { ...data, status: 200 }
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const { updateDoctorsArray, setRequestLoading, setAcceptAppointmentOpen } = doctorSlice.actions

export default doctorSlice.reducer