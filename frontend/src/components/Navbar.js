import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import styled from "styled-components";
import owners from "../data/owners";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const StyledNavLink = styled(NavLink)`
    text-emphasis: none;
    text-decoration: none;
    color: #ed7c0c;

    &:hover {
      text-emphasis: none;
      text-decoration: none;
      color: #ffdd40;
    }
  `;
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="leftside">
          <div className="nav-logo">
            <StyledNavLink exact to="/" className="nav-link">
              NameP:
            </StyledNavLink>
          </div>
          <ul className={clicked ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <StyledNavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </StyledNavLink>
            </li>
            <li className="nav-item">
              <StyledNavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </StyledNavLink>
            </li>
            <li className="nav-item">
              <StyledNavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </StyledNavLink>
            </li>
            <li>
              <button
                className="nav-item button"
                type="button"
                aria-haspopup="menu"
                aria-expanded={dropdown ? "true" : "false"}
                onClick={() => setDropdown(!dropdown)}
              >
                Stationeries{" "}
              </button>
              {/* <Dropdown submenus={owners} /> */}
              <ul className={`menu ${dropdown ? "show" : ""}`}>
                {owners.map((owner, index) => (
                  <li key={index} className="nav-items">
                    <StyledNavLink
                      exact
                      to={owner.url}
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      {owner.name}
                    </StyledNavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className="rightside"> 
          <button className="btnn">
            {" "}
            <NavLink
              exact
              to="/logout"
              activeClassName="active"
              className="nav-links"
            >
              Log out
            </NavLink>
          </button>
          <div className="avtaar">
            <div className="crcle"></div>
          </div>
        </div>
      </div>
      <div className="left-section"></div>
    </nav>
  );
}
