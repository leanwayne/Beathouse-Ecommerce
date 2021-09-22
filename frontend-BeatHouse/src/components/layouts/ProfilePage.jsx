import React, {useContext} from 'react'
import {Avatar, Button, Link, Paper, Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container} from '@material-ui/core'
import HeadsetIcon from '@material-ui/icons/Headset'
import {withStyles, makeStyles} from '@material-ui/core/styles'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'
import Image from '../../Imagenes/beatHouseLogo.jpg'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

function Copyright() {
  return (
      <Typography variant='body2' color='textSecondary' align='center'>
          {'Copyright © '}
          <Link color='inherit' href='https://material-ui.com/'>
              BeatHouse by Leandro Lopez
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    logo: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        backgroundImage: `url(${Image})`,
        height: 250,
        width: 250,
        backgroundSize: 'cover',
    },
    span:{
        marginTop:'-35px',
        color:'#6b2716'
    },
    table: {
        minWidth: 600,    
    },
    button: {
        marginTop: theme.spacing(4),
        backgroundColor: 'black'
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),
    },
}))

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow)

const ProfilePage = () => {
    const classes = useStyles()
    const history = useHistory()
    const {user, setAuthChange, authChange} = useContext(AuthContext)

    const signOff = () => {
        fetch(`http://localhost:8080/session/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setAuthChange(authChange+1)
            history.push('/')
        })
        .catch((err) =>{
            console.log('error', err)
        })  
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={false} sm={4} md={3} className={classes.image}/>
            <Grid item xs={12} sm={8} md={9} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <HeadsetIcon/>
                    </Avatar>
                    <Typography variant='h4'>
                        {`Welcome ${user.username}!`}
                    </Typography>
                    <Typography variant='h3' className={classes.span}>
                        _____
                    </Typography>
                    <Paper className={classes.logo}  elevation={8}/>  
                    <Typography variant='h5'>
                        Shopping History
                    </Typography>
                    <Typography paragraph variant='h3' className={classes.span}>
                        _____
                    </Typography>
                    <Container>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Product</StyledTableCell>
                                        <StyledTableCell align="left">Color</StyledTableCell>
                                        <StyledTableCell align="left">Quantity</StyledTableCell>
                                        <StyledTableCell align="left">Order code</StyledTableCell>
                                        <StyledTableCell align="left">Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.buyOrders.map((order) => (
                                        <StyledTableRow key={order.product.name}>
                                            <StyledTableCell component='th' scope='row'>
                                                {order.product.name}
                                            </StyledTableCell>
                                            <StyledTableCell aligh='right'>{order.product.color}</StyledTableCell>
                                            <StyledTableCell aligh='right'>{`x${order.product.quantity}`}</StyledTableCell>
                                            <StyledTableCell aligh='right'>{order.buyer.orderCode}</StyledTableCell>
                                            <StyledTableCell aligh='right'>{order.date}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>                     
                    <Button 
                        variant='contained'
                        size='large'
                        color='primary'
                        className={classes.button}
                        onClick={signOff}
                    >
                        end session
                        <ExitToAppIcon className={classes.extendedIcon}/>
                    </Button>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    )
}
export default ProfilePage