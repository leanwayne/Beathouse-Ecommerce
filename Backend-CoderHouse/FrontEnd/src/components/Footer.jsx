import React from 'react'
import {Paper, makeStyles, Typography, Container, Box, Grid} from '@material-ui/core'

const useStyles = makeStyles({
    paperContainer1: {
        backgroundColor:'#212121',
        height: 200,
        zIndex: 0
    },
    paperContainer2: {
        backgroundColor:'black',
        height: 80,
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
  })

export default function Footer() {
    const classes = useStyles()
    return (
        <div>
            <Paper className={classes.paperContainer1} square={true}>               
            </Paper>
            <Paper className={classes.paperContainer2} square={true}>               
            </Paper> 
        </div>
    )
}
