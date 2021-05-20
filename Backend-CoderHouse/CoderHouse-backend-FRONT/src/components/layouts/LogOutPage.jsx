import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";


export default function MainPage() {
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const interval = setInterval(()=>{
            setFlag(true)
        },3000)
        return () => clearInterval(interval)    
    },[])
    if(flag === true){    
        return <Redirect to = "/"></Redirect>
    }
 
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item md={12}>
            Sesion terminada, hasta pronto!
        </Grid>
      </Grid>
    </Container>
  );
}