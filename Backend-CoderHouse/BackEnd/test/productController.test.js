const assert = require("assert");
const axios = require("axios");
const expect = require('chai').expect

const url = 'http://localhost:8080/productos';

const mostrarProductos = () => axios.get(`${url}/listar`)

const mostrarProductoPorIDoNombre = (id,nombre) => axios.get(`${url}/listarid`,{
    params:{
        id:id,
        nombre:nombre
    }
})

const guardarProducto = (nombre,precio,fotoUrl,color,stock) => axios.post(`${url}/agregar`,{
    nombre:nombre,
    precio:precio,
    fotoUrl:fotoUrl,
    color:color,
    stock:stock,
})

describe('Comprobar funcionalidad de las rutas de productos', function(){
    this.timeout(8000)
   it('guardar producto en la DataBase', async () => {
        let res
        try {
            res = await guardarProducto("testproduct",20,"foto","color",20)
        } catch (error) {
        }
        expect(res.status).to.equal(200) 
        expect(res.data).to.be.a('object')
    })

    it('mostrar productos de la dataBase', async () => {    
        let res
        try {
            res = await mostrarProductos()
        } catch (error) {      
        }
        expect(res.status).to.equal(200)
        expect(res.data).to.be.a('array')
        
    })

    it('buscar el producto "testproduct" y actualizarlo en la dataBase', async () => {  
        let res
        try {
            let product = await mostrarProductoPorIDoNombre(null,"testproduct") 
            res = await axios.put(`${url}/actualizar/?id=${product.data[0]._id}`,{ nombre:"testNombre" })            
        } catch (error) {  
        }     
        expect(res.status).to.equal(200)
        expect(res.data).to.be.a('object')
    })

    it('borrar producto de la dataBase', async () => {    
        let res   
        try {
            let product = await mostrarProductoPorIDoNombre(null,"testNombre")
            res = await axios.delete(`${url}/borrar/?id=${product.data[0]._id}`)   
        } catch (error) {
        }
        expect(res.status).to.equal(200)
    })

});