import { LoginFormDataType, DoctorSignupformDataType, PatientSignupformDataType, PatientSignupErrorsType, DoctorSignupErrorsType, LoginErrorsType } from "@/app/interfaces/interfaces";
import { next_backend_route } from "@/lib/statics/ApiRoutes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { areAllStringsEmpty } from "@/lib/functions/objects";
import { isValidEmail } from "@/lib/functions/strings";

interface authSliceType {
    currentSignUpPage: string,
    currentDoctorSignupPage: number,
    SignupFormDataDoctor: DoctorSignupformDataType,
    PatientSignupFormData: PatientSignupformDataType,
    LoginFormData: LoginFormDataType,
}

const initialState: authSliceType = {
    currentSignUpPage: "role",
    currentDoctorSignupPage: 1,
    SignupFormDataDoctor: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", images: [] },
    PatientSignupFormData: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "" },
    LoginFormData: { email: "", password: "" },
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
            const newSignupFormDatastate = {...state.SignupFormDataDoctor}
            newSignupFormDatastate[action.payload.name] = action.payload.value
            state.SignupFormDataDoctor = newSignupFormDatastate
        },
        setPatientSignupFormData: (state, action: PayloadAction<{name: keyof PatientSignupformDataType, value: any}>) => {
            const newSignupFormDatastate = {...state.PatientSignupFormData}
            newSignupFormDatastate[action.payload.name] = action.payload.value
            state.PatientSignupFormData = newSignupFormDatastate
        },
        setLoginFormData: (state, action: PayloadAction<{name: keyof LoginFormDataType, value: any}>) => {
            const newLoginFormData = { ...state.LoginFormData }
            newLoginFormData[action.payload.name] = action.payload.value
            state.LoginFormData = newLoginFormData
        }
    },
    /*
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action: PayloadAction<any>) => {
            state.LoginResponse = action.payload
            if(action.payload?.user){
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                localStorage.setItem("token", action.payload.token)
                
            }
        })
    }
    */
})

export const Login = createAsyncThunk(
    "Auth/login",
    async(_, { getState })=>{
        const state: RootState = getState() as RootState
        const { LoginFormData } = state.Authentication
        const etat = areAllStringsEmpty(LoginFormData)
        if(!etat){
            const response = await fetch(`${next_backend_route}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(LoginFormData)
            })
            const data = await response.json()
            const dataWithResponse = {...data, status: response.status}
            return dataWithResponse
        }else{
            return {message: "Please check form data"}
        }
    }
)

export const DoctorSignup = createAsyncThunk(
    "Auth/DoctorSignup",
    async(_, { getState })=>{
        const state: RootState = getState() as RootState
        const { SignupFormDataDoctor } = state.Authentication
        const formData = new FormData()
        SignupFormDataDoctor.images.forEach((image: File, index: number) => {
            formData.append(`image${index}`, image)
        });
        Object.entries(SignupFormDataDoctor).forEach(([key, value]) => {
            if(typeof value === "string"){
                formData.append(key, value);
            }
        });
        
        const etat = areAllStringsEmpty(SignupFormDataDoctor)
        if(!etat){
            const response = await fetch(`${next_backend_route}/auth/signup/doctor`, {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            const dataWithResponse = {...data, status: response.status}
            return dataWithResponse
        }else{
            return {message: "Please check form data"}
        }
    }
)

export const PatientSignup = createAsyncThunk(
    "Auth/PatientSignup",
    async(_, { getState })=>{
        const state: RootState = getState() as RootState
        const { PatientSignupFormData } = state.Authentication
        
        const etat = areAllStringsEmpty(PatientSignupFormData)
        if(!etat){
            const response = await fetch(`${next_backend_route}/auth/signup/patient`, {
                method: 'POST',
                body: JSON.stringify(PatientSignupFormData)
            })
            const data = await response.json()
            const dataWithResponse = {...data, status: response.status}
            return dataWithResponse
        }else{
            return {message: "Please check form data"}
        }
    }
)

export const RegisterOTP = createAsyncThunk(
    "Auth/DoctorVerify",
    async(_, { getState }) => {
        const state: RootState = getState() as RootState
        const { SignupFormDataDoctor } = state.Authentication
        const {email} = SignupFormDataDoctor
        if(!isValidEmail(email)){
            return { message: "Please check email" }
        }
        const response = await fetch(`${next_backend_route}/auth/verify/Register`, {
            method: 'POST',
            body: JSON.stringify({ email: email })
        })
        const data = await response.json()
        const dataWithResponse = { ...data, status: response.status }
        return dataWithResponse
    }
)

export const { setCurrentDoctorSignupPage, setCurrentSignupPage, setSignupFormDataDoctor, setPatientSignupFormData, setLoginFormData } = authSlice.actions

export default authSlice.reducer