import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./layouts/LoginPage";
import MainPage from "./layouts/MainPage";



export default function Main({items}) {
    return(
        <div>
            <Switch>
                <Route exact path="/">
                    <LoginPage/> 
                </Route> 
                <Route exact path="/logged">
                    <MainPage/>
                </Route> 
            </Switch>
        </div>
    )
}