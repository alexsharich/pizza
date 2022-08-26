import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortType = {
  name:string
  sortProperty: SortPropertyEnum
}

export interface FilterSliceStateType {
  searchValue:string,
  categoryId:number,
  currentPage:number,
  sort: SortType
}

const initialState : FilterSliceStateType = {
  searchValue:'',
  categoryId:0,
  currentPage:1,
  sort: {
    name:'populiarosti',
    sortProperty:SortPropertyEnum.PRICE_DESC,
  }
}

  const filterSlice = createSlice({
  name:'filters',
  initialState,
  reducers:{
    setCategoryId : (state,action: PayloadAction<number>)=>{
      state.categoryId = action.payload
    },
    setSearchValue : (state,action: PayloadAction<string>)=>{
      state.searchValue = action.payload
    },
    setSort:(state,action: PayloadAction<SortType>)=>{
      state.sort = action.payload

    },
    setCurrentPage:(state,action: PayloadAction<number>)=>{
      state.currentPage = action.payload
    },
    setFilters:(state,action: PayloadAction<FilterSliceStateType>)=>{
      if(Object.keys(action.payload).length){
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'populyarnosti',
          sortProperty: SortPropertyEnum.RATING_DESC
        }
      }
    
    }
  }
})

export const selectFilter = (state: RootState)=>state.filterSlice
export const selectSort = (state: RootState)=>state.filterSlice.sort

export const {setCategoryId, setSort,setCurrentPage,setFilters,setSearchValue} =  filterSlice.actions
export default filterSlice.reducer
