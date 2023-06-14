/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { NotificationContext } from '../Context/NotificationProvider'
const useNotification = () => {

    return useContext(NotificationContext)
}

export default useNotification