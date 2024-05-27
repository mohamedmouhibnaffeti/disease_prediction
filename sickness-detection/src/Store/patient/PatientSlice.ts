import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PatientSliceType {

}

const initialState: PatientSliceType = {
    
}

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {

    }
})

export const PatientDashMainPageData = createAsyncThunk(
    "patient/dashMain",
    async({patientID}: {patientID: string}) => {
        try{
            const response = await fetch(`${next_backend_route}/dashboard/patient/main?patientID=${patientID}`)
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

export const {} = patientSlice.actions

export default patientSlice.reducer