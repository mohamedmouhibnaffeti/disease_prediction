import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface authSliceType {
    currentSignUpPage: string,
    currentDoctorSignupPage: number
}

const initialState: authSliceType = {
    currentSignUpPage: "role",
    currentDoctorSignupPage: 1
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setCurrentSignupPage: (state, action: PayloadAction<string>) => {
            state.currentSignUpPage = action.payload
        },
        setCurrentDoctorSignupPage: (state, action: PayloadAction<number>) => {
            state.currentDoctorSignupPage = action.payload
        }
    }
})

export const { setCurrentDoctorSignupPage, setCurrentSignupPage } = authSlice.actions

export default authSlice.reducer