import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export const Home = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/auth/", {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (e) {
          console.log("not auth");
          return <Navigate to="/login/" />;
        }
      })();
    }
  }, []);

  const search = async (e) => {
    e.preventDefault();
    if (query.length) {
      const { data } = await axios.get(
        "http://localhost:8000/api/search/",
        { params: { q: query } },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);
      setResults(data);
    }
  };

  return (
    <>
    <Navbar/>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="container"
          style={{ marginTop: "2.5rem", width: "70rem", marginLeft: "1rem" }}
        >
          <form className="d-flex" role="search" onSubmit={search}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={query}
              aria-label="Search"
              required
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length) {
                  console.log(e.target.value);
                  search(e);
                }
              }}
            />

            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="container" style={{ display: "flex" }}>
            <div
              style={{
                marginTop: "1rem",
                border: "2px solid black",
                borderRadius: "5px",
                width: "3rem",
                textAlign: "center",
                color: "white",
                backgroundColor: "grey",
                padding: "0px",
                height: "2.4rem",
              }}
            >
              <p style={{ marginTop: "3px" }}>filter</p>
            </div>
            <h4 style={{ marginTop: "1.3rem", marginLeft: "1rem" }}>:</h4>
            <div
              className="dropdown"
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Under 50
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 100
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 200
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 500
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 750
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 1000
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Under 1500
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="dropdown"
              style={{ marginTop: "1rem", marginLeft: "1rem" }}
            >
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Distance
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    within 1KM
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    within 2KM
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    within 4KM
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    within 6KM
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="container text-center"
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <h4>YOUR RESULTS</h4>
            <div
              style={{
                border: "2px solid black",
                height: "30rem",
                backgroundColor: "#b5baaabf",
              }}
            >
              {results.length && query
                ? results.map((element, index) => (
                    <div key={index}>
                      <h2>{element.title}</h2>
                      <p>Price: {element.price}</p>
                      <p>Description: {element.description}</p>
                      <p>Merchant: {element.merchant}</p>
                    </div>
                  ))
                : "Search for item"}
            </div>
          </div>
        </div>
        <div
          className="container text-center"
          style={{
            width: "30rem",
            marginLeft: "1rem",
            display: "flex",
            flexDirection: "column",
            marginTop: "2.5rem",
          }}
        >
          <h4>Previously Visited</h4>
          <div
            style={{
              border: "2px solid black",
              height: "20rem",
              backgroundColor: "#b5baaabf",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
export default Home;
