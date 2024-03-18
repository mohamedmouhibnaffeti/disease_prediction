import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"
import humanReducer from "./HumanModel/HumanModelSlice"
import insertSymptomsReducer from "./InsertSymptoms/InsertSymptomsSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        humanModel: humanReducer,
        insertSymptoms: insertSymptomsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch