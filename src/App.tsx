import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'
import {Routes,Route} from 'react-router-dom'
import Cart from './pages/Cart'
import FullPizza from './components/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {

  return (
    <Routes>
      <Route path ='/' element={<MainLayout/>}>
        <Route path='home' element={<Home />}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='pizza/:id' element={<FullPizza/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes> 
  );
}

export default App;
