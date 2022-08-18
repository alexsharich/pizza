import React from "react";
import axios from 'axios'
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import qs from 'qs'
import  {setCategoryId,setCurrentPage,setFilters}  from "../redux/filterSlice";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Home  (){

  const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true)
  const {searchValue}= React.useContext(SearchContext)
  const navigate = useNavigate()
  
  const currentPage = useSelector(state=>state.filterSlice.currentPage)
  const categoryId = useSelector(state=>state.filterSlice.categoryId)
  const sortType =useSelector(state=>state.filterSlice.sort.sortProperty)
  
const isSearch = React.useRef(false)
const isMounted = React.useRef(false)

const changeCurrentPage = (p)=>{
  dispatch(setCurrentPage(p))
}

const fetchPizzas = ()=>{
  setIsLoading(true)

const order = sortType.includes('-') ? 'asc': 'desc'
const sortBy =sortType.replace('-','')
const category = categoryId > 0 ? `category=${categoryId}` : ''
const search = searchValue ? `&search=${searchValue}`:''
    axios
    .get(`https://62ee291fa785760e6774d006.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res=>{
      setPizzas(res.data)
      setIsLoading(false)
    })
    window.scrollTo(0,0)
}
  const dispatch = useDispatch()

  const onChangeCategory = (id)=>{
    dispatch(setCategoryId(id))
  }

React.useEffect(()=>{
  if(window.location.search){
    const params = qs.parse(window.location.search.substring(1))

const sort = list.find(obj=>obj.sortProperty === params.sortProperty)

    dispatch(setFilters({
      ...params,
      sort
    }))
    isSearch.current = true
  }
},[])

  React.useEffect(()=>{
    window.scrollTo(0,0)

     if(!isSearch.current){
      fetchPizzas()
     }
     isSearch.current = false
  },[categoryId,sortType,searchValue,currentPage])
//first
React.useEffect(()=>{
if(isMounted.current){
  const queryString = qs.stringify({
    sortProperty: sortType,
    categoryId:categoryId,
    currentPage:currentPage
  })
  navigate(`?${queryString}`)
}
isMounted.current = true
},[categoryId,sortType,currentPage])

/* const filteredPizzas = pizzas
.filter((obj)=>{
  if(obj.title.toLowerCase().includes(searchValue.toLowerCase() )){
    return true
  }
  return false
})
.map(obj=><PizzaBlock key={obj.id}{...obj}/>)  */
const filteredPizzas = pizzas.map((obj)=><PizzaBlock key={obj.id} {...obj}/>)
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