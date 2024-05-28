import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface adminSliceType {
    selectedImage: any
}

const initialState: adminSliceType = {
    selectedImage: null
}

const adminSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        
    }
})

export const { } = adminSlice.actions

export default adminSlice.reducer