import React, { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail"

export default function DetailContainer({productID}) {
    const [product, setProduct] = useState();
  // http://localhost:8080/productos/listarid/?id=
    useEffect(() => {
      fetch(` http://localhost:8080/productos/listarid/?id=${productID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {setProduct(data)})
        .catch((err) =>{
            console.log("algo salio mal",err)
        });            
    },[]);
  
    return (
      <div>
        {<ProductDetail product={product} />}
      </div>
    );
  }