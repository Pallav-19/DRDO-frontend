/* eslint-disable no-unused-vars */
import { Backdrop, Box, Button, CircularProgress, TextField, Typography, Divider, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { apiCalls } from '../api/controllers/apiCalls'
import { useErrorToast, useSuccessToast } from '../services/NotificationService'
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Login = () => {
  const errorToast = useErrorToast()
  const successToast = useSuccessToast()
  const [input, setInput] = useState({})
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const { auth, setAuth, loading, setLoading } = useAuth()
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    if (!input?.email || !input?.password)
      e.preventDefault()
    setLoading(true)
    apiCalls.login(input).then((res) => {
      const { token, isAdmin, role } = res
      setAuth({ token, isAdmin, role });
      localStorage.setItem('auth', JSON.stringify({ token, isAdmin, role }))
      successToast(res?.message)
      navigate("/")

    }).catch(err => {
      errorToast(err)
    }).finally(() => {
      setLoading(false)
      setInput({})
    })


  }
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      background: "#eeeeee",
      alignItems: "center",
      justifyContent: "center"

    }}>

      <Paper
        elevation={6} sx={{
          height: "70vh",
          width: "50vw",
          backgroundColor: "#ffffff",
          // borderRadius: "0.3rem"

        }}>
        <Grid sx={{ height: "100%" }} container spacing={0}>
          <Grid sx={{ height: "100%", backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/6/6f/VL-SRSAM_tested_from_vertical_launch_system.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} item xs={5}>

          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "0.4rem" }} item xs={7}>
            <Box sx={
              {
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",

              }
            }>
              <img style={{ marginLeft: "0.6rem" }} width={"15%"} src='https://upload.wikimedia.org/wikipedia/en/6/68/Defence_Research_and_Development_Organisation_Logo.png' alt='drdo'></img>
              <img style={{ marginRight: "0.6rem" }} width={"12%"} src='https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' alt='emblem'></img>
            </Box>
            <Box sx={{ width: "80%", height: "80%", flexDirection: "column", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
              <Typography fontWeight={600} variant='h6'>Login</Typography>
              <TextField value={input?.email} name='email' onChange={(e) => handleChange(e)} type='text' variant='filled' label='Email' placeholder='Type your Email address' size='small' fullWidth ></TextField>
              <TextField size='small' value={input?.password} name='password' onChange={(e) => handleChange(e)} type='password' variant='filled' label='Password' placeholder='Type your Password' fullWidth></TextField>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <FormControlLabel control={<Checkbox size='small' />} label="Remember me" />
                <Link style={{ color: "black", textDecoration: "none", fontWeight: "500" }}>Forgot Password</Link>
              </Box>
              <Button onClick={handleLogin} fullWidth variant='contained'>Login</Button>
              <Divider sx={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.17)" }}></Divider>
              <Typography >Don't have an account? <Link style={{ color: "black", fontWeight: 700 }} to={'/signup'}>Create Account</Link></Typography>
            </Box>
            <Box sx={{ height: "8%" }}></Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Login