import React, { createContext, useState } from 'react'
export const NotificationContext = createContext({})
const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        openToast: false,
        severity: '',
        message: '',
       
    })
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>{children}</NotificationContext.Provider>
    )
}

export default NotificationProvider