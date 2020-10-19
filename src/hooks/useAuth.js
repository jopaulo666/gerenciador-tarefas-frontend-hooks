const { useState, useEffect, createContext } = require("react");
const { default: Axios } = require("axios");
const { AUTH_ENDPOINT, CREDENTIALS_NAME } = require("../constants");

export const AuthContext = createContext();

export const useAuth = () => {
    const [credentials, setCredentials] = useState ({username: null, displayNam: null, token: null});
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() =>{
        loadCredentials();
    }, []);

    const login = async (username, password) => {
        const loginInfo = {username: username, password: password};
        setProcessing(true);

        try{
            const response = await Axios.post(`${AUTH_ENDPOINT}/login`, loginInfo)
            const token = response.headers['authorization'].replace("Bearer ", "");
            storeCredentials(token);
            setProcessing(false);
        }catch(error){
            console.error(error);
            setError("Login inválido");
            setProcessing(false);
        }
    }

    const logout = () => {
        sessionStorage.removeItem(CREDENTIALS_NAME);
        setCredentials({username: null, displayNam: null, token: null});
    }

    const storeCredentials = (token) =>{
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const credentials = {username: tokenData.sub, displayName: tokenData.displayName, token: token};
        sessionStorage.setItem(CREDENTIALS_NAME, JSON.stringify(credentials));
        setCredentials(credentials);
    }

    const loadCredentials = () => {
        const storedCredentials = sessionStorage.getItem(CREDENTIALS_NAME);

        if (storedCredentials !== null) {
            setCredentials(JSON.parse(storedCredentials));
        }
    }

    const isAuthenticated = () => {
        return sessionStorage.getItem(CREDENTIALS_NAME) !== null;
    }

    return {login, logout, isAuthenticated, credentials, error, processing}
}