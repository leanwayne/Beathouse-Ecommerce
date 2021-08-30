import React from 'react'
import {makeStyles, IconButton, Badge} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(2),
    },
  }));

const CartB = () => {
    const classes = useStyles()

    return (
        <IconButton color='inherit' className={classes.button} href='/cart'>
                <Badge badgeContent={0} color='secondary'>
                    <ShoppingCartIcon/>
                </Badge>
        </IconButton>    
    )
}

export default CartB