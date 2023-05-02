const { createContext, useContext } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = () => {
    const [tokens, setTokens] = useState();


    const login = async (e) => {
        e.preventDefault();

        try {
            console.log("running login function");
        } catch (error) {
            console.log(error);
        }
    };
    //add logout function
    //set tokens in local Storage
    //set user based on decrypted authtoken 

    const authData = {
        login,
    };

    return (
        <AuthContext.Provider value={authData}></AuthContext.Provider>
    ); 
};

