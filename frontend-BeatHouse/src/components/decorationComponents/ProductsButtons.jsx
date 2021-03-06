import React from 'react'
import {makeStyles, Typography, Container, Grid, ButtonBase} from '@material-ui/core'
import {NavLink} from 'react-router-dom';
import Image1 from '../../Imagenes/man-headphones.jpg'
import Image2 from '../../Imagenes/man-earbuds.jpeg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        marginTop:'50px',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
             height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const ProductsButtons = () => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>  
        <Grid container spacing={5}>  
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <NavLink to='/catalogue/Headphones'>   
                    <ButtonBase
                        focusRipple
                        key={'pepito'}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: '100%',
                             height: 400,
                        }}
                    >
                        <span className={classes.imageSrc} style={{ backgroundImage: `url(${Image1})`,}}/>
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="h4"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                Headphones
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                </NavLink>
            </Grid>     
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <NavLink to="/catalogue/Earbuds">
                    <ButtonBase
                        focusRipple
                        key={'pepito'}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: '100%',
                            height: 400,
                        }}
                    >
                        <span className={classes.imageSrc} style={{ backgroundImage: `url(${Image2})`,}}/>
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="h4"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                Earbuds
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                </NavLink>
            </Grid>
        </Grid> 
        </Container>
    )
}
export default ProductsButtons
