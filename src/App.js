import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar>
        <Routes>
          {/* unprotected routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" />
          <Route path="/signup" />

          {/* protected routes here */}
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
