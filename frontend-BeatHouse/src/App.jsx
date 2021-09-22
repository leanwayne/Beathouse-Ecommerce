import React from 'react'
import Main from './components/Main'
import {ThemeProvider} from '@material-ui/core/styles'
import {BrowserRouter} from 'react-router-dom'
import {CssBaseline} from '@material-ui/core'
import theme from './components/muiThemeConfig/ThemeConfig'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthProvider from './components/contexts/AuthContext' 
import CartProvider from './components/contexts/CartContext'

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Header/>
                        <Main/>
                        <Footer/>
                    </ThemeProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}