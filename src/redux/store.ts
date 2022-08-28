import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './filterSlice'
import cartSlice from './cartSlice'
import pizza from './pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizza
  }
})

export type RootState = ReturnType<typeof store.getState> 

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>()