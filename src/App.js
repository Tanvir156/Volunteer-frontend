import LoginScreen from "./Screen/LoginScreen/LoginScreen";
import ResetPass from "./Screen/LoginScreen/ResetPass";
import ForgotPass from "./Screen/LoginScreen/ForgotPass";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./Screen/FrontPage/FrontPage";
import Header from "./components/Navbar";
import "./bootstrap.min.css";
import LandingPage from "./Screen/LandingPage/LandingPage";
import Search from "./Screen/Search/Search";
import Chatpage from "./Screen/Chatpage";
import Event from "./Screen/Event/Event";
import Vregistration from "./Screen/Vregistration.js/Vregistration";
import VregistrationList from "./Screen/Vregistration.js/VregistrationList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/account" element={<LandingPage />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chatpage />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/event" element={<Event />} />
        <Route path="/vregistration" element={<Vregistration />} />
        <Route path="/vlist" element={<VregistrationList />} />
        <Route path="/forgotpassword/:id/:token" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
