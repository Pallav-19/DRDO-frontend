/* eslint-disable no-unused-vars */
import React from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'
import useNotification from '../hooks/useNotification'
import { useHide } from '../services/NotificationService'
const Notification = () => {
    const hide = useHide()
    const { notification } = useNotification()
    const handleSlide = (props) => {
        return (<Slide {...props} direction="down" />)
    }
    const handleClose = () => {
        hide()
    }
    return (
        <Snackbar
            open={notification?.openToast}
            onClose={handleClose}
            autoHideDuration={4000}
            TransitionComponent={handleSlide}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            sx={{ zIndex: (theme) => theme.zIndex + 1500 }}
        >
            <Alert
            

                onClose={handleClose}
                severity={notification?.severity}
                variant="filled"
                sx={{ width: "100%", fontSize: "1rem" }}
            >
                {notification?.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification