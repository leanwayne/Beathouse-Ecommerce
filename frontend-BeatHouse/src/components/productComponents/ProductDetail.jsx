import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Container, Grid, Typography, CardMedia, Divider} from '@material-ui/core'
import AccordinateButton from '../decorationComponents/AccordinateButton'
import SelectionContainer from './selectionContainer/SelectionContainer'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 750,
        backgroundSize: 'contain',
    },
    paper: {
        height: 'auto',
        padding: theme.spacing(2),
        margin: 'auto',
        width: 'auto',
    },
    margin:{
        marginTop: theme.spacing(3),
    },
}))

const ProductDetail = ({product}) => {
    const classes = useStyles()

    return (
        <>
            {product && (
                <Paper elevation={15} className={classes.paper}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CardMedia
                                className={classes.media}
                                image={`data:image/jpeg;base64,${product.photoUrl}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} container>
                            <Grid item xs={12}>
                                <Container>
                                    <Typography paragraph variant='h3' color='initial' align='left'>
                                        {product.name}
                                    </Typography>
                                    <Typography paragraph variant='h4' color='initial' align='left'>
                                        ${product.price}
                                    </Typography>
                                </Container>
                                <Divider variant='middle'/>
                                <AccordinateButton expand={'panel1'} description={product.description} title={'Description'}/>
                                <AccordinateButton expand={'panel1'} description={product.brand} title={'Brand'}/>
                                <Divider variant='inset' className={classes.margin}/>
                                <SelectionContainer productCode={product.productCode}/>
                            </Grid>
                        </Grid>
                    </Grid>              
                </Paper>
            )}
        </>
    )
}
export default ProductDetail