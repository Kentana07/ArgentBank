import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../../redux/authSlice";
import AccountSection from "../../components/Accountsection";
import "./style.css";

const Account = () => {
  // stocker le nouveau nom d'utilisateur et la visibilité du modal
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer les données utilisateur depuis le store Redux
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // Récupérer les données utilisateur lorsque le composant est monté
  useEffect(() => {
    dispatch(setUserData());
  }, [dispatch]);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Gérer la soumission du formulaire pour mettre à jour le nom d'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Récupérer le token depuis localStorage ou sessionStorage
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Le token est absent des deux stockages");
      }
      console.log("Utilisation du token pour mettre à jour le nom d'utilisateur :", token);

      // Effectuer une requête API pour mettre à jour le nom d'utilisateur
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName: newUserName },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Gérer la réponse de l'API
      if (response.status === 200) {
        console.log("Nom d'utilisateur mis à jour avec succès");
        closeModal();
        dispatch(setUserData());
      } else {
        console.error("Échec de la mise à jour du nom d'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du nom d'utilisateur :", error.message);
    }
  };

  return (
    <main className="main bg-dark2">
      <div className="heading">
        <h1>
          Bienvenue de retour
          <br />
          {userData ? userData.userName : "Utilisateur"} !
        </h1>
        <button className="edit-button" onClick={openModal}>
          Modifier le nom
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="newName">Nouveau nom :</label>
              <input
                type="text"
                id="newName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <button type="submit">Enregistrer</button>
            </form>
          </div>
        </div>
      )}
      <h2 className="sr-only">Comptes</h2>

      <AccountSection
        title="Compte courant Argent Bank"
        amount="2,082.79"
        description="Solde disponible"
        accountId="x8349"
      />
      <AccountSection
        title="Épargne Argent Bank"
        amount="10,928.42"
        description="Solde disponible"
        accountId="x6712"
      />
      <AccountSection
        title="Carte de crédit Argent Bank"
        amount="184.30"
        description="Solde actuel"
        accountId="x8349"
      />
    </main>
  );
};

export default Account;
