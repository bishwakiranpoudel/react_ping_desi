import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocationProvider } from "./context/location-context";
import HomePage2 from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";

import SigninPage from "./Pages/Signin";
import UserSignup from "./Pages/Signup";
import OTPVerification from "./Pages/OtpVerification";
import UsernameRegistration from "./Pages/UsernameRegistration";
import { useEffect } from "react";
// Remove the CSS import that's causing the error

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/home";
    }
  }, []);
  return (
    <LocationProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage2 />} />
          <Route path="/home" element={<HomePage2 />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/username" element={<UsernameRegistration />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<HomePage2 />} />
        </Routes>
        <ToastContainer />
      </Router>
    </LocationProvider>
  );
}

export default App;
