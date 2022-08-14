import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
//import pizzas from './assets/pizzas.json'

export const SearchContext = React.createContext('')

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  /* const [pizzas,setPizzas]= React.useState([])
  const [isLoading,setIsLoading] = React.useState(true) */


  React.useEffect(() => {
    fetch('https://62ee291fa785760e6774d006.mockapi.io/pizzas')
      .then(res => res.json())
      .then(pizzas => {
        /* setPizzas(pizzas) */
        /* setIsLoading(false) */
})
  }, [])

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">

          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>


        </div>
      </SearchContext.Provider>

    </div>
  );
}

export default App;
