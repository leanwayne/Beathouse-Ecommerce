import React, {useEffect, useState} from 'react'
import CartProduct from './CartProduct'
import {Grid, Paper} from '@material-ui/core'

const CartContainer = () => {
    const [products, setProducts] = useState([])
    const [handleChange, setHandleChange] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8080/cart/listar`, {
          headers: {"Content-Type": "application/json"}, credentials: "include"
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data cart container", data)
            setProducts(data)
        })
        .catch((err) =>{
            console.log("algo salio mal",err)
        })          
    }, [handleChange])
  
    return (
        <Grid container justifyContent="center" alignItems="center" >
            {products.map(product => <CartProduct product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>)}
        </Grid>
    )
  }
  export default CartContainer