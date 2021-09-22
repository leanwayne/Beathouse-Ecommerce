import React from 'react'
import {makeStyles, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
}))

const MenuB = ({openDrawer}) => {
    const classes = useStyles()

    return (
        <>
            <IconButton color='inherit' className={classes.button} onClick={openDrawer}>            
                <MenuIcon/>        
            </IconButton>
        </>   
    )
}
export default MenuB