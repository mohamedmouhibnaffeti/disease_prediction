import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface doctorSliceType {
    doctors: Array<any>,
    updatedDoctors: Array<any>
}

const initialState: doctorSliceType = {
    doctors: [],
    updatedDoctors: []
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

export const { updateDoctorsArray } = doctorSlice.actions

export default doctorSlice.reducer