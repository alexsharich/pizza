import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss'
//import pizzas from './assets/pizzas.json'

function App() {
  const [pizzas,setPizzas]= React.useState([])

  React.useEffect(()=>{
    fetch('https://62ee291fa785760e6774d006.mockapi.io/pizzas')
    .then(res=>res.json())
    .then(pizzas=>setPizzas(pizzas))
  },[])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map(pizza=>(
                 <PizzaBlock {...pizza}
                 />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
