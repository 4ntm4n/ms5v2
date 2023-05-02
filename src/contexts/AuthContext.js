const { createContext, useContext, useState, useEffect } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState();
  const [loading, setLoading] = useState(true);

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
      if (response.status === 200){
        console.log("setting tokens in localStorage");
        localStorage.setItem("tokens", JSON.stringify(data));
        /* console.log("access token :", JSON.stringify(data.access));
        console.log("refresh token :", JSON.stringify(data.refresh)); */
      };
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  //add logout function
  //set tokens in local Storage
  //set user based on decrypted authtoken

  const authData = {
    login,
  };

  return (
    <AuthContext.Provider value={authData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
