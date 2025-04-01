import HomePage from "./Pages/Home";
import { LocationProvider } from "./context/location-context";
// Remove the CSS import that's causing the error

function App() {
  return (
    <LocationProvider>
      <HomePage />
    </LocationProvider>
  );
}

export default App;
