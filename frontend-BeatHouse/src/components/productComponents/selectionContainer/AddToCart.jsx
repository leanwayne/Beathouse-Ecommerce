import React, {useState, useEffect, useContext} from 'react'
import {makeStyles, Button, Dialog, Slide, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {AuthContext} from '../../contexts/AuthContext'
import {useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 110,
    },
    button: {
        marginTop: theme.spacing(2),
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props}/>
});

const AddToCart = ({color, products, quantity}) => {
    const classes = useStyles()
    const [product, setProduct] = useState({})
    const [userLogged, setUserLogged] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const {logged} = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        if(color) setProduct(products.find(p => p.color === color))
    }, [color])

    const addProduct = () => {
        if(logged){
            const requestOptions = {
                method: 'PUT',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({product:{productCode:product.productCode, id:product._id, color:color, stock:product.stock, name:product.name}, quantity:quantity})
            }
            fetch('http://localhost:8080/cart/addtocart', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data--------------', data)
                data === 'quantity error'? setQuantityError(true) : history.push('/cart')
            })
            .catch(err =>{
                console.log('ERROR', err)
            })
        }else {
            setUserLogged(true)
        }     
    }
      
    const handleClose = () => {
        setUserLogged(false)
        setQuantityError(false)
    }

    return (
        <div>
            <Button 
                variant='contained'
                disabled={color === 'readonly' || !color || product === undefined || product.stock === 0? true : false}
                size='large'
                color='primary'
                className={classes.button}
                onClick={addProduct}
            >
                Add to Cart
                {<ShoppingCartIcon className={classes.extendedIcon}/>}
            </Button>
            {userLogged &&(
                <Dialog
                    TransitionComponent={Transition}
                    open={userLogged}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >                              
                    <DialogTitle id='alert-dialog-title'>{'You are not logged in.'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>          
                            The shopping cart it's only available for registered users. Please log in and try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' href={'/SignIn'}>
                            Go to Log in page.
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {quantityError &&(
                <Dialog
                    open={quantityError}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >                              
                    <DialogTitle>{"Can't add more of this product"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>                           
                          you already added the maximum of the stock.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' href={'/cart'}>
                            Go to shopping cart.
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}
export default AddToCart