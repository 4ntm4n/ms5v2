import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        {/* unprotected routes */}
        <Route path="/"/>
        <Route path="/login"/>
        <Route path="/signup"/>


        {/* protected routes here */}
      </Routes>
      
    </>
  );
}

export default App;
