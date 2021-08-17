import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product'


export default function CatalogueContainer({category}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/productos/listarCat?productoID=${category}`, {
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
            <Grid container >
                {products.map(product => <Product productData={product}/>)}
            </Grid> 
        </>
        );  
}