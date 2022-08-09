import React from "react";

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/skeleton/PizzaSkeleton';


function Home(){
  const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true)

  React.useEffect(()=>{
    fetch('https://62ee291fa785760e6774d006.mockapi.io/pizzas')
    .then(res=>res.json())
    .then(pizzas=>{
      setPizzas(pizzas)
    setIsLoading(false)})
    window.scrollTo(0,0)
  },[])
  return (
    <div className="container">
      <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            
            {
              isLoading 
              ? [...new Array(6)].map((_,index)=><PizzaSkeleton  key={index}/>) 
              : pizzas.map(pizza=><PizzaBlock {...pizza}/>)
            }
          </div>
    </div>
  )
}
export default Home