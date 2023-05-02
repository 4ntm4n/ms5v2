const { createContext, useContext } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = () => {
    //add login function
    //add logout function
    //set tokens in local Storage
    //set user based on decrypted authtoken 
    // define authcontext as return of authprovider to use as context for protected routes. 
};

