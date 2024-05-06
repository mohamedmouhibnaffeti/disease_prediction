import { LoginFormDataType, DoctorSignupformDataType, PatientSignupformDataType, PatientSignupErrorsType, DoctorSignupErrorsType, LoginErrorsType, ForgotPasswordDataType } from "@/app/interfaces/interfaces";
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
    ForgotPasswordData: ForgotPasswordDataType
}

const initialState: authSliceType = {
    currentSignUpPage: "role",
    currentDoctorSignupPage: 2,
    SignupFormDataDoctor: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", images: [], otp: "", location: [35.632401, 10.8959568], speciality: "" },
    PatientSignupFormData: { name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "" },
    LoginFormData: { email: "", password: "" },
    ForgotPasswordData: { email: "", passwwd: "", confirmPasswd: "", otp: "" }
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
        },
        setForgotPasswordData: (state, action: PayloadAction<{ name: keyof ForgotPasswordDataType, value: string }> )=>{
            const newForgotPasswordData = { ...state.ForgotPasswordData }
            newForgotPasswordData[action.payload.name] = action.payload.value
            state.ForgotPasswordData = newForgotPasswordData
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

        if(!isValidEmail(SignupFormDataDoctor.email)){
            return ({message: "Invalid email."})
        }
        if(SignupFormDataDoctor.name.length < 5){
            return ({message: "Name should be of 5 caracters long minimum."})
        }
        if(SignupFormDataDoctor.lastname.length < 5){
            return ({message: "Lastname should be of 5 caracters long minimum."})
        }
        if(SignupFormDataDoctor.password.length < 5){
            return ({message: "Password should be of 5 caracters long minimum."})
        }
        if(SignupFormDataDoctor.password !== SignupFormDataDoctor.confirmPassword){
            return ({message: "Name should be of 5 caracters long minimum."})
        }
        if(SignupFormDataDoctor.phone.length < 9){
            return ({message: "Phone number should be of 9 caracters long minimum."})
        }
        

        const formData = new FormData()
        SignupFormDataDoctor.images.forEach((image: File, index: number) => {
            formData.append(`image${index}`, image)
        });
        Object.entries(SignupFormDataDoctor).forEach(([key, value]) => {
            if(typeof value === "string"){
                formData.append(key, value);
            }if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
                formData.append(key, JSON.stringify(value));
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

        if(!isValidEmail(PatientSignupFormData.email)){
            return ({message: "Invalid email."})
        }
        if(PatientSignupFormData.name.length < 5){
            return ({message: "Name should be of 5 caracters long minimum."})
        }
        if(PatientSignupFormData.lastname.length < 5){
            return ({message: "Lastname should be of 5 caracters long minimum."})
        }
        if(PatientSignupFormData.password.length < 5){
            return ({message: "Password should be of 5 caracters long minimum."})
        }
        if(PatientSignupFormData.password !== PatientSignupFormData.confirmPassword){
            return ({message: "Name should be of 5 caracters long minimum."})
        }
        if(PatientSignupFormData.phone.length < 9){
            return ({message: "Phone number should be of 9 caracters long minimum."})
        }
        
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


export const ForgotPasswordOTP = createAsyncThunk(
    "Auth/ForgotPasswordOTP",
    async(_, { getState }) => {
        const state: RootState = getState() as RootState
        const { ForgotPasswordData } = state.Authentication
        if(!isValidEmail(ForgotPasswordData.email)){
            return({ message: "Invalid email" })
        }
        const response = await fetch(`${next_backend_route}/auth/verify/ForgotPasswd`, {
            method: 'POST',
            body: JSON.stringify({ email: ForgotPasswordData.email })
        })
        const data = await response.json()
        const dataWithStatusCode = { ...data, status: response.status }
        return dataWithStatusCode
    }
)

export const VerifyOTPForForgotPasswd = createAsyncThunk(
    "Auth/CheckOTP",
    async(_, { getState }) => {
        const state: RootState = getState() as RootState
        const { ForgotPasswordData } = state.Authentication
        if(!isValidEmail(ForgotPasswordData.email)){
            return({ message: "Invalid email, please go back to the previous page to insert your email..." })
        }
        if(ForgotPasswordData.otp.length < 6){
            return({ message: "Verification code must be of 6 caracters long. " })
        }
        const response = await fetch(`${next_backend_route}/auth/verify/verifyOTP`, {
            method: 'POST',
            body: JSON.stringify({ email: ForgotPasswordData.email ,otp: ForgotPasswordData.otp })
        })
        const data = await response.json()
        const responsewithstatus = { ...data, status: response.status }
        return responsewithstatus
    }
)

export const updatePasswd = createAsyncThunk(
    "Auth/updatePasswd",
    async(_, { getState }) => {
        const state: RootState = getState() as RootState
        const { ForgotPasswordData } = state.Authentication
        if(!isValidEmail(ForgotPasswordData.email)){
            return({ message: "Invalid email, please go back to the previous page to insert your email..." })
        }
        if(ForgotPasswordData.otp.length !== 6){
            return({ message: "Verification code must be of 6 caracters long, please go back to the previous page to set it." })
        }
        if(ForgotPasswordData.passwwd.length < 6){
            return({ message: "Password should be of 6 caracters long minimum." })
        }
        if(ForgotPasswordData.confirmPasswd !== ForgotPasswordData.passwwd){
            return({ message: "Password and confirm password should be identical." })
        }
        const response = await fetch(`${next_backend_route}/user/update_password`, {
            method: 'PUT',
            body: JSON.stringify({
                password: ForgotPasswordData.passwwd,
                confirmPassword: ForgotPasswordData.confirmPasswd,
                otp: ForgotPasswordData.otp,
                email: ForgotPasswordData.email
            })
        })
        const data = await response.json()
        const responsewithstatus = {...data, status: response.status}
        return responsewithstatus
    }
)

export const { setCurrentDoctorSignupPage, setCurrentSignupPage, setSignupFormDataDoctor, setPatientSignupFormData, setLoginFormData, setForgotPasswordData } = authSlice.actions

export default authSlice.reducer