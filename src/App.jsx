import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocationProvider } from "./context/location-context";
import HomePage2 from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";

import OTPVerification from "./pages/OtpVerification";
import UsernameRegistration from "./pages/UsernameRegistration";
import { useEffect } from "react";
import CategoryTabs from "./pages/ClassFieldsPage";
import ProfilePage from "./pages/ProfilePage";
import ScoopsPage from "./pages/ScoopsPage";
import SigninPage from "./Signin";

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

          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/username" element={<UsernameRegistration />} />
          <Route path="/classifieds" element={<CategoryTabs />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more routes as needed */}
          <Route path="/scoops" element={<ScoopsPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </LocationProvider>
  );
}

export default App;
