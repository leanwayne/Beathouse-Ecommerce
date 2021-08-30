import React, {useEffect, useState} from 'react'
import ProductDetail from './ProductDetail'
import {Grid} from '@material-ui/core'

const DetailContainer = ({productID}) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        fetch(` http://localhost:8080/productos/listarid/?id=${productID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {setProduct(data)})
        .catch((err) =>{
            console.log('algo salio mal',err)
        });            
    }, []);
  
    return (
        <Grid container justifyContent='center' alignItems='center'>
            {<ProductDetail product={product}/>}
        </Grid>
    )
}

export default DetailContainer
