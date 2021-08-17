import React, {useEffect, useContext, useState} from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import HeadsetIcon from '@material-ui/icons/Headset';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BeatHouse by Leandro Lopez
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInPage() {
  const classes = useStyles();
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const signIn = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({username: user, password: password})
    };
    fetch("http://localhost:8080/session/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("fetch post completado", data.passport.user)
        history.push('/')
      })
      .catch(err =>{
        if(!open)setOpen(true)
        console.log("ERRROOOORRRRRRRRRRRRRRRRRR" , err)})
  };

  const handleClose = () => {
    setUser("")
    setPassword("")
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HeadsetIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <TextField
                onInput={(event) => setUser(event.target.value)}
                variant="outlined"
                margin="normal"
                inputProps={{maxLength: 50}}
                required
                fullWidth
                value={user}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
            />
            <TextField
                onInput={(event) => setPassword(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                value={password}
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={signIn}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           </form>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
      {open?(
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >                              
            <DialogTitle id="alert-dialog-title">{"Sign in Error"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Invalid Username or Password
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Try again
                </Button>
              </DialogActions>
          </Dialog>
            ):(null)
      }
    </Grid>
  );
}