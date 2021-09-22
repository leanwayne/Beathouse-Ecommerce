import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Typography, CardMedia, Divider, Hidden} from '@material-ui/core'
import DeleteProductButton from './DeleteProductButtom'
import QuantitySelectorCart from './QuantitySelectorCart'
import CartProductSmall from './CartProductSmall'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 100,
        backgroundSize: 'contain'
    },
    paper:{
        height: 'auto',
        margin: 'auto',
        width: '100%',
    },
    margin1:{
        marginTop: theme.spacing(4),
    },
    margin2:{
        marginTop: theme.spacing(3),
    },
}))

const CartProduct = ({product, setHandleChange, handleChange}) => {
    const classes = useStyles()

    return (
        <>
            {product && (
                <>
                    <Hidden smDown>
                        <Divider/>
                            <Grid container  direction='row'>
                                <Grid item xs={2}>
                                    <CardMedia
                                        className={classes.media}
                                        image={`data:image/jpeg;base64,${product.product.photoUrl}`}
                                    />
                                </Grid>
                                <Grid item xs={9} container direction='row'>
                                    <Grid item xs={3}  className={classes.paper}> 
                                        <Typography variant='body1' color='initial' align='left' className={classes.margin1} >
                                            {product.product.name}
                                        </Typography>
                                        <Typography paragraph variant='subtitle2' color='initial' align='left'>
                                            Color: {product.product.color}
                                        </Typography>                                                       
                                    </Grid>
                                    <Grid item xs={3}> 
                                        <QuantitySelectorCart product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>                                                  
                                    </Grid>
                                    <Grid item xs={3} className={classes.margin1}> 
                                        <Typography variant='h6' color='initial' align='left'>
                                            {`$ ${product.quantity * product.product.price}`}
                                        </Typography>                                                     
                                    </Grid>     
                                    <Grid item xs={1} className={classes.margin2}> 
                                        <DeleteProductButton productId={product.product._id} setHandleChange={setHandleChange} handleChange={handleChange}/>                                                   
                                    </Grid>                   
                                </Grid>
                            </Grid>
                        <Divider/>                
                    </Hidden>
                    <Hidden mdUp>
                        <CartProductSmall product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>
                    </Hidden>
                </>
            )} 
        </>
    )    
} 
export default CartProduct