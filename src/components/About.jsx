import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip, Stack } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BoltIcon from '@mui/icons-material/Bolt';
import ScienceIcon from '@mui/icons-material/Science';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function About() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9ff 40%, #fbe9e7 80%, #e0f7fa 100%)',
                py: 8,
                px: { xs: 2, md: 8 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative SVG blob */}
            <Box sx={{
                position: 'absolute',
                top: { xs: '-100px', md: '-160px' },
                left: { xs: '-120px', md: '-200px' },
                zIndex: 0,
                opacity: 0.13,
            }}>
                <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M500,350Q420,500,300,500Q180,500,100,350Q20,200,180,100Q340,0,460,120Q580,240,500,350Z" fill="#00bcd4" />
                </svg>
            </Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#213547', mb: 2, letterSpacing: 1, textAlign: 'center' }}>
                <InfoOutlinedIcon sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle', color: '#1976d2' }} /> Project Overview
            </Typography>
            <Typography variant="h5" sx={{ color: '#1976d2', mb: 4, fontWeight: 600, textAlign: 'center' }}>
                AI-powered Blood Report Analysis Platform
            </Typography>
            <Avatar
                alt="Logo"
                sx={{ width: 120, height: 120, bgcolor: '#fff', boxShadow: 3, mb: 3 }}
            >
                <LocalHospitalIcon sx={{ fontSize: 90, color: 'primary.main' }} />
            </Avatar>
            <Card elevation={4} sx={{ borderRadius: 4, bgcolor: 'white', px: { xs: 2, md: 4 }, py: 3, maxWidth: 700, mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#182d76' }}>
                        What is Blood Insights?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Blood Insights is a modern web application that leverages AI to provide instant, easy-to-understand analysis of your blood test reports. Upload your PDF report or enter values manually, and receive actionable health recommendations, dietary advice, and doctor suggestions—all in a beautiful, user-friendly interface.
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mb: 2 }}>
                        <Chip icon={<BoltIcon />} label="AI Health Analysis" color="primary" sx={{ fontWeight: 600 }} />
                        <Chip icon={<CloudUploadIcon />} label="PDF Extraction" color="info" sx={{ fontWeight: 600 }} />
                        <Chip icon={<ScienceIcon />} label="Dynamic Test Fields" color="success" sx={{ fontWeight: 600 }} />
                        <Chip icon={<AutoAwesomeIcon />} label="Modern UI/UX" color="secondary" sx={{ fontWeight: 600 }} />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>Key Features:</Typography>
                    <ul style={{ color: '#213547', fontSize: 17, marginLeft: 20, marginBottom: 0 }}>
                        <li>AI-powered, personalized blood report analysis and recommendations</li>
                        <li>Automatic PDF extraction of test values</li>
                        <li>Dynamic, categorized input fields for any blood test</li>
                        <li>Instant, private, and secure—no data stored</li>
                        <li>Modern, responsive design with Material UI</li>
                    </ul>
                </CardContent>
            </Card>
            <Card elevation={2} sx={{ borderRadius: 4, bgcolor: '#f8fafc', px: { xs: 2, md: 4 }, py: 2, maxWidth: 700 }}>
                <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>Tech Stack:</Typography>
                    <ul style={{ color: '#213547', fontSize: 16, marginLeft: 20, marginBottom: 0 }}>
                        <li>Frontend: React, Material UI, Vite</li>
                        <li>Backend: Flask (Python), pdfplumber, Hugging Face Transformers</li>
                        <li>PDF Extraction: pdfplumber</li>
                        <li>AI/ML: Hugging Face Transformers (local or API)</li>
                    </ul>
                </CardContent>
            </Card>
        </Box>
    );
}

export default About;