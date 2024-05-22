// Import des modules nécessaires
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL de l'API de connexion
const loginApi = "http://localhost:3001/api/v1/user/login";

// Création d'une action asynchrone pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // Appel à l'API pour la connexion avec l'email et le mot de passe fournis
      const response = await axios.post(loginApi, { email, password });
      const { token } = response.data.body;

      // Stockage du token dans localStorage ou sessionStorage en fonction de rememberMe
      if (rememberMe) {
        localStorage.setItem("authToken", token);
        console.log("Token stored in localStorage:", token);
      } else {
        sessionStorage.setItem("authToken", token);
        console.log("Token stored in sessionStorage:", token);
      }
      return token; // Retourne le token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Création d'une action asynchrone pour récupérer les données de l'utilisateur
export const setUserData = createAsyncThunk(
  "auth/setUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Récupération du token depuis localStorage ou sessionStorage
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token is missing from both storages");
      }
      console.log("Using token to fetch user data:", token);

      // Appel à l'API pour récupérer les données de l'utilisateur avec le token
      const profileResponse = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return profileResponse.data.body; // Retourne les données de l'utilisateur
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Création d'un slice Redux pour gérer l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Initialisation de l'état
    token:
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      null,
    isAuthenticated: !!(
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    ),
    status: "idle",
    error: null,
    userData: null,
  },
  reducers: {
    // Reducer pour la déconnexion de l'utilisateur
    logout: (state) => {
      // Mise à jour de l'état lors de la déconnexion
      state.token = null;
      state.isAuthenticated = false;
      state.status = "disconnected";
      state.userData = null;
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      console.log("Logged out: tokens removed from storages");
    },
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones avec createAsyncThunk
    builder
      // Gestion de l'action loginUser.fulfilled (connexion réussie)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        console.log(
          "Login successful: state updated with token:",
          action.payload
        );
      })
      // Gestion de l'action setUserData.fulfilled (récupération des données utilisateur réussie)
      .addCase(setUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log("User data fetched successfully:", action.payload);
      })
      // Gestion des erreurs pour toutes les actions rejetées liées à l'authentification
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") && action.type.includes("auth"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          console.error("An error occurred:", action.payload);
        }
      );
  },
});

// Export des actions et du reducer du slice auth
export const { logout } = authSlice.actions;
export default authSlice.reducer;
