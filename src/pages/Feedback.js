/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Paper, IconButton, Modal, Typography, TextField, Divider, Button } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import useAuth from '../hooks/useAuth';
import { apiCalls } from '../api/controllers/apiCalls';
import { useErrorToast, useSuccessToast } from '../services/NotificationService';


const Feedback = () => {
    const { setLoading } = useAuth()
    const succes = useSuccessToast()
    const error = useErrorToast()
    const [input, setInput] = useState({
        subject: '',
        text: ''
    })
    const changeHandler = async (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", background: "#eeeeee", alignItems: 'center', justifyContent: "space-around" }}>
            <Paper sx={{ height: "70%", width: "50%", display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "space-around" }} elevation={6}>
                <Typography variant='h6' sx={{ letterSpacing: 2 }}>SUBMIT YOUR FEEDBACKS OR QUERIES</Typography>
                <TextField onChange={changeHandler} name='subject' value={input?.subject} sx={{ width: "70%" }} placeholder='Subject' label='Subject' variant='filled'></TextField>
                <TextareaAutosize onChange={changeHandler} name='text' value={input?.text} placeholder='Description' style={{ minWidth: "70%", minHeight: "50%", maxWidth: "70%", maxHeight: "50%", display: 'block', background: "#eeeeee" }} ></TextareaAutosize>
                <Button onClick={async () => {
                    setLoading(true)
                    await apiCalls.feedback(input).then(res => {
                        setInput({ subject: '', text: '' })
                        return succes(res?.message)
                    }).catch(err => error(err)).finally(x => setLoading(false))

                }} sx={{ width: "70%" }} variant='contained'  >Submit</Button>
            </Paper>

        </Box>
    )
}

export default Feedback