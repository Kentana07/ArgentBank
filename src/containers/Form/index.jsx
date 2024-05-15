import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import "./style.css";

const Form = () => {
  // Définition du composant fonctionnel Form
  // Déclaration des états locaux pour l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialisation de la fonction dispatch pour envoyer des actions Redux
  const dispatch = useDispatch();

  // Initialisation de la fonction navigate pour la navigation dans React Router
  const navigate = useNavigate();

  // Sélection de l'état d'authentification depuis le store Redux
  const { status, error } = useSelector((state) => state.auth);

  // Définition de la fonction handleSubmit pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire de recharge de la page

    // Appel de l'action Redux loginUser avec les données email et mot de passe
    dispatch(loginUser({ email, password }))
      .unwrap() // Extrait la valeur de la promise retournée par l'action Redux
      .then(() => {
        navigate("/user"); // Redirection vers la page utilisateur après la connexion réussie
      })
      .catch((err) => {
        console.error("Failed to login: ", err); // Affichage de l'erreur dans la console en cas d'échec de la connexion
      });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Gestion de la soumission du formulaire */}
          <div className="input-wrapper">
            <label htmlFor="email">User mail</label>
            <input
              type="email"
              id="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {/* Affichage d'un message de chargement pendant l'authentification */}
        {status === "loading" && <p>Loading...</p>}
        {/* Affichage d'un message d'erreur en cas d'échec de l'authentification */}
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
};

export default Form;
