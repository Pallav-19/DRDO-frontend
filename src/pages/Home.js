import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Box from "@mui/material/Box"
const Home = () => {
    return (
        <Box
            sx={{ height: "100vh", width: "100vw", overflow: 'hidden' }}
        ><Navbar />
            <Outlet />
        </Box>
    )
}

export default Home