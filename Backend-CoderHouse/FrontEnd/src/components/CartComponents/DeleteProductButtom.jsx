import React from 'react'
import {IconButton, Badge} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const DeleteProductButton = ({productId, setHandleChange, handleChange}) => {
    const deleteProduct = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }
        fetch(`http://localhost:8080/cart/borrar?id=${productId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("fetch DELETE completado", data)
            setHandleChange(handleChange+1)
        })
        .catch(err =>{
            console.log("ERRROOOORRRR" , err)
        })
    }

    return (
        <IconButton color="inherit" onClick={deleteProduct}>
            <Badge badgeContent={0} color="secondary">
                <HighlightOffIcon/>
            </Badge>
        </IconButton>    
    )
}
export default DeleteProductButton