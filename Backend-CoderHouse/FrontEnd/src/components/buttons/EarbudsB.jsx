import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
  }));

const EarbudsB = () => {
    const classes = useStyles()

    return (
        <Button color="inherit" className={classes.button} href="/catalogue/Earbuds">Earbuds</Button>
    )

}
export default EarbudsB