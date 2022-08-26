import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem } from './cartSlice'
import { SortType } from './filterSlice'
import { RootState } from './store'

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type SearchPizzaParamsType = {
      order:string
      sortBy:string
      category:string
      search:string
      currentPage:string
}

export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParamsType>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      order,
      sortBy,
      category,
      search,
      currentPage
    } = params
    const {data} = await axios.get(
      `https://62ee291fa785760e6774d006.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
    return data 
  }
)

type Pizza = {
  id:string 
  title:string 
  price:number 
  imageUrl:string 
  sizes:number[] 
  types:number[]  
  rating:number
}

interface PizzaSliceStateType {
  items:Pizza[],
status:'loading' | 'success' | 'error'
}

const initialState : PizzaSliceStateType = {
items:[],
status:Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
  name:'pizza',
  initialState,
  reducers: {
setItems(state,action: PayloadAction<Pizza[]>){
  state.items = action.payload
}
  },
  /* extraReducers: {
    [fetchPizzas.pending]:(state)=>{
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]:(state,action)=>{
      state.items = action.payload
      state.status = 'success'
   },
   [fetchPizzas.rejected]:(state)=>{
      state.status = 'error'
      state.items = []
    },  
  } */
  extraReducers:(builder)=>{
    builder.addCase(fetchPizzas.pending,(state,action)=>{
      state.status = Status.LOADING;
      state.items = [];
    })
 
  builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
    state.items = action.payload
    state.status = Status.SUCCESS
  })

builder.addCase(fetchPizzas.rejected,(state,action)=>{
  state.status = Status.ERROR
  state.items = []
})


}
})

export const selectPizzaData = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer