import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./layouts/LoginPage";
import MainPage from "./layouts/MainPage";
import LogOutPage from "./layouts/LogOutPage";



export default function Main() {
    return(
        <div>
            <Switch>
                <Route exact path="/">
                    <LoginPage/> 
                </Route> 
                <Route exact path="/logged">
                    <MainPage/>
                </Route>                
                <Route exact path="/logOut">
                    <LogOutPage/>
                </Route> 
            </Switch>
        </div>
    )
}