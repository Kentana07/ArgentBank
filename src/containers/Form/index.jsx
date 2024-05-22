import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import "./style.css";

const Form = () => {
  // State pour gérer l'email, le mot de passe et le "rememberMe"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  // Utilisation des hooks Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Affichage des données soumises dans la console
    console.log(
      "Submitting form with email:",
      email,
      "password:",
      password,
      "rememberMe:",
      rememberMe
    );

    // Dispatch de l'action loginUser avec les données du formulaire
    dispatch(loginUser({ email, password, rememberMe }))
      .unwrap()
      .then(() => {
        // Stockage du token dans localStorage ou sessionStorage en fonction de rememberMe
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
          console.log("Token stored in localStorage");
        } else {
          localStorage.removeItem("rememberMe");
          console.log("Token stored in sessionStorage");
        }
        // Redirection vers la page utilisateur après connexion réussie
        navigate("/user");
      })
      .catch((err) => {
        console.error("Failed to login: ", err);
      });
  };

  // Effet pour initialiser le state rememberMe à partir de localStorage
  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setRememberMe(true);
    }
  }, []);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {status === "loading" && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
};

export default Form;
