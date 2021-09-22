import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)
    const [authChange, setAuthChange] = useState(1)
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
            setUser(data)
            setLogged(true)   
        })
        .catch((err) =>{
            console.log('error AuthContext',err)
        }) 
    }, [location.pathname, authChange])

    return (
        <AuthContext.Provider value={{user, logged, setLogged, authChange, setAuthChange}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider