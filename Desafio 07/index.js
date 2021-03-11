import express from "express";
import fs from "fs";

const app = express();
const arrProducts = JSON.parse(fs.readFileSync("./productos.txt", "utf-8")) 
let countA = 0
let countB = 0

app.get("/items", (req, res) => {  
  countA += 1
  const arr = arrProducts.map(product =>{ 
    return product.title
   })
  res.send({items:arr,cantidad:arrProducts.length})
});

app.get("/item-random", (req, res) => {
  countB += 1
  res.send({item:arrProducts[Math.floor(Math.random() * (arrProducts.length - 1)  )]});
});

app.get("/visitas", (req, res) => {
  res.send({visitas:{items:countA,item:countB}});
});

const server = app.listen(8080, () => {
  console.log("Running");
})
server.on("error", error => console.log("Error en el servidor"+error))
