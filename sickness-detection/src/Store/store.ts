import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import PredictReducer from "./Predict/PredictSlice"
import authReducer from "./auth/authSlice"
import doctorReducer from "./doctor/doctorSlice"
import patientReducer from "./patient/PatientSlice"
import adminReducer from "./admin/AdminSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        Predict: PredictReducer,
        Authentication: authReducer,
        Doctor: doctorReducer,
        Patient: patientReducer,
        Admin: adminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch