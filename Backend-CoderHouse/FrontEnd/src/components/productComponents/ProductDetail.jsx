import React, { useState, useEffect, } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Paper, Box, Container, Grid, Typography, Fab } from '@material-ui/core';

const productMock = [   
    {
      id: "1",
      title: "jean negro Urban",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium illo a ad dolorem quas quos aliquam quidem numquam reiciendis maxime laboriosam, tempora sint, cumque praesentium voluptatem quasi voluptatum incidunt cum?",
      price: 800,
      pictureUrl:
        "https://http2.mlstatic.com/D_NQ_NP_650191-MLA31114378252_062019-O.webp",
    },
]

const useStyles = makeStyles((theme) => ({
    media: {
        height: 550,
        width: 550,        
    },
      img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },  
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1200,
    },
  }));

const ProductDetail = () => {
    const classes = useStyles();

    return (
        <div>
        <Paper elevation={12} className={classes.paper} >
            <Container>              
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Container className={classes.media} title="imagen producto" >
                                <img className={classes.img} alt="complex" src="https://http2.mlstatic.com/D_NQ_NP_2X_996387-MLA31646486428_072019-F.webp" />
                            </Container>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} container >
                        <Grid xs={12}  spacing={1}>
                            <Grid item xs={12} >
                                <Typography variant="h3" color="initial" align="left"  >
                                    Nombre del Producto
                                </Typography>
                                <Typography variant="h5" color="initial" align="left"  >
                                    $350
                                </Typography>
                            </Grid>
                            <Grid xs={12} container direction="column" justify="flex-end" alignItems="flex-end">
                                <Fab variant="extended" size="medium" color="primary" aria-label="add"  align="">
                                    Agregar al Carrito {<ShoppingCartIcon/>}
                                </Fab>
                            </Grid>                      
                        </Grid>
                    </Grid>
                </Grid>                             
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid sunt, dolorum vitae obcaecati praesentium facilis eligendi necessitatibus vel aliquam cupiditate libero iure asperiores maxime nemo culpa tenetur ducimus ad nisi!"
            </Container>      
        </Paper>
        </div>
    )    
}
 
export default ProductDetail;