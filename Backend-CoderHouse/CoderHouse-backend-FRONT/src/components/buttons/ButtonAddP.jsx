import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ButtonAddP() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [stock, setStock] = useState(0)
  const [foto, setFoto] = useState("")
  
  const guardarProducto = () => {
    setOpen(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nombre: nombre,
        precio: precio,
        foto: foto,
        descripcion: descripcion,
        stock: stock,
      })
    };
    fetch("http://localhost:8080/productos/agregar", requestOptions)
        .then(response => response.json())
        .then(data => { console.log("fetch post completado", data)})
        .catch(err =>{ console.log("error" , err)})
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Agregar Producto
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar nuevo producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete los campos para registrar el nuevo producto 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            onChange={(event) => setNombre(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="precio"
            label="Precio"
            type="number"
            fullWidth
            onChange={(event) => setPrecio(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="descripcion"
            label="Descripcion"
            type="text"
            fullWidth
            onChange={(event) => setDescripcion(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="foto"
            label="Link de imagen"
            type="text"
            fullWidth
            onChange={(event) => setFoto(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
            onChange={(event) => setStock(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={guardarProducto} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
