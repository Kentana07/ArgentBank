import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/argentBankLogo.webp";
import "./style.css";
import Loginandout from "../../components/Log-in_out";
import { useSelector } from "react-redux";

function Header() {
  const userName = useSelector((state) => state.auth.userData?.userName);

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo argent bank" className="logo" />
        </Link>
        <div className="main-nav">
          {userName && <span>{userName}</span>}
          <Loginandout />
          
        </div>
      </nav>
    </header>
  );
}

export default Header;
