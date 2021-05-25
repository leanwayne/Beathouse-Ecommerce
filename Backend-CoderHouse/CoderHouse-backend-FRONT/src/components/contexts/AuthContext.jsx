import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";

export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:8080/productos/login", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.nombre) setUser(data.nombre)
                else history.push('/')
            })
            .catch((err) => console.log(err));
    },[location.pathname]);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;