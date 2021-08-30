import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
  }));

const HeadphoneB = () => {
    const classes = useStyles()

    return (
        <Button color="inherit" className={classes.button} href='/catalogue/Headphones'>Headphones</Button>
    )

}
export default HeadphoneB