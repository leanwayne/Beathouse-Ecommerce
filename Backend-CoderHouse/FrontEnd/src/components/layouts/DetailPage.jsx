import React from 'react'
import { makeStyles, Typography, Container, } from '@material-ui/core';
import MyCarousel from '../decorationComponents/MyCarousel';
import { useParams } from 'react-router';
import FeaturesComponent from '../decorationComponents/FeaturesComponent';
import SignInButton from '../decorationComponents/SignInButton';
import DetailContainer from '../productComponents/DetailContainer';

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

const DetailPage = () => {
    const classes = useStyles();
    const { productID } = useParams();

    return (
        <div>
            <MyCarousel/> 
            <Container>
                <Typography variant="h4" align="center" className={classes.typography}>
                    sarasa
                </Typography>
                <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                    ____
                </Typography>
                <DetailContainer productID={ productID }/>
                <FeaturesComponent/>
                <SignInButton/>                   
            </Container>         
        </div>
    )
}

export default DetailPage