import React, {useState, useContext} from 'react'
import {Button, makeStyles} from '@material-ui/core'
import {CartContext} from '../contexts/CartContext'
import CircularProgress from '@material-ui/core/CircularProgress'
import PurchaseDialog from './PurchaseDialog'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(0),
        marginTop: theme.spacing(0),
    },
}))

const CheckoutButton = () => {
    const classes = useStyles()
    const {loadingContainer} = useContext(CartContext)
    const [successData, setSuccessData] = useState("")
    const [failedData, setFailedData] = useState([])
    const [successfulOrder, setSuccessfulOrder] = useState(false)
    const [failedOrder, setFailedOrder] = useState(false)
    const [loading, setLoading] = useState(false)

    const finishPurchase = () => {
        setLoading(true)
        const requestOptions = {
            method: 'PUT',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            credentials: 'include',
        }
        fetch('http://localhost:8080/cart/finalizepurchase', requestOptions)
        .then(response => response.json())
        .then(data => {
            const test = data
            if(test.orderCode){
                setSuccessfulOrder(true)
                setSuccessData(data)
            } else {    
                setFailedOrder(true)
                setFailedData(data)
            } 
            setLoading(false)
        })
        .catch(err =>{
            console.log('ERROR', err)
        })   
    }

    if(loading) return <CircularProgress/>

    return (
        <>
            <Button 
                color="primary" 
                variant='contained' 
                className={classes.button}
                disabled={loadingContainer ? true : false}
                onClick={finishPurchase}
            >
                Finish purchase order
            </Button>
            <PurchaseDialog
                successfulOrder={successfulOrder}
                setSuccessfulOrder={setSuccessfulOrder}
                failedOrder={failedOrder}
                setFailedOrder={setFailedOrder}
                successData={successData}
                failedData={failedData}
            />
        </>
    )
}
export default CheckoutButton