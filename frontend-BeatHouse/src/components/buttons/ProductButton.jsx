import React from 'react'
import {Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
  }))

const ProductButton = ({name, url}) => {
    const classes = useStyles()

    return (
        <Button color='inherit' className={classes.button} href={url}>{name}</Button>
    )
}
export default ProductButton