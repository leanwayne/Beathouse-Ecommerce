import React from 'react'
import {makeStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    media: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'colum',
        justifyContent: 'center',
    },
}))

const PurchaseDialog = ({successfulOrder, setSuccessfulOrder, failedOrder, setFailedOrder, successData, failedData}) => {
    const classes = useStyles()
    const history = useHistory()

    const handleCloseSuccess = () => {
        setSuccessfulOrder(false)
        history.push('/SignIn')
    }

    const handleCloseFail = () => {
        setFailedOrder(false)
    }

    return (
        <>
            {successfulOrder &&(
                <Dialog
                    fullWidth={true}
                    open={successfulOrder}
                    onClose={handleCloseSuccess}
                >                              
                    <DialogTitle className={classes.media}>
                        <CheckCircleIcon/>
                    </DialogTitle>
                    <DialogTitle>
                        <Typography variant="h4" align="center">
                            ¡Your purchase order was completed successfully!
                        </Typography>
                    </DialogTitle>
                    <DialogTitle className={classes.media}>
                    {successData &&(
                        `Ordercode: ${successData.orderCode}`
                        )}
                        </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" align="center">
                            Thanks for trying Beathouse Ecommerce.
                            This page was made with the MERN stack, hope you like it! :)
                        </Typography>
                    </DialogContent>
                    <DialogActions className={classes.media}>
                        <Button color='primary' href={'/SignIn'}>
                            Go to Profile page.
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {failedOrder &&(
                <Dialog
                    open={failedOrder}
                    onClose={ handleCloseFail}
                >                              
                    <DialogTitle className={classes.media}>
                        <CancelIcon/>
                    </DialogTitle>
                    <DialogTitle>
                        <Typography variant="h4" align="center">
                            ¡Ups! Currently we don't have enough stock for the following products
                        </Typography>
                    </DialogTitle>
                    <DialogTitle className={classes.media}>
                        {failedData.map(p => `${p.product.name} color: ${p.product.color} `)}
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" align="center">
                            Please decrease the quantity or come back when we renew the stock
                        </Typography>
                    </DialogContent>
                    <DialogActions className={classes.media}>
                        <Button color='primary' href={'/SignIn'}>
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}
export default PurchaseDialog