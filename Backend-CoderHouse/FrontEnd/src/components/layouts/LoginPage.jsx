import React, {useState, useContext} from "react";
import { FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, InputLabel, Input, FormHelperText, Button, Grid } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [changeForm, setChangeForm] = useState(false)
    const [open, setOpen] = useState(false);
    const {log} = useContext(AuthContext);
    const history = useHistory();

    const logIn = () => {
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
                history.push('/logged')
            })
            .catch(err =>{
                if(!open)setOpen(true) 
                console.log("error" , err)})
    };
    const logInFacebook = () => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        };
        fetch("http://localhost:8080/session/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("fetch post completado FACEBOOK", data)
                history.push('/logged')
            })
            .catch(err =>{
                if(!open)setOpen(true) 
                console.log("error" , err)})
    };

    const register = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({username: user, password: password})
        };
        fetch("http://localhost:8080/session/register", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("fetch post completado", data.passport)
                history.push('/logged')
            })
            .catch(err =>{
                if(!open)setOpen(true) 
                console.log("error" , err)})
    };

    const handleClose = () => {
        setUser("")
        setPassword("")
        setOpen(false);
      };

    const swipeToRegister = () => {
        setChangeForm(true)
    }
    
    const swipeToLogIn = () => {
        setChangeForm(false)
    } 

    return (
        <Container maxWidth="md">
            {!log?(
                <Grid container>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="">Nombre</InputLabel>
                            <Input id="username" aria-describedby="username-helper-text" onInput={(event) => setUser(event.target.value)} />
                            <FormHelperText id="username-helper-text">
                                Ingrese su nombre
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="">password</InputLabel>
                            <Input id="password" aria-describedby="password-helper-text" onInput={(event) => setPassword(event.target.value)} />
                            <FormHelperText id="password-helper-text">
                                Ingrese su password
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    {!changeForm?
                    (
                        <>
                        <Grid item md={12}>
                            <Button variant="contained" color="primary" onClick={logIn}>
                                Iniciar Sesion
                            </Button>
                        </Grid>
                        <Grid item md={12}>
                            <Button variant="contained" color="primary" href="http://localhost:8080/session/facebook">
                                Iniciar Sesion con Facebook
                            </Button>
                        </Grid>
                        </>                        
                    ):
                    (
                        <Grid item md={12}>
                            <Button variant="contained" color="primary" onClick={register}>
                                Crear cuenta
                            </Button>
                        </Grid>
                    )
                    }
                    {!changeForm?
                     (                      
                        <Grid item md={12}>
                            No tienes cuenta?
                            <Button  color="primary" onClick={swipeToRegister}>
                                registrate
                            </Button>
                        </Grid>
                     ):
                     (
                        <Grid item md={12}>
                        Tienes cuenta?
                        <Button  color="primary" onClick={swipeToLogIn}>
                            ingresar
                        </Button>
                    </Grid>
                     )
                    }
                </Grid>
            ):(
                <>
                <h1>Usted ya esta logeado!</h1>
                </>
                )}
            {open?(               
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                    {!changeForm?
                        (
                            <>
                            <DialogTitle id="alert-dialog-title">{"Error al intentar Logearse"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                El Usuario o la Clave son incorrectos
                            </DialogContentText>
                            </DialogContent>
                            </>
                        ):(
                            <>
                            <DialogTitle id="alert-dialog-title">{"Error al intentar Registrarse"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                El Usuario ya esta registrado
                            </DialogContentText>
                            </DialogContent>
                            </>
                        )
                    }   
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Volver a Intentar
                        </Button>
                    </DialogActions>
                </Dialog>
                ):(<></>)}
        </Container>
    );
}
