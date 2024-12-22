import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const Header = () => {
  const [btn,setBtn]=useState("Login");
  useEffect(()=>{
    console.log("Use Effect Rendered");
  }),[];
  console.log("Header rendered");
    return (
      <div className="header-div">
        <div className="logo-div">
          <img className="logo" src={LOGO_URL} alt="Logo" />
        </div>
        <div className="nav-items-div">
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li>CART</li>
            <li>
              <button className="login" onClick={()=>{btn==="Login"? setBtn("Logout"):setBtn("Login")}}>{btn}</button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;