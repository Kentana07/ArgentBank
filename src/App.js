import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./containers/Header/index.jsx";
import Footer from "./containers/Footer/index.jsx";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";
import Account from "./pages/Account/index.jsx";

const App = () => {
    return (
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/user" element={<Account />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    );
  };
  
  export default App;