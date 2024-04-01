import { LoginFormDataType, DoctorSignupformDataType, PatientSignupformDataType, PatientSignupErrorsType, DoctorSignupErrorsType, LoginErrorsType } from "@/app/interfaces/interfaces";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface authSliceType {
    currentSignUpPage: string,
    currentDoctorSignupPage: number,
    SignupFormDataDoctor: DoctorSignupformDataType,
    PatientSignupFormData: PatientSignupformDataType,
    LoginFormData: LoginFormDataType,
    PatientSignupErrors: PatientSignupErrorsType,
    DoctorSignupErrors: DoctorSignupErrorsType,
    LoginErrors: LoginErrorsType
}

const initialState: authSliceType = {
    currentSignUpPage: "role",
    currentDoctorSignupPage: 1,
    SignupFormDataDoctor: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", images: [] },
    PatientSignupFormData: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "" },
    LoginFormData: { email: "", password: "" },
    PatientSignupErrors: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "" },
    DoctorSignupErrors: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", images: "" },
    LoginErrors: { email: "", password: "" }
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
        setSignupFormDataDoctor: (state, action: PayloadAction<{name: keyof DoctorSignupformDataType, value: any}>) => {
            const newErrorMessages = { ...state.DoctorSignupErrors }
            newErrorMessages[action.payload.name] = ""
            state.DoctorSignupErrors = newErrorMessages
            const newSignupFormDatastate = {...state.SignupFormDataDoctor}
            newSignupFormDatastate[action.payload.name] = action.payload.value
            state.SignupFormDataDoctor = newSignupFormDatastate
        },
        setPatientSignupFormData: (state, action: PayloadAction<{name: keyof PatientSignupformDataType, value: any}>) => {
            const newErrorMessages = { ...state.PatientSignupErrors }
            newErrorMessages[action.payload.name] = ""
            state.PatientSignupErrors = newErrorMessages
            const newSignupFormDatastate = {...state.PatientSignupFormData}
            newSignupFormDatastate[action.payload.name] = action.payload.value
            state.PatientSignupFormData = newSignupFormDatastate
        },
        setLoginFormData: (state, action: PayloadAction<{name: keyof LoginFormDataType, value: any}>) => {
            const newErrorMessages = { ...state.LoginErrors }
            newErrorMessages[action.payload.name] = ""
            state.LoginErrors = newErrorMessages
            const newLoginFormData = { ...state.LoginFormData }
            newLoginFormData[action.payload.name] = action.payload.value
            state.LoginFormData = newLoginFormData
        },
        handleLoginSendRequest: (state) => {
            console.log("state: ", JSON.stringify(state.PatientSignupFormData))
        }
    }
})

export const { setCurrentDoctorSignupPage, setCurrentSignupPage, setSignupFormDataDoctor, setPatientSignupFormData, setLoginFormData, handleLoginSendRequest } = authSlice.actions

export default authSlice.reducer