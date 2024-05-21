import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice"; // Import de l'action logout depuis le slice Redux authSlice
import "./style.css";

function Loginandout() {
  // Définition du composant fonctionnel Loginandout
  // Initialisation de la fonction dispatch pour envoyer des actions Redux
  const dispatch = useDispatch();

  // Sélection de l'état d'authentification depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Définition de la fonction handleLogout pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(logout()); // Appel de l'action Redux logout
  };
  return (
    <div>
      {isAuthenticated ? ( // Condition pour afficher le contenu en fonction de l'état d'authentification
        <div className="main-nav-item">
          <Link to="/user">UserProfile    </Link>
          <Link to="/signin">SignIn   </Link>
          <i className="fa fa-user-circle"></i>
          <button onClick={handleLogout} className="logout-button">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="main-nav-item">
          <Link to="/signin" className="nav-link">Sign In</Link>
          <i className="fa fa-user-circle"></i>
        </div>
      )}
    </div>
  );
}

export default Loginandout;
