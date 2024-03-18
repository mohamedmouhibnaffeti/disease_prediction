import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        incrementByValue: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>)=> {
            state.value += action.payload
        })
        .addCase(incrementAsync.pending, (state) => {
            console.log("increment pending...")
        })
        .addCase(decrementAsync.fulfilled, (state, action: PayloadAction<number>) =>{
            state.value += action.payload
        })
        .addCase(decrementAsync.pending, (state) =>{
            console.log("decrement pending...")
        })
        .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>)=>{
            console.log(action.payload)
        })
        .addCase(fetchData.pending, ()=>{
            console.log('pending...')
        })
        .addCase(fetchData.rejected, ()=>{
            console.log("failed")
        })
    },
})

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async(amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return amount
    }
)

export const decrementAsync = createAsyncThunk(
    "counter/decrementAsync",
    async(amount: number) => {
        await new Promise((resolve)=>setTimeout(resolve, 5000))
        return amount
    }
)

export const fetchData = createAsyncThunk(
    "counter/fetchBooks",
    async() => {
        const data = await fetch('https://api.publicapis.org/entries')
        if(data){
            const resp = await data.json()
            return resp
        }
    }
)

export const { increment, incrementByValue } = counterSlice.actions

export default counterSlice.reducer