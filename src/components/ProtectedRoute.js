import React from "react";
import { Navigate, Outlet } from "react-router-dom"; 
import { useSelector } from "react-redux"; 

// Définition du composant ProtectedRouteWrapper
const ProtectedRouteWrapper = (props) => {
  // Extraction de la propriété isAuthenticated du state Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Rendu conditionnel : si l'utilisateur est authentifié, rend l'Outlet qui affichera les routes imbriquées,
  // sinon redirige vers la page de connexion
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteWrapper; 
