import React, {useState} from 'react'
import { makeStyles, IconButton, drawer, Drawer, Divider} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    root: {
        display: 'flex',
    },
    fullList: {
        width: 'auto',
    },
    drawer:{
        width: 420,
        flexShrink: 0,
    },
    drawerpaper:{
        width: 420,
    },
    toolbar: theme.mixins.toolbar
  }));

const MenuB = ({openDrawer}) => {
    const classes = useStyles()
    return (
        <>
            <IconButton color="inherit" className={classes.button} onClick={openDrawer}>            
                <MenuIcon/>        
            </IconButton>
        </>   
    )

}
export default MenuB