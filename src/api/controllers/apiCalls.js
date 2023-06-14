import { withToken } from "../axios"

export const apiCalls = {

    signup: async (data) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.post('/employee/register', data).then(response => {
                resolve(response?.data?.message)
            }).catch(err => { reject("An error occured!") })
        })

    },
    login: async (data) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.post('/employee/login', data).then(response => {
                if (!response?.data?.token) {
                    return reject(response?.data?.message)
                }
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    getEmployee: async () => {
        return new Promise(async (resolve, reject) => {
            return await withToken.get('/employee/fetchEmployees').then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    getUser: async () => {
        return new Promise(async (resolve, reject) => {
            return await withToken.get('/employee/fetchUser').then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    getAllCallibration: async () => {
        return new Promise(async (resolve, reject) => {
            return await withToken.get('/callibration/getAllCallibration').then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    viewCallibration: async (id) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.get('/callibration/getCallibration/' + id).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    addCallibration: async (data) => {
        const formdata = new FormData()
        formdata.append('binFile', data)
        return new Promise(async (resolve, reject) => {
            return await withToken.post('/callibration/addCallibration', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    deleteCallibration: async (id) => {


        return new Promise(async (resolve, reject) => {
            return await withToken.delete('/callibration/deleteCallibration', {
                data: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },

    getForApproval: async () => {
        return new Promise(async (resolve, reject) => {
            return await withToken.get('/employee/fetchRequests').then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    approve: async (data) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.put('/employee/approve', data).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    reject: async (data) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.delete('/employee/reject', {
                data: {
                    id: data
                }
            }).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },
    feedback: async (data) => {
        return new Promise(async (resolve, reject) => {
            return await withToken.post('/employee/feedback', data).then(response => {
                return resolve(response?.data)
            }).catch(err => { return reject(err?.response?.data?.message) })
        })
    },

}