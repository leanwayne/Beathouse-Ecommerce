import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product';


export default function HightligthContainer() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/productos/listarDestacados", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {setProducts(data)})
            .catch((err) =>{
                console.log("algo salio mal",err)
            });            
    },[]);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" >
                {products.map(product => <Product productData={product}/>)}
            </Grid> 
        </>
        );  
}