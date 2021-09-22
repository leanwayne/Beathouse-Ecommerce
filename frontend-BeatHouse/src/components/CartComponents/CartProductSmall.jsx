import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Typography, CardMedia, Divider} from '@material-ui/core'
import DeleteProductButton from './DeleteProductButtom'
import QuantitySelectorCartSmall from './QuantitySelectorCartSmall'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 100,
        backgroundSize: 'contain'
    },
      paper: {
        height: 'auto',
        margin: 'auto',
        width: '100%',
    },
    marginButtons:{
        marginTop: theme.spacing(1),
    },
}))

const CartProductSmall = ({product, setHandleChange, handleChange}) => {
    const classes = useStyles();

    return (
        <>
            {product && (
                <>
                    <Divider/>
                        <Grid container  direction='row'  className={classes.paper}>
                            <Grid item xs={2} >
                                <CardMedia
                                    className={classes.media}
                                    image={`data:image/jpeg;base64,${product.product.photoUrl}`}
                                />
                            </Grid>
                            <Grid item xs={10} container direction='colum' className={classes.marginPrice}>
                                <Grid item xs={4}  className={classes.paper}> 
                                    <Typography variant='body1' color='initial' align='left' className={classes.marginPrice}>
                                        {product.product.name}
                                    </Typography>
                                    <Typography variant='subtitle2' color='initial' align='left'>
                                        Color: {product.product.color}
                                    </Typography>
                                    <Typography variant='h6' color='initial' align='left'>
                                       {`$ ${product.quantity * product.product.price}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}> 
                                    <QuantitySelectorCartSmall product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>                                                   
                                </Grid>     
                                <Grid item xs={1} className={classes.marginButtons}> 
                                    <DeleteProductButton productId={product.product._id} setHandleChange={setHandleChange} handleChange={handleChange}/>                                                   
                                </Grid>
                            </Grid>
                        </Grid>
                    <Divider/>                             
                </>
            )} 
        </>
    )    
}
export default CartProductSmall;