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

  //set user, based on decrypted authtoken
  const extractUser = (token) => {
    const decUser = jwtDecode(token.access);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: decUser.user_id,
        username: decUser.username,
        image: decUser.profile_image,
      })
    );

    return {
      userId: decUser.user_id,
      username: decUser.username,
      image: decUser.profile_image,
    };
  };

  //logout function
  const logout = () => {
    localStorage.removeItem("profileImage");
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    setTokens(null);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (tokens) {
      let updatedUser = extractUser(tokens);
      const storedImage = localStorage.getItem("profileImage");

      // If a profile image is stored in local storage, use it
      if (storedImage) {
        updatedUser = { ...updatedUser, image: storedImage };
      }

      setUser(updatedUser);
    }
    setLoading(false);
  }, [tokens]);

  // methods and context passed to rest of app
  const authData = {
    user,
    tokens,
    setTokens,
    extractUser,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
