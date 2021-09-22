import React from 'react'
import {Paper, makeStyles, Typography} from '@material-ui/core'
import Image  from '../../Imagenes/headphones_table.jpg'

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
    typography:{
          position: 'absolute',
          zIndex: 1,
          color: '#f5f5f5',
          top: 200,
          paddingLeft:'53px'
      },
})

const BannerComponentCart = () => {
    const classes = useStyles()

    return (
        <Paper className={classes.paperContainer} square={true} elevation={12}>          
            <Typography className={classes.typography} variant='h2'>
                Shopping Cart.
            </Typography>    
        </Paper>
    )
}
export default BannerComponentCart