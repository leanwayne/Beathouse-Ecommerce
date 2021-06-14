import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import AuthProvider from "./components/contexts/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header/>
                <Main/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
