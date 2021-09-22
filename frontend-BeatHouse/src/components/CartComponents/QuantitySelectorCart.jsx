import React, {useState, useEffect, useContext} from 'react'
import {Grid, IconButton, Typography, makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import CircularProgress from '@material-ui/core/CircularProgress'
import {CartContext} from '../contexts/CartContext'

const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: theme.spacing(4),
    },
    number:{
        marginTop: theme.spacing(4),   
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1), 
    },
    stock:{
        marginLeft: theme.spacing(1.75),
        color:'#6f6f6f'
    },
}))

const QuantitySelectorCart = ({product, setHandleChange, handleChange}) => {
    const classes = useStyles()
    const [quantity, setQuantity] = useState(product.quantity)
    const [loading, setLoading] = useState(false)
    const {loadingContainer, setLoadingContainer} = useContext(CartContext)

    useEffect(()=>{
        setLoading(true)
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({quantity: quantity})
        };
        fetch(`http://localhost:8080/cart/modifyquantity?id=${product.product._id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setHandleChange(handleChange+1)
            setLoading(false)
            setLoadingContainer(true)
        })
        .catch(err =>{
            console.log('error' , err)
        })
    }, [quantity])

    const removeBotton = () => {
        setQuantity(product.quantity -1)
    }

    const addButton = () => {
        setQuantity(product.quantity +1)
    }

    return (
        <div>
            <Grid container direction='row'>
                <IconButton
                    size='small'
                    color='primary'
                    className={classes.button} 
                    onClick={removeBotton}
                    disabled={quantity <= 1 || loading || loadingContainer ? true : false}
                >
                    <RemoveIcon/>
                </IconButton>
                    {loading || loadingContainer ? (
                        <CircularProgress/>
                    ):(
                        <Typography variant='h6' className={classes.number}>
                            {product.quantity}
                        </Typography>
                    )}
                <IconButton
                    size='small'
                    color='primary'
                    className={classes.button} 
                    onClick={addButton}
                    disabled={quantity >= product.product.stock || loading || loadingContainer ? true : false}
                >
                    <AddIcon/>
                </IconButton> 
            </Grid> 
            <Typography variant='caption' className={classes.stock}>        
                {`available ${product.product.stock}`}
            </Typography>    
        </div>
    )
} 
export default QuantitySelectorCart