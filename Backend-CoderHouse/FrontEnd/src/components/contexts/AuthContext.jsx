import React, {useEffect, useState} from 'react'
import {useLocation, useHistory} from 'react-router-dom'

export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState('')
    const [logged, setLogged] = useState(false)
    const location = useLocation()

    useEffect(() => {
        fetch('http://localhost:8080/session/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
            //console.log("DATA que viene del useEffect del context=",data)
            setUser(data)
            setLogged(true)               
        })
        .catch((err) =>{
            console.log('error desde AuthContext',err)
        })             
    }, [location.pathname])

    return (
        <AuthContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider