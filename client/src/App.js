import HomePage from "./Displays/HomePage/HomePage";
import LoginPage from "./Displays/LoginPage/LoginPage";
import SignupPage from "./Displays/SignupPage/SignupPage";
import ProfilePage from "./Displays/ProfilePage/ProfilePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const authorized = Boolean(useSelector((state) => state.token))

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={authorized ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/profile/:id" element={authorized ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
