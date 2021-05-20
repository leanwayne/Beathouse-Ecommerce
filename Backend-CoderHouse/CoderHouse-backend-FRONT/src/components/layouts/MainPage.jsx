import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function MainPage() {
  const { user , setUser } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8080/productos/login", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  },[]);
  if(!user){
    return <Redirect to={"/"}/>
  }
      
  const logOut = () =>{
    fetch("http://localhost:8080/productos/logout", {
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
        <Grid item md={12}>
          bienvenido {user}
          <Button variant="contained" color="primary" onClick={logOut}>
            <NavLink to={'/logOut'}>Cerrar sesion</NavLink>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
