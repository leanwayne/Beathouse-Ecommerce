import React, { useState, useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export default function LogOutPage() {
    const [flag, setFlag] = useState(false);
    const {setLog} = useContext(AuthContext);
    useEffect(() => {
        const interval = setInterval(()=>{
            setFlag(true)
            setLog(false)
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