import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import ListGroupsPage from "./pages/groups/ListGroupsPage";

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
          <Route path="/groups" element={<ListGroupsPage /> } />
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
