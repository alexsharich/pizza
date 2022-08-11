import React from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';
import Pagination from "../components/Pagination";



function Home  ({searchValue}){
  const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [currentPage,setCurrentPage]=React.useState(1)
  const [sortType,setSortType]=React.useState({
    name:'populiarosti',sortProperty:'rating'
  }) 

  React.useEffect(()=>{
    setIsLoading(true)

const order = sortType.sortProperty.includes('-') ? 'asc': 'desc'
const sortBy =sortType.sortProperty.replace('-','')
const category = categoryId > 0 ? `category=${categoryId}` : ''
const search = searchValue ? `&search=${searchValue}`:''

    fetch(`https://62ee291fa785760e6774d006.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res=>res.json())
    .then(pizzas=>{
      setPizzas(pizzas)
    setIsLoading(false)})
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
            onChangeCategory={(id)=>setCategoryId(id)}/>
            <Sort 
             value={sortType}
             onChangeSort={(id)=>setSortType(id)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            
          

            {
              isLoading 
              ? skeletons 
              : filteredPizzas
            }
          </div>
          <Pagination setCurrentPage={setCurrentPage}/>
    </div>
    </>
    
  )
}
export default Home