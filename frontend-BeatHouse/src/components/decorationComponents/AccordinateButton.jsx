import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

const AccordinateButton = ({expand, description, title}) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState('panel1')

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    return (
        <div className={classes.root}>
            <Accordion square expanded={expanded === expand} onChange={handleChange(expand)} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography variant="h5">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='h6'>
                        {description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
      </div>
    )
}
export default AccordinateButton