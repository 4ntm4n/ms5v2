import jwtDecode from "jwt-decode";
const { createContext, useContext, useState, useEffect } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState( () => 
    localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens"))
    : null
  );
  const [user, setUser] = useState( null);
  const [loading, setLoading] = useState(true);


  const extractUser = (token) => {
    const decUser = jwtDecode(token.access);
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
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      //store json response
      const data = await response.json();
      /* console.log("access token :", JSON.stringify(data.access));
        console.log("refresh token :", JSON.stringify(data.refresh)); */
      if (response.status === 200){
        console.log("setting tokens in localStorage");
        localStorage.setItem("tokens", JSON.stringify(data));
        setTokens(data);
        /* setUser(data.access); */
      };
      
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    setUser(null);
  };

  useEffect(() => {
    if (tokens){
      setUser(extractUser(tokens));
    }
    setLoading(false);
  }, [tokens, loading]);

  //add logout function
  //set tokens in local Storage
  //set user based on decrypted authtoken

  const authData = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
