/* eslint-disable no-unused-vars */
import useNotification from "../hooks/useNotification"
export const useSuccessToast = () => {
    const hide = useHide()
    const { setNotification } = useNotification()
    const success = (message) => {
        setNotification({
            openToast: true,
            severity: 'success',
            message: message,

        })
        // setInterval(() => {
        //     hide()
        // }, 4000);
    }
    return success

}
export const useErrorToast = () => {
    const { setNotification } = useNotification()
    const hide = useHide()
    const error = async (message) => {
        setNotification({
            openToast: true,
            severity: 'error',
            message,

        })
        // setInterval(() => {
        //     hide()
        // }, 4000);
    }

    return error

}
export const useHide = () => {
    const { setNotification } = useNotification()
    const hide = async () => {
        setNotification({
            openToast: false,
            severity: '',
            message: '',

        })
    }

    return hide

}