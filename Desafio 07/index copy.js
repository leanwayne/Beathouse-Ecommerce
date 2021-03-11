import { resolveSoa } from "dns";
import express from "express";
import fs from "fs";
import { Server } from "http";
const app = express();

async function readFile(path) {
  return await fs.promises.readFile(path, "utf-8")  
}
const arrProducts = JSON.parse(fs.readFileSync("./productos.txt", "utf-8")) 


app.get("/items", (req, res) => {  
  const arr = arrProducts.map(product =>{ 
    return product.title
   })
  res.send({items:arr,cantidad:arrProducts.length})
});



app.get("/item-random", (req, res) => {
  res.send("desde express");
});

app.get("/visitas", (req, res) => {
  res.send("desde expresssssss");
});

const server = app.listen(8080, () => {
  console.log("Running");
})
server.on("error", error => console.log("Error en el servidor"+error))
