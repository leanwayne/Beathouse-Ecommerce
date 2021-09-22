import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export const CartContext = React.createContext();

function CartProvider({children}) {
    const [badgeItems, setBadgeItems] = useState(0)
    const [handleChangeBadge, setHandleChangeBadge] = useState(1)
    const [loadingContainer, setLoadingContainer] = useState(false)
    const location = useLocation()

    useEffect(() => {
        fetch(`http://localhost:8080/cart/cartproductsquantity`, {
          headers: {'Content-Type': 'application/json'}, credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            setBadgeItems(data)
        })
        .catch((err) =>{
            console.log('error', err)
        })          
    }, [location.pathname, handleChangeBadge])

    return (
        <CartContext.Provider value={{setHandleChangeBadge, badgeItems, handleChangeBadge, loadingContainer, setLoadingContainer}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider