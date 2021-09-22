import React, {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
}))

const MyCarousel = () => {
    const classes = useStyles()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8080/carousel/getItems', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setItems(data)
            setLoading(false)
        })
        .catch((err) =>{
            console.log('error', err)
        })         
    }, [])

    if(loading){
        return (
           <Grid container justifyContent='center' alignItems='center' className={classes.media}>
               <CircularProgress size={150} className={classes.media}/>
           </Grid>
       )
    }

    return (
        <Carousel animation='slide'>
            {items.map( (item, i) => <CarouselItem key={i} item={item}/>)}
        </Carousel>
    )
}
export default MyCarousel