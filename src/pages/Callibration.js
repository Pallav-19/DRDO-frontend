/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import useAuth from '../hooks/useAuth';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import { apiCalls } from '../api/controllers/apiCalls';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import { Visibility, Download } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useErrorToast, useSuccessToast } from '../services/NotificationService';

const Callibration = () => {





    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDeleteOpen = () => {
        setDeleteOpen(true)
    }
    const handleDeleteClose = () => {
        setDeleteOpen(false)

    }
    const handleDelete = async () => {
        console.log(selectedIds);
        setLoading(true)
        await apiCalls.deleteCallibration(selectedIds).then(res => {
            const updatedCallibrations = callibrations.filter(
                (item) => !selectedIds.includes(item._id)
            );
            setCallibrations(updatedCallibrations);
            setSelectedIds([])
            handleDeleteClose()
            return success(res.message)

        }).catch(err => error(err)).finally(x => setLoading(false))


    };

    const [selectedIds, setSelectedIds] = useState([]);

    const error = useErrorToast();
    const success = useSuccessToast();
    const { user, setLoading } = useAuth();

    const [selectedFile, setSelectedFile] = useState(null);
    const [callibrationData, setCallibrationData] = useState(null);
    const [callibrations, setCallibrations] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        setLoading(true)

        await apiCalls.addCallibration(selectedFile).then((res) => {
            setCallibrations([res?.result, ...callibrations])
            handleClose()
            setSelectedFile(null)
            return success(res.message)
        }).catch(err => {
            return error(err)
        }).finally(() => {
            setLoading(false)
        })
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const handleView = async (id) => {
        setLoading(true)
        await apiCalls
            .viewCallibration(id)
            .then((res) => setCallibrationData(res))
            .catch((err) => console.log(err)).finally(x => setLoading(false));
    };

    const getRowId = (row) => row._id;

    const columns = [
        // Define your columns here

        {
            field: 'date',
            headerName: 'Date',
            width: 200,
            renderCell: (params) => new Date(params.row.date).toLocaleString(),
        },
        {
            field: 'filename',
            width: 200,
            headerName: 'Filename',
            renderCell: (params) => {
                return params.row?.filename?.split('.txt')[0];
            },
        },
        {
            field: 'View',
            width: 100,
            headerName: 'View',
            sortable: false,
            renderCell: (params) =>
                user?.isAdmin ? (
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleView(params.row._id)}
                    >
                        <Visibility />
                    </IconButton>
                ) : null,
        },
        {
            field: 'Download',
            width: 100,
            headerName: 'Download',
            sortable: false,
            renderCell: (params) =>
                user?.isAdmin ? (
                    <a href={'http://localhost:4040/callibration/downloadCallibration/' + params.row._id} download><Download /></a>
                ) : null,
        },
    ];


    useEffect(() => {
        const getCallibrations = async () => {
            setLoading(true)
            await apiCalls
                .getAllCallibration()
                .then((res) => setCallibrations(res))
                .catch((err) => console.log(err)).finally(() => setLoading(false));
        }
        getCallibrations()

    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Grid height="100%" gap={0} container>
                <Grid
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#eeeeee',
                    }}
                    item
                    xs={6}
                >
                    <DataGrid
                        checkboxSelection
                        sx={{ maxHeight: '60%', background: '#ffffff' }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        rows={callibrations}
                        columns={columns}
                        getRowId={getRowId}

                        selectionModel={selectedIds}
                        onRowSelectionModelChange={(data) => {
                            setSelectedIds(data);
                        }}
                    />
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: '1rem',
                        }}
                    >
                        <IconButton
                            disabled={user?.role === "Employee" ? true : false}
                            onClick={handleOpen}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': { backgroundColor: 'primary.main' },
                            }}
                            size="large"
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            disabled={(!selectedIds?.length || user?.role !== "Admin") ? true : false}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': { backgroundColor: 'primary.main' },
                            }}
                            size="large"
                            onClick={handleDeleteOpen}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                Upload Calibration Data
                            </Typography>
                            <TextField
                                name="binFile"
                                onChange={handleFileChange}
                                type="file"
                                variant="filled"
                                style={{ cursor: 'pointer' }}
                            />
                            <Button onClick={handleUpload} variant="contained" fullWidth>
                                Upload
                            </Button>
                            <Button onClick={handleClose} variant="outline" fullWidth>
                                Cancel
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={deleteOpen}
                        onClose={handleDeleteClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                {`This action will delete ${selectedIds?.length} rows permanently, Continue?`}
                            </Typography>

                            <Button sx={{
                                background: "red", '&:hover': {
                                    background: "red"
                                }
                            }} onClick={handleDelete} variant="contained" fullWidth>
                                Delete
                            </Button>
                            <Button onClick={handleDeleteClose} variant="outline" fullWidth>
                                Cancel
                            </Button>
                        </Box>
                    </Modal>
                </Grid>
                <Grid
                    sx={{
                        whiteSpace: 'pre-wrap',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxHeight: '90%',
                        overflow: 'scroll',
                    }}
                    item
                    xs={6}
                >
                    <Typography variant="h5">
                        {callibrationData ? 'Callibration Data' : ''}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                        {callibrationData ? (callibrationData) : 'Choose a callibration to view'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Callibration;
