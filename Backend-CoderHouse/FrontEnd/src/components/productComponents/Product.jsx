import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 300,
  },
});

export default function Product({productData}) {
  const classes = useStyles();
  const dataImg = productData.fotoUrl

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Box m={1}>
        <Card className={classes.root}>
          <CardActionArea href= {`/catalogue/productDetail/${productData._id}`}>
            <CardMedia
              className={classes.media}
              image={`data:image/jpeg;base64,${dataImg}`}
              title={productData.nombre}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {productData.nombre}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                ${productData.precio}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Grid>
  );
}