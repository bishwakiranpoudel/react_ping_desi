import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocationProvider } from "./context/location-context";

import { Home } from "react-feather";
import HomePage2 from "./Pages/HomePage";
import DiscoverPage from "./Pages/DiscoverPage";

function App() {
  return (
    <LocationProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage2 />} />
          <Route path="/discover" element={<DiscoverPage />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<HomePage2 />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
