import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './filterSlice'
import cartSlice from './cartSlice'
import pizza from './pizzaSlice'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizza
  }
})

