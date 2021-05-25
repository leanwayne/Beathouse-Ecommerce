import React, {useState} from "react";
import { FormControl, Container, InputLabel, Input, FormHelperText, Button, Grid } from '@material-ui/core';
import {useHistory} from "react-router-dom";


export default function LoginPage() {
    const [user, setUser] = useState('')
    const history = useHistory();

    const logIn = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({nombre: user})
        };
        fetch("http://localhost:8080/productos/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("fetch post completado", data)
                history.push('/logged')
            })
            .catch(err =>{console.log("error" , err)})
    };

    return (
        <Container maxWidth="md">
            <Grid container>
                <Grid item md={12}>
                    <FormControl>
                        <InputLabel htmlFor="">Nombre</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={(event) => setUser(event.target.value)} />
                        <FormHelperText id="my-helper-text">
                            Ingrese su nombre para iniciar sesion
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <Button variant="contained" color="primary" onClick={logIn}>
                        Iniciar Sesion
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
