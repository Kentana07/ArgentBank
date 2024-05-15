import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRouteWrapper from "./components/ProtectedRoute";

const App = () => {
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
