import "./style.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../../redux/authSlice";

const Account = () => {
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserData());
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token is missing from localStorage");
      }

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

      if (response.status === 200) {
        console.log("Username updated successfully");
        closeModal();
        dispatch(setUserData()); // Mettre à jour les données utilisateur après la modification du nom d'utilisateur
      } else {
        console.error("Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error.message);
    }
  };

  return (
    <main className="main bg-dark2">
      <div className="heading">
        <h1>
          Welcome back
          <br />
          {userData ? userData.userName : "User"}!
        </h1>
        <button className="edit-button" onClick={openModal}>
          Edit Name
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="newName">New Name:</label>
              <input
                type="text"
                id="newName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Account;
