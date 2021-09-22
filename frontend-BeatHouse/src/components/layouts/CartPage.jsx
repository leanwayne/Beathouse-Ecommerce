import React from 'react'
import {makeStyles, Typography, Container} from '@material-ui/core'
import FeaturesComponent from '../decorationComponents/FeaturesComponent'
import ProductsButtons from '../decorationComponents/ProductsButtons'
import BannerComponentCart from '../CartComponents/BannerComponentCart'
import CartContainer from '../CartComponents/CartContainer'

const useStyles = makeStyles({
    span:{
        marginTop:'-35px',
        marginBottom:'30px',
        color:'#6b2716'
    },
})

const MainPage = () => {
    const classes = useStyles()
    return (
        <div> 
            <BannerComponentCart/>
            <Container>
                <Typography  variant="h2" align="center" className={classes.span}>
                    ____
                </Typography>
                <CartContainer/>
                <Typography gutterBottom variant="h2" align="center" className={classes.span}>
                    _______
                </Typography>
                <ProductsButtons/> 
                <FeaturesComponent/>
            </Container>
        </div>  
    )
}
export default MainPage