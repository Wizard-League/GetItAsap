import { useEffect, useState } from "react";
import Navbarowner from "./Navbarowner";
import axios from "axios";
import "./shopdashboard.css";
import { Navigate } from "react-router-dom";

const Shopdashboard = () => {
  const [status, setStatus] = useState(false);
  const [itemname, setItemname] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
 
      // if (localStorage.getItem("access_token") === null) {
      //   window.location.href = "/login";
      // } else {
      //   (async () => {
      //     try {
      //       const { data } = await axios.get("http://localhost:8000/api/user", {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       });
      //       if(!data.is_merch){
      //        <Navigate to='/login'/>
      //       }
      //     } catch (e) {
      //       console.log("not auth");
      //       return <Navigate to="/login/" />;
      //     }
      //   })();
      // }

    (async()=>{
try {
  const { data } = await axios.get("http://localhost:8000/api/merch/", {
    headers: {
      "content-type": "application/json",
    },
  }
  );
  console.log(data.status);
} catch (error) {
  console.log(error.message);
}
    })();
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

  const hanldeUpdate = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:8000/api/merch/update",
      { status: status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("updatigng ");
  };

  const toogleStatus = async (e) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/merch/update",
      { status: status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <Navbarowner />
      <div className="section1" id="section1">
        <div className="updateContainer">
          <p className="updateText">Update the Stock</p>
          <form className="updateForm" onSubmit={hanldeUpdate}>
            <div className="formelement">
              <p>Item :</p>
              <input
                className="inputField"
                name="itemname"
                type="text"
                placeholder="Enter the item name"
                value={itemname}
                onChange={(e) => {
                  setItemname(e.target.value);
                }}
              />
            </div>
            <div className="formelement">
              <p>Quantiy :</p>{" "}
              <input
                className="inputField"
                name="quantity"
                type="number"
                placeholder="Enter the Quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="formelement">
              <p>Price :</p>
              <input
                className="inputField"
                name="price"
                type="number"
                placeholder="Enter the price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="lastdiv">
              <button className="buttnn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="leftContainer">
          <div
            className={`openclose ${status ? "openclose" : "closeopen"}`}
            onClick={() => {
              setStatus(!status);
              toogleStatus();
            }}
          >
            <p> {status ? `OPEN` : `CLOSE`}</p>
          </div>
        </div>
      </div>
      <div className="section2" id="viewstock">
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
};
export default Shopdashboard;
