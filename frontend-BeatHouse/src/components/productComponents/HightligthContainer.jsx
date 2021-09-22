import React, {useEffect, useState} from 'react'
import {Grid, makeStyles} from '@material-ui/core'
import Product from './Product'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
}))

const HightligthContainer = () => {
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8080/products/listfeatured', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setProducts(data)
            setLoading(false)     
        })
        .catch((err) =>{
            console.log('error', err)
        })         
    }, [])

    if(loading){
         return (
            <Grid container justifyContent='center' alignItems='center' className={classes.media}>
                <CircularProgress size={150} className={classes.media}/>
            </Grid>
        )
    }

    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>
                {products.map(product => <Product productData={product}/>)}
            </Grid>                                         
        </>
    )
}
export default HightligthContainer