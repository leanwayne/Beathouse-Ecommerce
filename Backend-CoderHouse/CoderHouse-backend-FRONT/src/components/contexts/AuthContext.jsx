import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";

export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [user, setUser] = useState("");
    const [log, setLog] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:8080/session/login", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.passport){
                    setUser(data.passport.user) 
                    setLog(true) 
                }else{
                    history.push('/')
                }
                
            })
            .catch((err) => console.log(err));
    },[location.pathname]);

    return (
        <AuthContext.Provider value={{user, log, setLog}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;