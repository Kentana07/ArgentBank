import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API pour la connexion
const loginApi = "http://localhost:3001/api/v1/user/login";

// Thunk pour gérer l'authentification de l'utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // Envoi de la requête de connexion à l'API
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

      // Retourne le token si la requête est réussie
      return token;
    } catch (error) {
      // Rejette la promesse avec un message d'erreur approprié
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk pour récupérer les données de l'utilisateur à partir du token stocké
export const setUserData = createAsyncThunk(
  "auth/setUserData",
  async (_, { rejectWithValue }) => {
    try {
      // Récupération du token depuis localStorage ou sessionStorage
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token is missing from both storages");
      }
      console.log("Using token to fetch user data:", token);

      // Envoi de la requête pour récupérer les données de l'utilisateur
      const profileResponse = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Retourne les données de l'utilisateur si la requête est réussie
      return profileResponse.data.body;
    } catch (error) {
      // message d'erreur approprié
      return rejectWithValue(error.message);
    }
  }
);

// Création du slice pour l'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
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
    // Réducteur pour déconnecter l'utilisateur
    logout: (state) => {
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
    builder
      // Gère l'état après une connexion réussie
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
      // Gère l'état après avoir récupéré les données de l'utilisateur avec succès
      .addCase(setUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log("User data fetched successfully:", action.payload);
      })
      // Gère les erreurs pour toutes les actions rejetées liées à l'authentification
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

// Exportation de l'action de déconnexion pour être utilisée dans les composants
export const { logout } = authSlice.actions;

// Exportation du réducteur pour être combiné dans le store
export default authSlice.reducer;
