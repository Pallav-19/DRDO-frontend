import React, { createContext, useState } from 'react'
export const EmployeeContext = createContext({})
const EmployeeProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    return (
        <EmployeeContext.Provider value={{ auth, setAuth, user, setUser, loading, setLoading }}>{children}</EmployeeContext.Provider>
    )
}

export default EmployeeProvider