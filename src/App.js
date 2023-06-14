/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequireAuth from './guard/RequireAuth';
import Employee from './pages/Employee';
import PersistentUserLogin from './guard/PersistentLogin';
import Notification from './components/Notification';
import Home from './pages/Home';
import PublicRoutes from './guard/PublicRoutes';
import { createTheme, ThemeProvider, Backdrop, CircularProgress } from "@mui/material";
import Callibration from './pages/Callibration';
import Feedback from './pages/Feedback';
import Approval from './pages/Approval';
import useAuth from './hooks/useAuth';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      background: {
        default: "#eeeeee",
        paper: "#fff",
      },
      textColors: {
        default: "#000000",
        contrast: "#ffffff",
        asterisk: "#d32f2f",
      },
    },
  });
  const { loading, user } = useAuth()
  return (
    <ThemeProvider theme={theme}>

      <Notification />
      <Routes>
        {/* //public Routes */}
        <Route element={<PersistentUserLogin />} >
          <Route element={<PublicRoutes />} >
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
          </Route>

          <Route element={<RequireAuth />} >
            <Route exact path='/' element={<Home />} >
              <Route exact path='/' element={<Callibration />} />
              <Route exact path='/callibration' element={<Callibration />} />
              <Route exact path='/employees' element={<Employee />} />
              <Route exact path='/feedback' element={<Feedback />} />
              {user?.isAdmin && <Route exact path='/approval' element={<Approval />} />}
            </Route>

          </Route>
        </Route>

      </Routes>
      <Backdrop
        sx={{ color: 'primary.dark', zIndex: (theme) => theme.zIndex.drawer + 1500 }}
        open={loading}

      >
        <CircularProgress size={80} color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;
