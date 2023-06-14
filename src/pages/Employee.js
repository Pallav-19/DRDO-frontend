/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { apiCalls } from '../api/controllers/apiCalls';
import { useErrorToast, useSuccessToast } from '../services/NotificationService';
import useAuth from '../hooks/useAuth';




export default function Employee() {
    const error = useErrorToast()
    const success = useSuccessToast()
    const { setLoading } = useAuth()
    const [rows, setRows] = React.useState([])
    const getRowId = (row) => row._id;
    const columns = [
        { field: '_id', headerName: 'ID', width: 70, renderCell: (params) => params?.row._id?.slice(-5) },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'dob',
            headerName: 'Date of Birth',
            type: 'string',
            width: 120,
            renderCell: (params) => {
                return new Date(params?.row?.dob).toLocaleDateString()
            }
        },
        { field: 'role', headerName: 'Role', width: 130 },
    ];
    React.useEffect(() => {

        const getEmployee = async () => {
            setLoading(true)
            await apiCalls.getEmployee().then(res => setRows(res.result)).catch(err => error(err)).finally(x => setLoading(false))
        }
        getEmployee()
    }, [])
    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", background: "#eeeeee" }}>
            <Divider sx={{ width: "100%", color: "black" }} > <Typography variant='h3'>APPROVED EMPLOYEES</Typography></Divider>
            <Paper sx={{ maxHeight: "80%" }} elevation={6}>
                <DataGrid
                    getRowId={getRowId}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}

                />
            </Paper>
        </Box>
    );
}
