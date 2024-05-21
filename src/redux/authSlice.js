import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginApi = "http://localhost:3001/api/v1/user/login";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(loginApi, { email, password });
      const { token } = response.data.body;
      return token;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const setUserData = createAsyncThunk(
  "auth/setUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) {
        throw new Error("Token is missing");
      }
      const profileResponse = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return profileResponse.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
    userData: null, // Ajout de l'état pour stocker les données utilisateur
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.status = "disconnected";
      state.userData = null; // Réinitialiser les données utilisateur lors de la déconnexion
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("authToken", action.payload);
        console.log("Token stored:", localStorage.getItem("authToken"));
      })
      .addCase(setUserData.fulfilled, (state, action) => {
        state.userData = action.payload; // Stocker les données utilisateur dans l'état Redux
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.includes("auth"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
