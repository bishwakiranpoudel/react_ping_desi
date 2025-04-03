import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LocationProvider } from "./context/location-context";
import SigninPage from "./Pages/Signin";
import UserSignup from "./Pages/Signup";
import OTPVerification from "./Pages/OtpVerification";
import UsernameRegistration from "./Pages/UsernameRegistration";
// Remove the CSS import that's causing the error

function App() {
  return (
    <LocationProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/username" element={<UsernameRegistration />} />

        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
