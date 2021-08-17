import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useParams } from "react-router-dom";

export default function ProductDetailContainer() {
    const [item, setItem] = useState();
    const { id } = useParams();
  
    useEffect(() => {
      const getItem = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(itemsMock.find((item) => item.id === id));
        }, 2000);
      });
      getItem
        .then((response) => setItem(response))
        .catch((error) => console.log(error));
    }, [id]);
  
  
    return (
      <div>
        {item ? <Product product={item} /> : <h2>Loading..</h2>}
      </div>
    );
  }