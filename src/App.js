import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
//import pizzas from './assets/pizzas.json'


function App() {
  const [searchValue, setSearchValue] = React.useState('')
  /* const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true) */


  React.useEffect(() => { 
    fetch('https://62ee291fa785760e6774d006.mockapi.io/pizzas')
      .then(res => res.json())
      .then(pizzas => {
        setPizzas(pizzas)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="content">

        <Routes>
          <Route path='/home' element={<Home searchValue={searchValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
