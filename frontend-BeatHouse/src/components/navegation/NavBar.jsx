import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, useScrollTrigger, Slide, Hidden} from '@material-ui/core'
import ProductButton from '../buttons/ProductButton'
import CartButton from '../buttons/CartButton'
import AccountButton from '../buttons/AccountButton'
import MenuButton from '../buttons/MenuButton'
import MenuDrawer from './MenuDrawer'
import {useHistory} from "react-router-dom"

const HideOnScroll = (props) => {
    const {children, window} = props
    const trigger = useScrollTrigger({target: window ? window() : undefined})
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 160,
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
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const openDrawer = () => {
        setOpen(!open)
    }

const logo = () => {
    history.push('/')
}    

    return (
        <div className={classes.root}>
            <HideOnScroll>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                          <Hidden mdUp>
                              <MenuButton openDrawer={openDrawer}/>
                          </Hidden>
                        <Typography variant="h4" className={classes.title} onClick={logo}>
                            BEATHOUSE
                        </Typography>
                        <Hidden smDown>
                            <ProductButton name={'HeadPhones'} url={'/catalogue/Headphones'}/>
                            <ProductButton name={'Earbuds'} url={'/catalogue/Earbuds'}/>
                            <AccountButton/>
                        </Hidden>
                        <MenuDrawer open={open} close={openDrawer}/>
                        <CartButton/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    )
}
export default NavBar