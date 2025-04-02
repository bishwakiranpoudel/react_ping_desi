import {ToastContainer} from "react-toastify";
import HomePage from "./Pages/Home";
import { LocationProvider } from "./context/location-context";
// Remove the CSS import that's causing the error

function App() {
  return (
    <LocationProvider>
      <ToastContainer />
      <HomePage />
    </LocationProvider>
  );
}

export default App;
