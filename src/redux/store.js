import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Configuration du store Redux avec configureStore
const store = configureStore({
  reducer: {
    auth: authReducer, // Utilisation du reducer authReducer pour gérer l'état de l'authentification
  },
});

export default store; // Export du store configuré
