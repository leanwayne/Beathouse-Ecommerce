import React from 'react'
import {makeStyles, Typography, Container} from '@material-ui/core'
import MyCarousel from '../decorationComponents/MyCarousel'
import {useParams} from 'react-router'
import FeaturesComponent from '../decorationComponents/FeaturesComponent'
import SignUpButton from '../decorationComponents/SignUpButton'
import DetailContainer from '../productComponents/DetailContainer'

const useStyles = makeStyles({
    span:{
        marginTop:'-35px',
        marginBottom:'30px',
        color:'#6b2716'
    },
})

const DetailPage = () => {
    const classes = useStyles()
    const {productId} = useParams()

    return (
        <div>
            <MyCarousel/> 
            <Container>
            <Typography gutterBottom variant="h3" align="center" className={classes.span}>
                ____
            </Typography>
            <DetailContainer productId={productId}/>
            <FeaturesComponent/>
            <SignUpButton/>
            </Container>                              
        </div>
    )
}
export default DetailPage