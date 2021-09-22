import React from 'react'
import {Paper, Typography, makeStyles, CardMedia} from '@material-ui/core'

const useStyles = makeStyles({
    paperContainer: {
        height: 450,
    },
    typography1:{
        position: 'absolute',
        zIndex: 1,
        color: '#f5f5f5',
        top: 180,
        paddingLeft:'53px',
    },
    typography2:{
        position: 'absolute',
        zIndex: 1,
        color: '#f5f5f5',
        top: 390,
        paddingLeft:'60px',
    },
  })

const CarouselItem = ({item}) => {
    const classes = useStyles()
    const dataImg = item.image
    return (
        <Paper square={true}>          
            <CardMedia
                className={classes.paperContainer}
                image={`data:image/jpeg;base64, ${dataImg}`}
            />
            <Typography className={classes.typography1} variant='h2'>
                {item.title}
            </Typography>
            <Typography className={classes.typography2} variant='h6'>
                {item.description}
            </Typography>     
        </Paper>       
    )
}
export default CarouselItem