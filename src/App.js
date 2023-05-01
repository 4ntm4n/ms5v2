import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <>
      <Navbar>
        <Routes>
          {/* unprotected routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<Signup />} />

          {/* protected routes here */}
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
