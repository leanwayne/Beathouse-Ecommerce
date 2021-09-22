import React, {useState, useContext} from 'react'
import {makeStyles, IconButton, Badge, Dialog, DialogTitle, Typography, DialogContent, Button, DialogActions} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {CartContext} from '../contexts/CartContext'
import {AuthContext} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(10),
        marginTop: theme.spacing(2),
    },
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
  }))

const CartButton = () => {
    const classes = useStyles()
    const {badgeItems} = useContext(CartContext)
    const {logged} = useContext(AuthContext)
    const [openDialog, setOpendialog] = useState(false)
    const history = useHistory()
  
    const cartAcces = () => {
        if(!logged){
            setOpendialog(true)
        } else{
            history.push('/cart')
        } 
    }

    const handleClose = () => {
        setOpendialog(false)
    }

    return (
        <>
            <IconButton color='inherit' className={classes.button} onClick={cartAcces}>
                    <Badge badgeContent={badgeItems} color='secondary'>
                        <ShoppingCartIcon/>
                    </Badge>
            </IconButton> 
            <Dialog
                fullWidth={true}
                open={openDialog}
                onClose={handleClose}
            >                              
                <DialogTitle>
                    <Typography variant='h5' align='center'>
                        The cart it's only available for registered users
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant='body1' align='center'>
                         Please sign in to continue
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.media}>
                    <Button color='primary' href={'/SignIn'}>
                        Sign in
                    </Button>
                </DialogActions>
            </Dialog>
        </>   
    )
}
export default CartButton