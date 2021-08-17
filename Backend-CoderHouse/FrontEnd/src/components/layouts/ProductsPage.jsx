import React from 'react'
import { makeStyles, Typography, Container, } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import MyCarousel from '../decorationComponents/MyCarousel';
import { useParams } from 'react-router';
import FeaturesComponent from '../decorationComponents/FeaturesComponent';
import SignInButton from '../decorationComponents/SignInButton';
import CatalogueContainer from '../productComponents/CatalogueContainer';

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
  });

const ProductsPage = () => {
    const classes = useStyles();
    const { CategoryID } = useParams();

    return (
        <div>
            <MyCarousel/> 
            <Container>
                <Typography variant="h4" align="center" className={classes.typography}>
                    {CategoryID}
                </Typography>
                <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                    ____
                </Typography>
                <CatalogueContainer category={CategoryID}/>
                <FeaturesComponent/>
                <SignInButton/>                   
            </Container>         
        </div>
    )
}

export default ProductsPage