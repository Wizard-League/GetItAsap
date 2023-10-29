import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export const Test = () => {
  const submit = async (e) => {
    e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:8000/api/merch/add_product",
        {
            title: 'pen',
            price: 5,
            description: 'a pen',
            quantity: 100,
         },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);
  };

  return (
    <form onSubmit={submit}>
            <button type="submit">
              Search
            </button>
    </form>
  );
};
export default Test;
