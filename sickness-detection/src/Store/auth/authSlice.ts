import { SignupformDataType } from "@/app/interfaces/interfaces";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface authSliceType {
    currentSignUpPage: string,
    currentDoctorSignupPage: number,
    SignupFormData: SignupformDataType
}

const initialState: authSliceType = {
    currentSignUpPage: "role",
    currentDoctorSignupPage: 1,
    SignupFormData: { name: "", lastname: "", email: "", password: "", confirmPassword: "", images: [] }
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
        },
        setSignupFormData: (state, action: PayloadAction<{name: keyof SignupformDataType, value: any}>) => {
            const newSignupFormDatastate = {...state.SignupFormData}
            newSignupFormDatastate[action.payload.name] = action.payload.value
            state.SignupFormData = newSignupFormDatastate
        }
    }
})

export const { setCurrentDoctorSignupPage, setCurrentSignupPage, setSignupFormData } = authSlice.actions

export default authSlice.reducer