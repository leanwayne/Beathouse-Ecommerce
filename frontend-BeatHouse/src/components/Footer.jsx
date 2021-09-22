import React from 'react'
import {Paper, makeStyles, Typography, Container, Grid, Link, IconButton} from '@material-ui/core'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles((theme) => ({
    paperContainer1: {
        backgroundColor:'#212121',
        height: 200,
    },
    paperContainer2: {
        backgroundColor:'black',
        height: 80,
    },
    typography:{
        paddingTop: theme.spacing(4),
    },
    grid: {
        paddingTop: theme.spacing(6)
    },
    container: {
        display:'flex',
        justifyContent: 'center',
    },
}))

export default function Footer() {
    const classes = useStyles()

    return (
        <div>
            <Paper className={classes.paperContainer1} square={true}>
                <Container>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item xs={12} className={classes.grid}>
                            <Typography gutterBottom align='center' color='secondary' variant='h5'>
                                BEATHOUSE
                            </Typography>
                            <Typography align='center' color='secondary' variant='subtitle2'>
                                A demo ecommerce project build  with the MERN Stack for my portfolio, hope you like it! :)
                            </Typography>
                            <Container className={classes.container}>
                                <IconButton color='secondary' href={'https://www.linkedin.com/in/leandro-lopez-catalini-9628b21a2/'}>
                                    <LinkedInIcon/>
                                </IconButton>
                                <IconButton color='secondary' href={'https://github.com/leanwayne'}>
                                    <GitHubIcon/>
                                </IconButton>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Paper className={classes.paperContainer2} square={true}>
                <Typography variant='body2' color='Secondary' align='center' className={classes.typography}>
                    {'Copyright © '}
                    <Link color='inherit' href='https://material-ui.com/'>
                        BeatHouse by Leandro Lopez
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Paper>
        </div>
    )
}