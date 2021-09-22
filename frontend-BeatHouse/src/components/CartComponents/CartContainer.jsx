import React, {useEffect, useState, useContext} from 'react'
import CartProduct from './CartProduct'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper, Typography, Divider} from '@material-ui/core'
import {CartContext} from '../contexts/CartContext'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckoutButton from './CheckoutButton'

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 'auto',
        padding: theme.spacing(4),
        margin: 'auto',
        width: 'auto',
    },
    typography:{
        color: '#4c4c4c'
    },
    button:{
        paddingLeft:19
    },
    margin:{
        marginTop: 20
    },
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
}))

const CartContainer = () => {
    const [handleChange, setHandleChange] = useState(1)
    const [loading, setLoading] = useState(true)
    const {setHandleChangeBadge, handleChangeBadge, setLoadingContainer } = useContext(CartContext)
    const classes = useStyles()
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/cart/listcart`, {
          headers: {'Content-Type': 'application/json'}, credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            setProducts(data)
            setHandleChangeBadge(handleChangeBadge+1)
            setLoading(false)
            setLoadingContainer(false)
        })
        .catch((err) =>{
            console.log('error', err)
        })          
    }, [handleChange])

    const totalPrice = () => {
        let total = 0
        products.forEach(p => {
            const productPrice = p.product.price * p.quantity
            total +=  productPrice
        })
        return total
    }

    if(loading){
        return (
           <Grid container justifyContent='center' alignItems='center' className={classes.media}>
               <CircularProgress size={150} className={classes.media}/>
           </Grid>
       )
   }

    return (
        <Paper className={classes.paper}>
            {!(products.length == 0) ? (
                <>
                    <Grid container justifyContent='center' alignItems='center'>
                        {products.map(product => <CartProduct product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>)}
                    </Grid>
                    <Divider variant='fullWidth'/>
                    <Grid container justifyContent='center' alignItems='center' direction="column" className={classes.margin}>
                            <Typography variant='h5'>
                                {`Final: $ ${totalPrice()}`}
                            </Typography>
                            <CheckoutButton setHandleChange={setHandleChange} handleChange={handleChange}/>
                    </Grid>
                </>
            ):(
                <>
                    <Typography variant="h4" align="center" className={classes.typography}>
                        Your cart is empty
                    </Typography>
                    <Typography variant="h6" align="center" className={classes.typography}>
                        Not sure what to buy? Thousands of products await you!
                    </Typography>
                </>     
            )}
        </Paper>
    )
  }
  export default CartContainer