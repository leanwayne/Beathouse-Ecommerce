import React, {useContext } from 'react';
import {makeStyles, Typography, Container, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'
import FeaturesComponent from '../decorationComponents/FeaturesComponent'
import ProductsButtons from '../decorationComponents/ProductsButtons'
import BannerComponent from '../decorationComponents/BannerComponent'
import CartContainer from '../CartComponents/CartContainer'

const useStyles = makeStyles({
    typography:{
        zIndex: 1,
        top: 100,
        paddingTop:'40px'
    },
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
            <BannerComponent/>
            <Container>
                <Typography variant="h4" align="center" className={classes.typography}>
                    Shopping Cart
                </Typography>
                <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                    ____
                </Typography>
                <CartContainer/>
                <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                    _______
                </Typography>
                <ProductsButtons/> 
                <FeaturesComponent/>
            </Container>
        </div>  
    );
}
export default MainPage