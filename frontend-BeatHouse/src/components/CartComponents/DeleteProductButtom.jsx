import React, {useState, useContext} from 'react'
import {IconButton} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CircularProgress from '@material-ui/core/CircularProgress'
import {CartContext} from '../contexts/CartContext'

const DeleteProductButton = ({productId, setHandleChange, handleChange}) => {
    const [loading, setLoading] = useState(false)
    const {loadingContainer, setLoadingContainer} = useContext(CartContext)

    const deleteProduct = () => {
        setLoading(true)
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }
        fetch(`http://localhost:8080/cart/delete?id=${productId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('fetch DELETE completed', data)
            setLoading(false)
            setLoadingContainer(true)
            setHandleChange(handleChange+1)
        })
        .catch(err =>{
            console.log('ERROR' , err)
        })
    }

    if(loading || loadingContainer) return <CircularProgress/>

    return (
        <IconButton color="inherit" onClick={deleteProduct}>
                <HighlightOffIcon/>
        </IconButton>    
    )
}
export default DeleteProductButton