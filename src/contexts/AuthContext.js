const { createContext, useContext, useState, useEffect } = require("react");

// create an auth context
const AuthContext = createContext();

//exports authContext as a hook called useAuth.
export const useAuth = () => useContext(AuthContext);

//create auth provider
export const AuthProvider = ({children}) => {
    const [tokens, setTokens] = useState();
    const [loading, setLoading] = useState(true);


    const login = async (e) => {
        e.preventDefault();

        try {
            console.log("running login function");
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
        <AuthContext.Provider value={authData}>{loading ? null : children}</AuthContext.Provider>
    ); 
};

