import React, { useCallback } from "react";
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';
import Pagination from "../components/Pagination";
import qs from 'qs'
import  {FilterSliceStateType, selectFilter, setCategoryId,setCurrentPage,setFilters}  from "../redux/filterSlice";
import {fetchPizzas, SearchPizzaParamsType, selectPizzaData} from '../redux/pizzaSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import { useAppDispatch } from "../redux/store";

const Home : React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {categoryId,sort,currentPage,searchValue} = useSelector(selectFilter)
  const {items,status} = useSelector(selectPizzaData)
  
const isSearch = React.useRef(false)
const isMounted = React.useRef(false)

const changeCurrentPage = (p : number)=>{
  dispatch(setCurrentPage(p))
}

  const onChangeCategory = useCallback((id : number)=>{
    dispatch(setCategoryId(id))
  },[])

const getPizzas = async ()=>{

const order = sort.sortProperty.includes('-') ? 'asc': 'desc'
const sortBy =sort.sortProperty.replace('-','')
const category = categoryId > 0 ? `category=${categoryId}` : ''
const search = searchValue ? `&search=${searchValue}`:''

dispatch(
  fetchPizzas({
    order,
    sortBy,
    category,
    search,
    currentPage: String(currentPage)
})
) 
     window.scrollTo(0,0)
}

/* React.useEffect(()=>{
  if(isMounted.current){
  
  const params = {
    categoryId: categoryId>0?categoryId: null,
    sortProperty:sort.sortProperty,
    currentPage
  }
  
    const queryString = qs.stringify(params,{skipNulls:true})
    navigate(`/?${queryString}`)
  }
 
  if (!window.location.search){
    dispatch(fetchPizzas({} as SearchPizzaParamsType))
  }

  },[categoryId,sort.sortProperty,searchValue,currentPage]) */
  



  React.useEffect(()=>{
 
      getPizzas()

  },[categoryId,sort.sortProperty,searchValue,currentPage])




/* React.useEffect(()=>{
 if(window.location.search){
  const params= qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParamsType
  const sort = list.find(obj=>obj.sortProperty === params.sortBy)
  
   dispatch(setFilters({
    searchValue:params.search,
    categoryId:Number(params.category),
    currentPage:Number(params.currentPage),
    sort: sort || list[0],
   }))
 }
 isMounted.current = true
getPizzas()
},[]) */

const filteredPizzas = items.map((obj : any)=>
  <PizzaBlock key ={obj.id} {...obj}/>
)
const skeletons = [...new Array(6)].map((_,index)=><PizzaSkeleton  key={index}/>) 

  return (
    <>
    <div className="container">
      <div className="content__top">
            <Categories 
            value={categoryId}
            onChangeCategory={(id)=>onChangeCategory(id)}/>
            <Sort value={sort}/>
          </div>
          <h2 className="content__title">?????? ??????????</h2>
          {
            status ==='error'? (
              <div className="content__error-info">
                  <h2>Error</h2>
                  <p>pizzas not found</p>
              </div> 
            ) : (
<div className="content__items">
            {
              status === 'loading' 
              ? skeletons 
              : filteredPizzas
            }
          </div>
            )
          }
          
          <Pagination changeCurrentPage={changeCurrentPage}/>
    </div>
    </>
    
  )
}
export default Home