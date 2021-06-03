import React, {useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Button, Grid, Typography, Avatar} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const {user} = useContext(AuthContext);

  const logOut = () =>{
    fetch("http://localhost:8080/session/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
        })
        .catch((err) => console.log(err));
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            {user && (
                <Typography>
                    {`bienvenido ${user.username}`}
                </Typography>
              )}
            <Avatar alt={user.username} src={user.photo} />
            <Button variant="contained" color="primary" onClick={logOut}>
              <NavLink to={'/logOut'}>Cerrar sesion</NavLink>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>  
  );
}