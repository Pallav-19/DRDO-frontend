/* eslint-disable no-unused-vars */
import React from 'react'
import useAuth from './useAuth'

const useLogout = () => {
    const { setAuth, setUser } = useAuth()
    const logout = async () => {
        setAuth({})
        setUser({})
        localStorage.removeItem('auth')
    }
    return logout
}

export default useLogout