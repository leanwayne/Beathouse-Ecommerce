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

const QuantitySelector = ({color, products, setQuantity, quantity}) => {
    const classes = useStyles()
    const [stock, setStock] = useState(0)

    useEffect(() => {
        products.map(p => {if(p.color === color) return setStock(p.stock)})
    }, [color])

    const removeBotton = () => {
        setQuantity(quantity-1)
    }

    const addButton = () => {
        setQuantity(quantity+1)
    }

    return (
        <div>
            <Grid container direction='row'>
                <IconButton 
                    color='primary'
                    className={classes.button} 
                    onClick={removeBotton}
                    disabled={quantity <= 1? true : false}
                >
                    <RemoveIcon/>
                </IconButton>
                <Paper variant='outlined' className={classes.paper}>
                    <Typography variant='h6' className={classes.number}>
                        {quantity}
                    </Typography>
                </Paper>
                <IconButton 
                    color='primary'
                    className={classes.button} 
                    onClick={addButton}
                    disabled={quantity >= stock? true : false}
                >
                    <AddIcon/>
                </IconButton> 
            </Grid> 
            <Typography variant='caption' className={classes.stock}>        
                {products.map(p => { if(p.color === color)return `(${p.stock} available)`})}
            </Typography>    
        </div>
    )
} 

export default QuantitySelector