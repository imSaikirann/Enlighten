import { configureStore } from "@reduxjs/toolkit";
import catagoryReducer from '../store/categorySlice'
export const makeStore = ()=>{
    return configureStore({
        reducer:catagoryReducer
    })
}

export type AppStore = ReturnType <typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']