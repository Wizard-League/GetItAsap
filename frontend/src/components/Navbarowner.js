import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import styled from "styled-components";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Navbarowner() {
  const [clicked, setClicked] = useState(false);

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
        <div className="nav-logo">
          <StyledNavLink exact to="/shopdashboard" className="nav-link">
          nameP;
          </StyledNavLink>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <StyledNavLink
              exact
              to="/shopdashboard"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Update Stock
            </StyledNavLink>
          </li>
         
        
          <li className="nav-item">
            <StyledNavLink
              exact
              to="/shopdashboard/stock"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              View Stock
            </StyledNavLink>
          </li>
        </ul>
        <div className="avatar">{/* <AccountCircleIcon/> */}</div>
      </div>
      <div className="left-section"></div>
    </nav>
  );
}
