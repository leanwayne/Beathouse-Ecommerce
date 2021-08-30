import React, {useState, useEffect} from 'react'
import {Grid, IconButton, Typography, makeStyles, Paper} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
    },
      paper: {
          marginTop: theme.spacing(0.90),
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),   
    },
    number:{
          marginTop: theme.spacing(3),    
    },
    stock:{
        marginLeft: theme.spacing(5.75),
        color:'#6f6f6f'
    }
}))

const QuantitySelectorCart = ({product, setHandleChange, handleChange}) => {
    const classes = useStyles()
    const [quantity, setQuantity] = useState(product.cantidad)

    useEffect(()=>{
        console.log(`cantidad del product.cantidad de ${product.producto.nombre}`,product.cantidad)
        console.log('CANTIDAD DEL QUANTITY-----', quantity)

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({quantity: quantity})
        };
        fetch(`http://localhost:8080/cart/modificar?id=${product.producto._id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("cantidad cambiada", data)
            console.log("CANTIDAD DEL QUANTITY postfetch-----", quantity)
            setHandleChange(handleChange+1)
        })
        .catch(err =>{
            console.log("ERRROOOORRRR" , err)
        })
    }, [quantity])

    const removeBotton = () => {
        setQuantity(product.cantidad -1)
    }

    const addButton = () => {
        setQuantity(product.cantidad +1)
    }

    return (
        <div>
            <Grid container direction="row">
                <IconButton 
                    color="primary" 
                    className={classes.button} 
                    onClick={removeBotton}
                    disabled={quantity <= 1? true : false}
                >
                    <RemoveIcon/>
                </IconButton>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h6" className={classes.number}>
                        {product.cantidad}
                    </Typography>
                </Paper>
                <IconButton 
                    color="primary" 
                    className={classes.button} 
                    onClick={addButton}
                    disabled={quantity >= product.producto.stock? true : false}
                >
                    <AddIcon/>
                </IconButton> 
            </Grid> 
            <Typography variant='caption' className={classes.stock}>        
                {`available ${product.producto.stock}`}
            </Typography>    
        </div>
    )
} 
export default QuantitySelectorCart