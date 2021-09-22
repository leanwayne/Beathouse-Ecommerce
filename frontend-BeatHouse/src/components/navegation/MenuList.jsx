import React from 'react'
import {makeStyles, List, ListItem, ListItemText} from '@material-ui/core'
import ProductButton from '../buttons/ProductButton'
import CartButton from '../buttons/CartButton'
import AccountButton from '../buttons/AccountButton'


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1)
    },
}))

const MenuList = () => {
    const classes = useStyles()

    return (  
        <List component='nav'>
            <ListItem button divider='true'>
                <ProductButton name={'HeadPhones'} url={'/catalogue/Headphones'}/>
            </ListItem>
            <ListItem button divider='true'>
                <ProductButton name={'Earbuds'} url={'/catalogue/Earbuds'}/>
            </ListItem>
            <ListItem button divider='true'>
                <AccountButton/>
                <ListItemText className={classes.menuButton}>
                    Account
                </ListItemText>
            </ListItem>
            <ListItem button divider='true'>
                <CartButton/>
            </ListItem>
        </List>            
    )
}
export default MenuList