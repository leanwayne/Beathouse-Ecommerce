import React from "react";
import Button from '@material-ui/core/Button';

export default function ButtonChildProc() {



  
  const ChildProcess = () => {
    fetch("http://localhost:8080/randoms?num=50000000", {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)          
        })
        .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={ChildProcess}>
        desafio clase 28
      </Button>
    </div>
  );
}
