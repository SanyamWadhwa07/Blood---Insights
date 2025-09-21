// import React, { useState } from 'react';
// import axios from 'axios';
import React from 'react';
import './App.css';
import Main from './components/Main';
import About from './components/About';
import Report from './components/Report';
import ReportInputs from './components/ReportInputs';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Avatar, Button } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

function App() {
    const location = useLocation();
    return (
        <>
            <AppBar position="static" color="primary" elevation={2} sx={{ bgcolor: '#213547', zIndex: 2 }}>
                <Toolbar sx={{ minHeight: 72, px: { xs: 1, sm: 4 } }}>
                    <Avatar sx={{ bgcolor: '#e53935', mr: 2, animation: 'pulse 1.5s infinite alternate', width: 48, height: 48 }}>
                        <BloodtypeIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 1, fontSize: 28 }}>
                        Blood Insights
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 600,
                            fontSize: 18,
                            mx: 1.5,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            background: location.pathname === '/' ? 'rgba(0,188,212,0.12)' : 'transparent',
                            textDecoration: location.pathname === '/' ? 'underline' : 'none',
                            transition: 'background 0.2s',
                            ':hover': {
                                background: 'rgba(0,188,212,0.18)',
                                color: '#00bcd4',
                            },
                        }}
                    >
                        HOME
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                        sx={{
                            fontWeight: 600,
                            fontSize: 18,
                            mx: 1.5,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            background: location.pathname === '/about' ? 'rgba(0,188,212,0.12)' : 'transparent',
                            textDecoration: location.pathname === '/about' ? 'underline' : 'none',
                            transition: 'background 0.2s',
                            ':hover': {
                                background: 'rgba(0,188,212,0.18)',
                                color: '#00bcd4',
                            },
                        }}
                    >
                        ABOUT
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/report"
                        sx={{
                            fontWeight: 600,
                            fontSize: 18,
                            mx: 1.5,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            background: location.pathname === '/report' ? 'rgba(0,188,212,0.12)' : 'transparent',
                            textDecoration: location.pathname === '/report' ? 'underline' : 'none',
                            transition: 'background 0.2s',
                            ':hover': {
                                background: 'rgba(0,188,212,0.18)',
                                color: '#00bcd4',
                            },
                        }}
                    >
                        REPORT
                    </Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/report" element={<Report />} />
            </Routes>
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 #e5393540; }
                    100% { box-shadow: 0 0 24px 12px #e5393533; }
                }
            `}</style>
        </>
    );
}

export default App;
