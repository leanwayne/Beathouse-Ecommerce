import React from 'react'
import { makeStyles, Drawer, Divider} from '@material-ui/core';
import MenuList from './MenuList';

const useStyles = makeStyles((theme) => ({
    drawer:{
        width: 400,
        flexShrink: 0,
    },
    drawerpaper:{
        width: 225,
    },
    toolbar: theme.mixins.toolbar
  }));

const MenuDrawer = ({open, close}) => {
    const classes = useStyles();

    return (  
        <Drawer 
            className={classes.drawer}
            classes={{paper: classes.drawerpaper}}
            anchor= 'left'
            open={open}
            onClose={close}   
            variant= 'temporary'
        >
            <div className={classes.toolbar}/>
            <Divider/>
            <MenuList/>
        </Drawer>            
    )

}

export default MenuDrawer