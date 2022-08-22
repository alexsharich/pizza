import React from "react";
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';
import Pagination from "../components/Pagination";
import qs from 'qs'
import  {selectFilter, setCategoryId,setCurrentPage,setFilters}  from "../redux/filterSlice";
import {fetchPizzas, selectPizzaData} from '../redux/pizzaSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'

function Home  (){

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {categoryId,sort,currentPage,searchValue} = useSelector(selectFilter)
  const {items,status} = useSelector(selectPizzaData)
  
const isSearch = React.useRef(false)
const isMounted = React.useRef(false)

const changeCurrentPage = (p)=>{
  dispatch(setCurrentPage(p))
}


  const onChangeCategory = (id)=>{
    dispatch(setCategoryId(id))
  }

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
    currentPage
})
) 
     window.scrollTo(0,0)
}

React.useEffect(()=>{
  /* if(isMounted.current){
  
  const params = {
    categoryId: categoryId>0?categoryId: null,
    sortProperty:sort.sortProperty,
    currentPage
  }
  
    const queryString = qs.stringify(params,{skipNulls:true})
    navigate(`/?${queryString}`)
  }
  isMounted.current = true */
  },[categoryId,sort.sortProperty,currentPage])
  



  React.useEffect(()=>{
    /* window.scrollTo(0,0)

     if(!isSearch.current){ */
      getPizzas()
     /* }
     isSearch.current = false */
  },[categoryId,sort.sortProperty,searchValue,currentPage])




React.useEffect(()=>{
 
   /*  const params = qs.parse(window.location.search.substring(1))

     const sort = list.find(obj=>obj.sortProperty === params.sortBy)

    dispatch(setFilters({
      ...params,
      sort
    }))
    isSearch.current = true */
getPizzas()
},[categoryId,sort.sortProperty,searchValue,currentPage])

const filteredPizzas = items.map((obj)=><Link key={obj.id} to={`/pizza/${obj.id}`}>
  <PizzaBlock  {...obj}/>
  </Link>)
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