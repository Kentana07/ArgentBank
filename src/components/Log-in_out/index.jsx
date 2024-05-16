import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice"; // Import de l'action logout depuis le slice Redux authSlice
import "./style.css";

function Loginandout() {
  // Définition du composant fonctionnel Loginandout
  // Initialisation de la fonction dispatch pour envoyer des actions Redux
  const dispatch = useDispatch();

  // Sélection de l'état d'authentification depuis le store Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Sélection du nom d'utilisateur depuis le store Redux
  const userName = useSelector((state) => state.auth.user?.userName);

  // Définition de la fonction handleLogout pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(logout()); // Appel de l'action Redux logout
  };

  return (
    <div>
      {isAuthenticated ? ( // Condition pour afficher le contenu en fonction de l'état d'authentification
        <div className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        {userName && <span>{userName}</span>}
        <button onClick={handleLogout} className="logout-button">
          Sign Out
        </button>
      </div>      
      ) : (
        <a className="main-nav-item" href="/signin">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      )}
    </div>
  );
}

export default Loginandout;
