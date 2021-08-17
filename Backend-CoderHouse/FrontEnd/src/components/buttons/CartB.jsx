import React from 'react'
import { Button, makeStyles, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(2),
    },
  }));

const CartB = () => {
    const classes = useStyles();

    return (
        <IconButton aria-label="show 17 new notifications" color="inherit" className={classes.button}>
                <Badge badgeContent={0} color="secondary">
                        <ShoppingCartIcon/>
                </Badge>
        </IconButton>    
    )

}

export default CartB