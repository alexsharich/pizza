import axios from "axios";
import React from "react";
import {useParams,useNavigate} from 'react-router-dom'

 const FullPizza = ()=>{
  
  const [pizza,setPizza] = React.useState()
  const {id} = useParams()
  const navigate = useNavigate()

React.useEffect(()=>{
  async function fetchPizza(){
    try {
      const {data} = await axios.get(`https://62ee291fa785760e6774d006.mockapi.io/pizzas/` + id)
        setPizza(data)
    } catch(error){
      alert('error FullPizza req')
      navigate('/')
    }
  }
  fetchPizza()
},[])

if(!pizza){
  return 'Please, wait ...'
}

  return (
    <div className="container">
     
     <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza