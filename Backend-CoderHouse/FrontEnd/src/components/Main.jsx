import React from "react";
import MainPage from "./layouts/MainPage";
import { Route, Switch } from "react-router-dom";
import ProductsPage from "./layouts/ProductsPage";
import SignInPage from "./layouts/SignInPage";
import SignUpPage from "./layouts/SignUpPage";
import DetailPage from "./layouts/DetailPage";

export default function Main() {
    return(
        <div>                      
            <Switch>
                <Route exact path="/">  
                    <MainPage/>
                </Route>
                <Route exact path="/catalogue/:CategoryID">  
                    <ProductsPage/>
                </Route>
                <Route exact path="/catalogue/productDetail/:productID">  
                    <DetailPage/>
                </Route>
                <Route exact path="/SignIn">  
                    <SignInPage/>
                </Route>
                <Route exact path="/SignUp">  
                    <SignUpPage/>
                </Route>
            </Switch>    
        </div>
    )
}