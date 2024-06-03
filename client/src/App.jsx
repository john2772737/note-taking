import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import SelectionPage from "./pages/selectionPage"; // Capitalized the component name to follow convention
import UserLogin from "./pages/userlogin"; // Capitalized the component name and fixed the file name casing
import TextEditor from "./pages/texteditor";
import { FirebaseProvider } from "./utils/context";
import PrivateRoute from './utils/privateRoute'
function App() {
  return (
    <FirebaseProvider>
    <Routes>
  
      <Route path="/" element={<UserLogin />} />
      <Route path="/landing" element={< PrivateRoute element={LandingPage} />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/texteditor" element={<TextEditor />} />
    </Routes>
    </FirebaseProvider>
  );
}

export default App;
