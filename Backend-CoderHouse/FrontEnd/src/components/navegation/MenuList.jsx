import React from 'react'
import { makeStyles, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import HeadphoneB from '../buttons/HeadphoneB';
import EarbudsB from '../buttons/EarbudsB';
import CartB from '../buttons/CartB';
import AccountB from '../buttons/AccountB';


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1)
    },
  }));

const MenuList = () => {
    const classes = useStyles();

    return (  
        <List component='nav'>
            <ListItem button divider='true'>
                <HeadphoneB/>
            </ListItem>
            <ListItem button divider='true'>
                <EarbudsB/>
            </ListItem>
            <ListItem button divider='true'>
                <AccountB/>
                <ListItemText className={classes.menuButton}>
                    Account
                </ListItemText>
            </ListItem>
            <ListItem button divider='true'>
                <CartB/>
            </ListItem>
        </List>            
    )

}

export default MenuList