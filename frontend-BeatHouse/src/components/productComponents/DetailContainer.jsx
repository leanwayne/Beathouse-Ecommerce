import React, {useEffect, useState} from 'react'
import ProductDetail from './ProductDetail'
import {Grid, makeStyles} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
}))

const DetailContainer = ({productId}) => {
    const classes = useStyles()
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(` http://localhost:8080/products/listbyid/?id=${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setProduct(data)
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
                {<ProductDetail product={product}/>}
            </Grid>
        </>
    )
}
export default DetailContainer