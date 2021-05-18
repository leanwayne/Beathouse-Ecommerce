import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import AuthProvider from "./components/contexts/AuthContext";

function App() {
  const [items, setItems] = useState([]);

  const url = "http://localhost:8080/productos/listar";
  useEffect(()=>{
    fetch( url)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      setItems(data) 
    })
    .catch(err => console.log(err));
  },[])

  console.log("ITEMS API", items)

 


  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Main items={items}/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
