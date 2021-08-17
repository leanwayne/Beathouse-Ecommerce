import React, {useContext } from "react";
import { makeStyles, Typography, Container, } from '@material-ui/core';
import HightligthContainer from "../productComponents/HightligthContainer";
import FeaturesComponent from "../decorationComponents/FeaturesComponent";
import ProductsButtons from "../decorationComponents/ProductsButtons";
import SignInButton from "../decorationComponents/SignInButton";
import BannerComponent from "../decorationComponents/BannerComponent";

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

export default function MainPage() {
  const classes = useStyles();
  return (
    <div> 
          <BannerComponent/>
          <Container>
              <Typography variant="h4" align="center" className={classes.typography}>
                  FEATURED PRODUCTS
              </Typography>
              <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                  ____
              </Typography>
              <HightligthContainer/>
              <Typography variant="h2" align="center" className={classes.typography}>
                  What can I find in Beathouse?
              </Typography>
              <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                  _______
              </Typography>
              <FeaturesComponent/>
              <ProductsButtons/> 
              <SignInButton/>
          </Container>
    </div>  
  );
}