import HomePage from "./Displays/HomePage/HomePage";
import LoginPage from "./Displays/LoginPage/LoginPage";
import SignupPage from "./Displays/SignupPage/SignupPage";
import ProfilePage from "./Displays/ProfilePage/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
