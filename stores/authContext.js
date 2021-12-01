import { createContext, useState } from 'react'


export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    authReady: false
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }
    const site = "Student Portal"

    const context = { user, site, login }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;