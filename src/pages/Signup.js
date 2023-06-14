/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useErrorToast, useSuccessToast } from '../services/NotificationService'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, Backdrop, CircularProgress, Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { apiCalls } from '../api/controllers/apiCalls';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import useAuth from '../hooks/useAuth';

const Signup = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [input, setInput] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        dob: ""
    })
    const { setLoading } = useAuth()
    const [confirmPassword, setConfirmPassword] = useState()
    const succes = useSuccessToast()
    const error = useErrorToast()
    const handleSignup = async () => {
        if (confirmPassword !== input?.password) return error("Confirm Password must be same as Password")
        setLoading(true)
        apiCalls.signup({ ...input, name: fname + " " + lname }).then(res => {
            setInput({
                name: "",
                email: "",
                gender: "",
                password: "",
                dob: ""
            }); setFname(''); setLname(''); setConfirmPassword(''); return succes(res)
        }).catch(err => { return error(err) }).finally(() => {
            setLoading(false)
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

            <Paper elevation={6} sx={{
                height: "75vh",
                width: "60vw",
                backgroundColor: "#ffffff",


            }}>
                <Grid sx={{ height: "100%" }} container spacing={0}>
                    <Grid sx={{ height: "100%", backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/6/6f/VL-SRSAM_tested_from_vertical_launch_system.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} item xs={5}>

                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "0.35rem" }} item xs={7}>
                        <Box sx={
                            {
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",

                            }
                        }>
                            <img style={{ marginLeft: "0.6rem" }} width={"10%"} src='https://upload.wikimedia.org/wikipedia/en/6/68/Defence_Research_and_Development_Organisation_Logo.png' alt='drdo'></img>
                            <img style={{ marginRight: "0.6rem" }} width={"8%"} src='https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' alt='emblem'></img>
                        </Box>
                        <Box sx={{ width: "80%", flexDirection: "column", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography fontWeight={600} variant='h6'>Signup</Typography>
                            <Grid sx={{ height: "100%", width: "100%", }} container>
                                <Grid sx={{ padding: "0.35rem" }} item xs={6} >
                                    <TextField fullWidth value={fname} onChange={(e) => {
                                        setFname(e.target.value)
                                    }} name='name' type='text' required label='First Name' variant='filled' placeholder='First Name'></TextField></Grid>
                                <Grid sx={{ padding: "0.35rem" }} item xs={6} >
                                    <TextField fullWidth value={lname} onChange={(e) => {
                                        setLname(e.target.value)
                                    }} name='name' type='text' required label='Last Name' variant='filled' placeholder='Last Name'></TextField></Grid>

                                <Grid sx={{ padding: "0.35rem" }} item xs={6} > <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row

                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        value={input?.gender}
                                        onChange={(e) => {
                                            setInput({ ...input, gender: e.target.value })
                                        }}

                                    >
                                        <FormControlLabel value="Female" control={<Radio size="small" />} label="F" />
                                        <FormControlLabel value="Male" control={<Radio size="small" />} label="M" />
                                        <FormControlLabel value="Transgender" control={<Radio size="small" />} label="T" />
                                    </RadioGroup>
                                </FormControl></Grid>
                                <Grid sx={{ padding: "0.35rem" }} item xs={6} > <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker onChange={(newvalue) => {
                                        setInput({ ...input, dob: newvalue._d })
                                    }} label='DOB' />
                                </LocalizationProvider></Grid>

                                <Grid sx={{ padding: "0.35rem" }} item xs={12} ><TextField fullWidth onChange={(e) => { setInput({ ...input, email: e.target.value }) }} value={input?.email} sx={{ marginBottom: '1.5rem' }} type='text' required label='Email' variant='filled' placeholder='Email'></TextField></Grid>
                                <Grid sx={{ padding: "0.35rem" }} item xs={6} >  <TextField fullWidth onChange={(e) => { setInput({ ...input, password: e.target.value }) }} value={input?.password} sx={{ marginBottom: '1.5rem' }} type='password' required label='Password' variant='filled' placeholder='Password'></TextField></Grid>
                                <Grid sx={{ padding: "0.35rem" }} item xs={6} >  <TextField fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ marginBottom: '1.5rem' }} type='password' required label='Confirm Password' variant='filled' placeholder='Confirm Password'></TextField></Grid>
                                <Grid item xs={12}>
                                    <Button disabled={!input?.password || !input?.dob || !input?.email || !input?.gender || !fname || !lname || !confirmPassword} onClick={handleSignup} fullWidth variant='contained' >Submit</Button>

                                </Grid>
                            </Grid>

                        </Box>

                        <Box sx={{ height: "8%" }}><Typography>Already have an account? <Link to={'/login'} style={{ color: "black", fontWeight: "600" }}>Login</Link></Typography></Box>
                    </Grid>
                </Grid>
            </Paper>

        </Box>

    )
}

export default Signup