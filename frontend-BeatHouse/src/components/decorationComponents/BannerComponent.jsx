import React from 'react'
import {Paper, makeStyles, Typography} from '@material-ui/core'
import Image  from '../../Imagenes/headphones_audio_sound_122152_2560x1440.jpg'

const useStyles = makeStyles({
    paperContainer: {
        backgroundImage: `url(${Image})`,
        height: 500,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachement: 'fixed',
        backgroundSize: 'cover', 
        position: 'relative',
        zIndex: 0
    },
    typography1:{
          position: 'absolute',
          zIndex: 1,
          color: '#f5f5f5',
          top: 200,
          paddingLeft:'53px'
      },
      typography2:{
          position: 'absolute',
          zIndex: 1,
          color: '#f5f5f5',
          top: 300,
          paddingLeft:'60px'
      },
  });

const BannerComponent = () => {
    const classes = useStyles()

    return (
          <Paper className={classes.paperContainer} square={true} elevation={12}>          
            <Typography className={classes.typography1} variant='h3'>
                ¡Welcome to BeatHouse!
            </Typography>
            <Typography className={classes.typography2} variant='h6'>
                A Demo ecommerce project build with the MERN Stack.<br/>
                Select products, place them in the cart and make a buy order!
            </Typography>     
          </Paper>
    )
}
export default BannerComponent