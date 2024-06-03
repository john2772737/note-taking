import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import SelectionPage from "./pages/selectionPage"; // Capitalized the component name to follow convention
import UserLogin from "./pages/userlogin"; // Capitalized the component name and fixed the file name casing

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/selection" element={<SelectionPage />} />
    </Routes>
  );
}

export default App;
