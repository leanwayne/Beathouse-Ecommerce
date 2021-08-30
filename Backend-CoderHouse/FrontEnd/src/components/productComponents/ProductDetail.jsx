import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Container, Grid, Typography, CardMedia, Divider,} from '@material-ui/core'
import AccordinateButtonOPEN from '../decorationComponents/AccordinateOPEN'
import SelectionContainer from './selectionContainer/SelectionContainer'

const useStyles = makeStyles((theme) => ({
    media: {
        height: 750,
        backgroundSize: 'contain'
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
    [theme.breakpoints.down('sm')]: {
        fontSize: 10,
    },
}))

const ProductDetail = ({product}) => {
    const classes = useStyles();

    return (
        <>
            {product && (
                <Paper elevation={15} className={classes.paper}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <CardMedia
                                className={classes.media}
                                image={`data:image/jpeg;base64,${product.fotoUrl}`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} container>
                            <Grid item xs={12}>
                                <Container>
                                <Typography paragraph variant='h3' color='initial' align='left'>
                                    {product.nombre}
                                </Typography>
                                <Typography paragraph variant='h4' color='initial' align='left'>
                                    ${product.precio}
                                </Typography>
                                </Container>
                                <Divider variant='middle' />
                                <AccordinateButtonOPEN expand={'panel1'} description={product.descripcion} title={'Description'}/>
                                <AccordinateButtonOPEN expand={'panel1'} description={product.marca} title={'Brand'}/>
                                <Divider variant='inset' className={classes.margin}/>
                                <SelectionContainer productCode={product.codigoP}/>
                            </Grid>                   
                        </Grid>
                    </Grid>                             
                </Paper>
            )} 
        </>
    )    
}
 
export default ProductDetail