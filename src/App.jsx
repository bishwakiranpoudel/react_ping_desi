import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { LocationProvider } from "./context/location-context";
// Remove the CSS import that's causing the error

function App() {
  return (
    <LocationProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/signin" element={<HomePage />} />
          <Route path="/signup" element={<HomePage />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
