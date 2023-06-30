/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import LineChart from './LineChart';
import DialogContent from '@mui/material/DialogContent';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ name }) {
    const [open, setOpen] = React.useState(false);

    const options = [{
        label: "Column1",
        value: [0.767, 0.3535, 0.8787, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878, 0.878]
    }, {
        label: "Column2",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column3",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column4",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column5",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column6",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column7",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column8",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column9",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column10",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Colum11",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column12",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column13",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column14",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }, {
        label: "Column15",
        value: [0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767, 0.767]
    }]
    const [data1, setData1] = React.useState([options[1]])
    const [data2, setData2] = React.useState([options[0]])
    const [label1, setLabel1] = React.useState('Column1')
    const [label2, setLabel2] = React.useState('Column2');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <TimelineSharpIcon />
            </IconButton >
            <Dialog
                fullScreen

                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ alignItems: 'center' }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {name}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }} >
                    <Box sx={{ width: "40%", display: "flex", alignItems: "center", justifyContent: "space-around" }}> <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel >Line 1</InputLabel>
                            <Select


                                value={label1}
                                label="Line 1"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setLabel1(e.target.value)
                                    setData1(options.filter(x => x.label.toLowerCase() === e.target.value.toLowerCase()))
                                    console.log(options.filter(x => x.label.toLowerCase() === e.target.value.toLowerCase()));
                                }}
                            >
                                {options.map(x => <MenuItem value={x.label}>{x.label}</MenuItem>)}

                            </Select>
                        </FormControl>
                    </Box>
                        <Typography variant='h6'>VS</Typography>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel >Line 2</InputLabel>
                                <Select


                                    value={label2}
                                    label="Line 2"
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setLabel2(e.target.value)
                                        setData2(options.filter(x => x.label.toLowerCase() === e.target.value.toLowerCase()))
                                        console.log(options.filter(x => x.label.toLowerCase() === e.target.value.toLowerCase()));
                                    }}
                                >
                                    {options.map(x => <MenuItem key={x.label} value={x.label}>{x.label}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Box></Box>


                    <LineChart data1={data1} data2={data2} label1={label1} label2={label2} />

                </DialogContent>
            </Dialog>
        </div>
    );
}
