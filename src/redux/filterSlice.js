import { createSlice } from "@reduxjs/toolkit"

const initaialState = {
  categoryId:0,
  sort: {
    name:'populiarosti',
    sortProperty:'rating',
  }
}

const filterSlice= createSlice({
  name:'filter',
  initaialState,
  reducers:{
    setCategoryId(state,action){
      state.categoryId = action.payload
    },
    setSort(state,action){
      state.sort = action.payload
    }
  }
})

export const {setCategoryId, setSort} =  filterSlice.actions
export default filterSlice.reducer