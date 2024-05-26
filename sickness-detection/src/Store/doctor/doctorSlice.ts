import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface doctorSliceType {
    doctors: Array<any>,
    updatedDoctors: Array<any>,
    requestLoading: boolean,
    AcceptAppointmentState: boolean,
    postponeAppointmentState: boolean,
    finishAppointmentState: boolean
}

const initialState: doctorSliceType = {
    doctors: [],
    updatedDoctors: [],
    requestLoading: false,
    AcceptAppointmentState: false,
    postponeAppointmentState: false,
    finishAppointmentState: false
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
        },
        setFinishAppointmentOpen : (state, action: PayloadAction<boolean>) => {
            state.finishAppointmentState = action.payload
        },
        setPostponeAppointmentOpen : (state, action: PayloadAction<boolean>) => {
            state.postponeAppointmentState = action.payload
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

export const postponeAppointment = createAsyncThunk(
    "doctor/postponeAppointment",
    async({ AppointmentID, from, to }: { AppointmentID: any, from: Date | undefined, to: Date | undefined }) => {
        try{
            const response = await fetch(`${next_backend_route}/Appointments/postpone_appointment`, {
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
    "doctor/refuseAppointment",
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

export const FinishAppointment = createAsyncThunk(
    "doctor/finishAppointment",
    async({ AppointmentID, prescription, observation }: { AppointmentID: any, prescription: string, observation: string }) => {
        try{
            const response = await fetch(`${next_backend_route}/Appointments/finished_appointment`, {
                method: 'POST',
                body: JSON.stringify({
                    AppointmentID: AppointmentID,
                    prescription: prescription,
                    observation: observation 
                })
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
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
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
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
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
            else if(response.status === 404 || response.status === 400){
                const data = await response.json()
                return { ...data, status: 400 } 
            }
        }catch(err){
            return { err, status: 500 }
        }
    }
)

export const updateDoctor = createAsyncThunk(
    "doctor/updateDoctor",
    async({doctorID, name, lastname, phone, location}: {doctorID: any, name: string, lastname: string, phone: string, location: [number, number]}) => {
        try{
            const response = await fetch(`${next_backend_route}/user/doctor/update_doctor`, {
                method: 'PUT',
                body: JSON.stringify({
                    doctorID: doctorID,
                    name: name,
                    lastname: lastname,
                    phone: phone,
                    location: location
                })
            })
            if(response.ok){
                const data = await response.json()
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data.doctor))
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

export const fetchHistoryData = createAsyncThunk(
    "doctor/dashboardStatistics",
    async({doctorID}: {doctorID: any}) => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/doctor/history?doctorID=${doctorID}`)
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
export const { updateDoctorsArray, setRequestLoading, setAcceptAppointmentOpen, setFinishAppointmentOpen, setPostponeAppointmentOpen } = doctorSlice.actions

export default doctorSlice.reducer