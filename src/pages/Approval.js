/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, IconButton, Modal, Typography, TextField, Divider } from '@mui/material';
import { apiCalls } from '../api/controllers/apiCalls';
import { useErrorToast, useSuccessToast } from '../services/NotificationService';
import useAuth from '../hooks/useAuth';
import { Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';

export default function Approval() {
    const [open, setopen] = React.useState(false)
    const handleOpen = () => setopen(true)
    const handleClose = () => setopen(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 230,
        bgcolor: 'background.paper',
        textAlign: 'center',
        boxShadow: 24,
        p: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',
    };
    const error = useErrorToast()
    const success = useSuccessToast()
    const { setLoading, user } = useAuth()
    const [rows, setRows] = React.useState([])
    const getRowId = (row) => row._id;
    const [role, setRole] = React.useState('')
    const handleChange = (event) => {
        setRole(event.target.value);
    };

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
        {
            field: 'approve', headerName: 'Actions', sortable: false, width: 170, renderCell: (params) => {

                return (
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", width: "100%" }}>

                        <IconButton onClick={handleOpen} size='medium' sx={{
                            backgroundColor: "success.main", color: "white", '&:hover': {
                                backgroundColor: "success.main"
                            }
                        }} children={<CheckCircleOutlineIcon />} variant='filled' />
                        <IconButton onClick={async () => {
                            setLoading(true)
                            await apiCalls.reject(params.row._id).then(res => {

                                const updatedRows = rows.filter(x => x._id !== params.row._id)
                                setRows(updatedRows)
                                return success(res?.message)
                            }).catch(err => error(err)).finally(x => setLoading(false))
                        }} size='medium' sx={{
                            backgroundColor: "error.main", color: "white", '&:hover': {
                                backgroundColor: "error.main"
                            }
                        }} children={<RemoveCircleOutlineIcon />} variant='filled' />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography variant="h6" component="h2">
                                    Assign Role and Approve
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Employee"}>Employee</MenuItem>
                                        <MenuItem value={"Technician"}>Technician</MenuItem>
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button onClick={async () => {
                                    setLoading(true)
                                    await apiCalls.approve({ id: params.row._id, role }).then((res) => {
                                        const updatedRows = rows.filter((r) => r._id !== res?.result?._id)
                                        setRows(updatedRows)
                                        handleClose()
                                        return success(res?.message)
                                    }).catch(err => error(err)).finally(x => setLoading(false))
                                }} variant="contained" fullWidth>
                                    Confirm
                                </Button>
                                <Button onClick={handleClose} variant="outline" fullWidth>
                                    Cancel
                                </Button>
                            </Box>
                        </Modal>
                    </Box>
                )

            }
        },
    ];
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!user?.isAdmin) return navigate("/")

        const getEmployee = async () => {
            setLoading(true)
            await apiCalls.getForApproval().then(res => setRows(res.result)).catch(err => error(err)).finally(x => setLoading(false))
        }
        getEmployee()
    }, [])
    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", background: "#eeeeee" }}>
            <Divider sx={{ width: "100%", color: "black" }} > <Typography variant='h3'>SIGNUP REQUESTS</Typography></Divider>
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
                    onCellEditStop={(params) => console.log(params)}

                />
            </Paper>
        </Box>
    );
}
