import React, {useEffect, useState} from 'react'
import {Grid, makeStyles, Fab} from '@material-ui/core'
import ColorSelector from './ColorSelector'
import QuantitySelector from './QuantitySelector'
import AddToCart from './AddToCart'

const useStyles = makeStyles((theme) => ({
    grid:{
        marginLeft: theme.spacing(0),
    },
    grid2:{
        marginRight: theme.spacing(2),
    }
}))

const SelectionContainer = ({productCode}) => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8080/productos//listarcodigo?codigoP=${productCode}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {setProducts(data)})
        .catch((err) =>{
            console.log('algo salio mal',err)
        })        
    }, [])

    return (
        <>
            <Grid container direction="row" xs={12}>
                <Grid item className={classes.grid}>
                    <ColorSelector products={products} setColor={setColor}/>
                </Grid>
                <Grid item className={classes.grid2}>
                    <QuantitySelector color={color} products={products} setQuantity={setQuantity} quantity={quantity}/>
                </Grid>
                <Grid item >
                    <AddToCart color={color} products={products} quantity={quantity}/>
                </Grid>
            </Grid> 
        </>
    ) 
}

export default SelectionContainer