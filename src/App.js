import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setUserData } from "./redux/authSlice";
import { useDispatch } from "react-redux";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRouteWrapper from "./components/ProtectedRoute";

const App = () => {
  //ajout de la gestion de token sur toute l'app
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserData());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route element={<ProtectedRouteWrapper />}>
          <Route path="/user" element={<Account />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
