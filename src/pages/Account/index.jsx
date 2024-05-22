import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../../redux/authSlice";
import AccountSection from "../../components/Accountsection";
import "./style.css";

const Account = () => {
  // State to hold the new username and modal visibility
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve user data from the Redux store
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(setUserData());
  }, [dispatch]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission to update the username
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the token from localStorage or sessionStorage
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token is missing from both storages");
      }
      console.log("Using token to update username:", token);

      // Make an API request to update the username
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

      // Handle the response from the API
      if (response.status === 200) {
        console.log("Username updated successfully");
        closeModal();
        dispatch(setUserData());
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

      <AccountSection
        title="Argent Bank Checking"
        amount="2,082.79"
        description="Available Balance"
        accountId="x8349"
      />
      <AccountSection
        title="Argent Bank Savings"
        amount="10,928.42"
        description="Available Balance"
        accountId="x6712"
      />
      <AccountSection
        title="Argent Bank Credit Card"
        amount="184.30"
        description="Current Balance"
        accountId="x8349"
      />
    </main>
  );
};

export default Account;
