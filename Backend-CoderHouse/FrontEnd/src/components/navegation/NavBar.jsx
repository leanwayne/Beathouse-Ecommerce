import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, useScrollTrigger, Slide, Hidden} from '@material-ui/core'
import HeadphoneB from '../buttons/HeadphoneB'
import EarbudsB from '../buttons/EarbudsB'
import CartB from '../buttons/CartB'
import AccountB from '../buttons/AccountB'
import MenuB from '../buttons/MenuB'
import MenuDrawer from './MenuDrawer'

const HideOnScroll = (props) => {
    const {children, window} = props
    const trigger = useScrollTrigger({target: window ? window() : undefined})
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 160,
    },
    menuButton: {
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(2)
    },
    appBar:{
        height: 80
    },
}))

const NavBar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const openDrawer = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                          <Hidden mdUp>
                              <MenuB openDrawer={openDrawer}/>
                          </Hidden>
                        <Typography variant="h4" className={classes.title}>
                            BEATHOUSE
                        </Typography>
                        <Hidden smDown>
                            <HeadphoneB/>
                            <EarbudsB/>
                            <AccountB/>
                        </Hidden>
                        <MenuDrawer open={open} close={openDrawer}/>
                        <CartB/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    )
}
export default NavBar