import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import PredictReducer from "./Predict/PredictSlice"
import { useMessagingServer, useCSVStates } from "./insertFile/insertFileSlice"


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        Predict: PredictReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch