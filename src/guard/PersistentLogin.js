/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Outlet } from "react-router-dom"
import { CircularProgress } from "@mui/material"
const PersistentUserLogin = () => {
    const [loading, setLoading] = useState(true)
    const { auth, setAuth } = useAuth();
    useEffect(() => {

        const RefreshToken = async () => {
            try {
                // await refresh()
                const a = localStorage.getItem("auth");
                setAuth(JSON.parse(a))

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        !auth?.token ? RefreshToken() : setLoading(false)
    }, [])
    return (
        <>  {loading ? <CircularProgress sx={{ position: 'absolute', top: "50%", left: '50%', transform: "translate('-50%',-50%)" }} /> : <Outlet />}</>

    )
}

export default PersistentUserLogin