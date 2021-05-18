import React, { useState, useEffect } from "react";
import { Container, Button, Grid } from '@material-ui/core';
import { NavLink } from "react-router-dom";

export default function MainPage() {
    const [user, setUser] = useState("");
    const url = "http://localhost:8080/productos/login";
    useEffect(()=>{
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setUser(data) 
        console.log("DATA", data)
      })
      .catch(err => console.log(err));
    },[])
    console.log("NOMBRE USUARIO", user)
  return ( 
    <Container maxWidth="md">
      <Grid container>
        <Grid item md={12}> 
            bienvenido
            <Button variant="contained" color="primary">
                Cerrar Sesion
            </Button>
        </Grid>
      </Grid> 
    </Container>
  );
}
