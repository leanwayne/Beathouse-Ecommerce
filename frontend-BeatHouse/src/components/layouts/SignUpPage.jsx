import React, {useState, useContext} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import ProfilePage from './ProfilePage'
import {AuthContext} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'

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

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const SignUpPage = () => {
    const classes = useStyles()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const {logged} = useContext(AuthContext)
    const history = useHistory()

    const signUp = () => {
        const reg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)
        if(reg){
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({username: user, password: password, email: email})
            }
            fetch('http://localhost:8080/session/register', requestOptions)
            .then(response => response.json())
            .then(data => {
                history.push('/')
            })
            .catch(err =>{
                setError(true)
                setErrorText('This email is already register')         
                setPassword('')
                console.log('ERROR', err)
            })
        }else {
            setError(true)
            setErrorText('Invalid Email')     
            setPassword('')
        }         
    }

    const setEmailValue = (event) => {
        setError(false)
        setEmail(event.target.value)
    }

    if(logged) return <ProfilePage/>

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete='username'
                                onChange={(event) => setUser(event.target.value)}
                                value={user}
                                inputProps={{maxLength: 50}}
                                name='UserName'
                                variant='outlined'
                                required
                                fullWidth
                                label='Username'
                                autoFocus
                            />
                      </Grid>
                      <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                onChange={(event) => setEmailValue(event)}
                                value={email}
                                inputProps={{maxLength: 100}}
                                required
                                fullWidth
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                error={error}
                                helperText={error? (errorText):(null)}
                            />
                      </Grid>
                      <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                onInput={(event) => setPassword(event.target.value)}
                                value={password}
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                autoComplete='current-password'
                            />
                      </Grid>
                      <Grid item xs={12}>
                          <FormControlLabel
                                control={<Checkbox value='allowExtraEmails' color='primary'/>}
                                label='I want to receive promotions and updates via email.'
                          />
                      </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={signUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link href={'/SignIn'} variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    )
}
export default SignUpPage