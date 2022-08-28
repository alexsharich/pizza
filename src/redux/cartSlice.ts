import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCartFromLocalStorage } from "../utils/getCartFromLocalStorage"
import { RootState } from "./store"
import {calcTotalPrice} from '../utils/calcTotalPrice'

interface CartSliceState {
  totalPrice: number
  items:CartItem[]
}

export type CartItem = {
  id:string
  title:string
  price:number
  imageUrl: string
  type:string
  size:number 
  count :number
}

const {items,totalPrice} = getCartFromLocalStorage()

const initialState : CartSliceState = {
  totalPrice,
  items
}

  const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
   
   addItem:(state,action: PayloadAction<CartItem>)=>{
    const findItem = state.items.find(obj =>obj.id === action.payload.id)
    if(findItem){
      findItem.count++
    } else {
      state.items.push({
        ...action.payload,
        count:1
      })
    }
    state.totalPrice = calcTotalPrice(state.items)
    
   },
   
   minusItem:(state,action: PayloadAction<string>)=>{
    const findItem = state.items.find(obj =>obj.id === action.payload)
    if (findItem){
      findItem.count--
    }
   },
   removeItem:(state,action: PayloadAction<string>)=>{
    state.items = state.items.filter(obj=>obj.id !== action.payload)
   },
   clearItems:(state)=>{
    state.items = []
    state.totalPrice = 0
   }
  }
})

export const selectCart = (state: RootState)=>state.cartSlice
export const selectCartItemById = (id: string) => (state: RootState)=>state.cartSlice.items.find((obj) => obj.id === id)

export const {addItem,removeItem,minusItem,clearItems} =  cartSlice.actions
export default cartSlice.reducer
