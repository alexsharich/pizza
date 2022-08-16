import React from "react";
import axios from 'axios'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

import  {setCategoryId,setCurrentPage}  from "../redux/filterSlice";
import {useDispatch,useSelector} from 'react-redux'

function Home  (){
  const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true)
  const {searchValue}= React.useContext(SearchContext)
  //const [currentPage,setCurrentPage]=React.useState(1)
  
  const currentPage = useSelector(state=>state.filterSlice.currentPage)

  const categoryId = useSelector(state=>state.filterSlice.categoryId)
  const sortType =useSelector(state=>state.filterSlice.sort.sortProperty)
  
const changeCurrentPage = (p)=>{
  dispatch(setCurrentPage(p))
}
  const dispatch = useDispatch()

  const onChangeCategory = (id)=>{
    dispatch(setCategoryId(id))
  }

  React.useEffect(()=>{
    setIsLoading(true)

const order = sortType.includes('-') ? 'asc': 'desc'
const sortBy =sortType.replace('-','')
const category = categoryId > 0 ? `category=${categoryId}` : ''
const search = searchValue ? `&search=${searchValue}`:''



   /*  fetch(`https://62ee291fa785760e6774d006.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res=>res.json())
    .then(pizzas=>{
      setPizzas(pizzas)
    setIsLoading(false)}) */
    axios
    .get(`https://62ee291fa785760e6774d006.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res=>{
      setPizzas(res.data)
      setIsLoading(false)
    })
    window.scrollTo(0,0)
  },[categoryId,sortType,searchValue,currentPage])

const filteredPizzas = pizzas
.filter((obj)=>{
  if(obj.title.toLowerCase().includes(searchValue.toLowerCase() )){
    return true
  }
  return false
})
.map(pizza=><PizzaBlock key={pizza.id}{...pizza}/>) 
const skeletons = [...new Array(6)].map((_,index)=><PizzaSkeleton  key={index}/>) 

  return (
    <>
    <div className="container">
      <div className="content__top">
            <Categories 
            value={categoryId}
            onChangeCategory={(id)=>onChangeCategory(id)}/>
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            
          

            {
              isLoading 
              ? skeletons 
              : filteredPizzas
            }
          </div>
          <Pagination changeCurrentPage={changeCurrentPage}/>
    </div>
    </>
    
  )
}
export default Home