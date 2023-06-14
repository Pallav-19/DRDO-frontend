/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketIcon from '@mui/icons-material/Rocket';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { apiCalls } from '../api/controllers/apiCalls';
import useAuth from '../hooks/useAuth';
import { useErrorToast } from '../services/NotificationService';


function Navbar() {

    const error = useErrorToast()
    const { user, setUser, setLoading } = useAuth()
    const navigationMenu = [
        {
            name: user?.isAdmin ? "Requests" : null,
            path: !user?.isAdmin ? "/" : "/approval",

        },
        {
            name: "Employees",
            path: "/employees"
        },
        {
            name: "Callibration Data",
            path: "/callibration"
        }, {
            name: "Feedback",
            path: "/feedback"
        }]

    React.useEffect(() => {
        const getUSer = async () => {
            setLoading(true)
            await apiCalls.getUser().then(({ result }) => {
                console.log(result);
                return setUser(result)
            }).catch(err => {
                error(err)
            }).finally(e => setLoading(false))
        }
        getUSer()

    }, [])
    const logout = useLogout()
    const settings = [{ name: "Logout", action: logout }];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate()
    const handleNavigate = async (e, path) => {
        e.preventDefault()
        navigate(path)
    }
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <RocketIcon

                        onClick={(e) => {
                            handleNavigate(e, "/")
                        }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} />
                    <Typography
                        variant="h6"
                        noWrap

                        onClick={(e) => {
                            handleNavigate(e, "/")
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        DRDO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navigationMenu.map((page) => (
                                <MenuItem key={page?.name} onClick={(e) => {
                                    handleNavigate(e, page?.path)
                                }}>
                                    <Typography textAlign="center">{page?.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <RocketIcon onClick={(e) => {
                        handleNavigate(e, "/")
                    }} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }} />
                    <Typography
                        variant="h5"
                        noWrap
                        onClick={(e) => {
                            handleNavigate(e, "/")
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none', cursor: 'pointer' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DRDO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navigationMenu.map((page) => (
                            <MenuItem key={page?.name} onClick={(e) => {
                                handleNavigate(e, page?.path)
                            }}>
                                <Typography textAlign="center">{page?.name}</Typography>
                            </MenuItem>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ backgroundColor: "success.main" }}>{user?.name?.split(' ')[0][0]}{user?.name?.split(' ').length > 1 ? user?.name?.split(' ')[1][0] : ''}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting?.name} onClick={() => { setting?.action() }}>
                                    <Typography textAlign="center">{setting?.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;