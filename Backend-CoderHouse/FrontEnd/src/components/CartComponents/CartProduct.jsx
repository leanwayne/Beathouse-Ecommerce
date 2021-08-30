import React, {useState, useEffect, useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Container, Grid, Typography, CardMedia, Divider, Hidden} from '@material-ui/core'
import DeleteProductButton from './DeleteProductButtom'
import QuantitySelectorCart from './QuantitySelectorCart'

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
    margin:{
        marginTop: theme.spacing(2),
    },
}));

const CartProduct = ({product, setHandleChange, handleChange}) => {
    const classes = useStyles();

    return (
        <>
            {product && (
                <>
                    <Divider/>
                        <Grid container  direction="row"  className={classes.paper}>
                            <Grid item xs={2}>
                                <CardMedia
                                    className={classes.media}
                                    image={`data:image/jpeg;base64,${product.producto.fotoUrl}`}
                                />
                            </Grid>
                            <Grid item xs={9} container direction="row" className={classes.margin}>
                                <Grid item xs={3}  className={classes.paper}> 
                                    <Typography variant="body1" color="initial" align="left">
                                        {product.producto.nombre}
                                    </Typography>
                                    <Typography paragraph variant="subtitle2" color="initial" align="left">
                                        Color: {product.producto.color}
                                    </Typography>                                                       
                                </Grid>
                                <Grid item xs={3}  > 
                                    <Typography variant="h6" color="initial" align="left">
                                        <QuantitySelectorCart product={product} setHandleChange={setHandleChange} handleChange={handleChange}/>
                                    </Typography>                                                     
                                </Grid>
                                <Grid item xs={3} className={classes.margin}> 
                                    <Typography variant="h6" color="initial" align="left">
                                        ${product.cantidad * product.producto.precio}
                                    </Typography>                                                     
                                </Grid>     
                                <Grid item xs={1}> 
                                    <DeleteProductButton productId={product.producto._id} setHandleChange={setHandleChange} handleChange={handleChange}/>                                                   
                                </Grid>                   
                            </Grid>
                        </Grid>
                    <Divider/>                             
                </>
            )} 
        </>
    )    
}
 
export default CartProduct;