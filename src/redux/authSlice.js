import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginApi = "http://localhost:3001/api/v1/user/login"; // URL de l'API de connexion

// Création d'une action asynchrone loginUser avec createAsyncThunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    // Fonction asynchrone qui reçoit les informations d'identification
    try {
      const response = await axios.post(loginApi, { email, password }); // Requête POST pour se connecter avec les informations fournies
      return response.data; // Retourne les données de la réponse
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message); // En cas d'erreur, retourne le message d'erreur de la réponse ou l'erreur elle-même
    }
  }
);

// Création d'un slice pour gérer l'état de l'authentification
const authSlice = createSlice({
  name: "auth", // Nom du slice
  initialState: {
    user: null, // Données de l'utilisateur connecté
    isAuthenticated: false, // Indicateur d'authentification
    status: "idle", // État de la requête
    error: null, // Message d'erreur
  },
  reducers: {
    logout: (state) => {
      // Reducer pour la déconnexion de l'utilisateur
      state.user = null; // Réinitialisation des données de l'utilisateur
      state.isAuthenticated = false; // Réinitialisation de l'indicateur d'authentification
    },
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
    builder
      .addCase(loginUser.pending, (state) => {
        // En attente de la requête de connexion
        state.status = "loading"; // Définition de l'état à "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Réussite de la requête de connexion
        state.status = "succeeded"; // Définition de l'état à "succeeded"
        state.user = action.payload; // Stockage des données de l'utilisateur connecté
        state.isAuthenticated = true; // Définition de l'indicateur d'authentification à true
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Échec de la requête de connexion
        state.status = "failed"; // Définition de l'état à "failed"
        state.error = action.payload; // Stockage du message d'erreur
      });
  },
});

export const { logout } = authSlice.actions; // Extraction de l'action de déconnexion

export default authSlice.reducer; // Export du reducer du slice
