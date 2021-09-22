import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 110,
    },
}))

const ColorSelector = ({products, setColor}) => {
    const classes = useStyles()
    const [state, setState] = useState('')

    const handleChange = (event) => {
        setState(event.target.value)
        setColor(event.target.value)
    }

    return (
        <div>
            {products && (
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Select color</InputLabel>
                    <Select
                        native
                        value={state}
                        onChange={handleChange}
                        label='Select color'
                    >
                        <option aria-label='None' value='readonly'/>
                        {products.map(p => <option value={p.color}>{p.color}</option>)}
                    </Select>
                </FormControl>
            )}
        </div>
    )
}
export default ColorSelector