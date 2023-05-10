import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [user, setUser] = useState(() => {
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  });
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});

  //set user, based on decrypted authtoken
  const extractUser = (token) => {
    const decUser = jwtDecode(token.access);
    localStorage.setItem("user", JSON.stringify({
      userId: decUser.user_id,
      username: decUser.username,
      image: decUser.profile_image,
    }));

    
    
    return {
      userId: decUser.user_id,
      username: decUser.username,
      image: decUser.profile_image,
    };
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      // fetch a token using the username and password of an existing user
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
    
      const data = response.data;
    
      if (response.status === 200) {
        // sets tokens in local Storage
        localStorage.setItem("tokens", JSON.stringify(data));
        setTokens(data);
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };


  //logout function
  const logout = () => {
    localStorage.removeItem("tokens");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (tokens && !user) {
      setUser(extractUser(tokens));
    } else if (!tokens) {
      setUser(null);
    }
    setLoading(false);
  }, [tokens, loading]);


 
  // methods and context passed to rest of app
  const authData = {
    user,
    setUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
