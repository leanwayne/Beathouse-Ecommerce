import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {Grid, Box} from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 280,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    },
})

const Product = ({productData}) => {
    const classes = useStyles()
    const dataImg = productData.photoUrl

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box m={1}>
                <Card className={classes.root}>
                    <CardActionArea href= {`/catalogue/productDetail/${productData._id}`}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${dataImg}`}
                            title={productData.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align="center">
                                {productData.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2" align="center">
                                ${productData.price}
                            </Typography>
                            <Typography noWrap variant="body2" color="textSecondary" align="center">
                                {productData.brand}
                            </Typography>
                        </CardContent>
                  </CardActionArea>
                </Card>
            </Box>
        </Grid>
    )
}
export default Product