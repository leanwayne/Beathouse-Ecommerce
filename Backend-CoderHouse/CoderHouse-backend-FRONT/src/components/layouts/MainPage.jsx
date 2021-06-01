import React, {useContext } from "react";
import {Container, Button, Grid, Typography} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function MainPage() {
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
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            {user && (
                <Typography>
                    {`bienvenido ${user}`}
                </Typography>
              )}
            <Button variant="contained" color="primary" onClick={logOut}>
              <NavLink to={'/logOut'}>Cerrar sesion</NavLink>
            </Button>
          </Grid>
        </Grid>
      </Container>
  );
}