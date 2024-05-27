import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import PredictReducer from "./Predict/PredictSlice"
import authReducer from "./auth/authSlice"
import doctorReducer from "./doctor/doctorSlice"
import patientReducer from "./patient/PatientSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        Predict: PredictReducer,
        Authentication: authReducer,
        Doctor: doctorReducer,
        Patient: patientReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch