import { createContext } from 'react'


export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    authReady: false
});

const AuthProvider = ({ children }) => {
    const cookies = "NextJWTCRUD-APP"
    return (
        <AuthContext.Provider value={cookies}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;