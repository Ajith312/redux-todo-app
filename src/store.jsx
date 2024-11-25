import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './Redux/Slice/TodoSlice.jsx'



const store = configureStore({
    reducer:{
        todoState:todoReducer
    }
})

export default store