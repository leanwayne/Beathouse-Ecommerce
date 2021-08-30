import React from 'react'
import {Typography, Container, Box, Grid, makeStyles} from '@material-ui/core'
import Image1 from '../../Imagenes/headphones.png'
import Image2 from '../../Imagenes/sound-waves.png'
import Image3 from '../../Imagenes/earbuds.png'

const useStyles = makeStyles({
    media: {
        width: 100,
        margin:'auto',
        marginBottom:'30px',       
    },
    img: {
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
    }, 
    margin:{
        marginTop:'50px',
    }
  })

const FeaturesComponent = () => {
    const classes = useStyles()

    return (
        <Container className={classes.margin}>
            <Grid container className={classes.margin}>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.margin}>
                    <Container>
                        <Box className={classes.media}>
                            <img className={classes.img} alt='complex' src= {Image1}/>
                        </Box>
                        <Typography gutterBottom align='center' variant='h5' color='secondary-ligth'>
                            Immersive System
                        </Typography>
                        <Typography gutterBottom align='center' variant='body1' color='secondary-ligth'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, animi aut. In eligendi soluta dolore fugiat praesentium perspiciatis recusandae, tempore nisi et eos? Aperiam deleniti odio natus maiores corporis minus.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.margin}>
                    <Container>
                        <Box className={classes.media}>
                            <img className={classes.img} alt='complex' src= {Image2}/>
                        </Box>
                        <Typography gutterBottom align='center' variant='h5' color='secondary-ligth'>
                            High Quality Sound
                        </Typography>
                        <Typography gutterBottom align='center' variant='body1' color='secondary-ligth'>
                            Aspernatur, animi aut. In eligendi soluta dolore fugiat praesentium perspiciatis recusandae, tempore nisi et eos? Aperiam deleniti odio natus maiores corporis minus.
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.margin}>
                    <Container>
                        <Box className={classes.media}>
                            <img className={classes.img} alt='complex' src= {Image3}/>
                        </Box>
                        <Typography gutterBottom align='center' variant='h5' color='secondary-ligth'>
                            Best Design
                        </Typography>
                        <Typography gutterBottom align='center' variant='body1' color='secondary-ligth'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, animi aut. In eligendi soluta dolore fugiat praesentium perspiciatis recusandae, tempore nisi et eos? Aperiam deleniti odio natus maiores corporis minus.
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
      </Container>
    )
}

export default FeaturesComponent