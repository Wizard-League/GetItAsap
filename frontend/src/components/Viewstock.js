import {React, useEffect, useState} from "react";
import axios from "axios";
import Navbarowner from "./Navbarowner";

export default function Viewstock() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {

    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/merch/", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProducts(data.products)
        console.log(data)
      } catch (e) {
        console.log(e);
        // window.location.href = '/login';
      }
    })();
  }, []);


  return (
    <>
      <Navbarowner />
      
      <div className="section1" id="section1">
        <div className="updateContainer">
          <p className="updateText">Your Stock</p>
            {products.length ? products.map((element, index) => (
              <div key={index}>
                <h2>{element.title}</h2>
                <p>Price: {element.price}</p>
                <p>Description: {element.description}</p>
                <p>Quantity: {element.quantity}</p>
              </div>
            ))
          : "No products to display"}
        </div>
      </div>
    </>
  );
}
