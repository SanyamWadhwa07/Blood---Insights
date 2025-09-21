import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Container, Grid, Paper, Chip } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Main = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9ff 40%, #fbe9e7 80%, #e0f7fa 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative SVG blobs */}
            <Box sx={{
                position: 'absolute',
                top: { xs: '-100px', md: '-160px' },
                left: { xs: '-120px', md: '-200px' },
                zIndex: 0,
                opacity: 0.16,
            }}>
                <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M500,350Q420,500,300,500Q180,500,100,350Q20,200,180,100Q340,0,460,120Q580,240,500,350Z" fill="#00bcd4" />
                </svg>
            </Box>
            <Box sx={{
                position: 'absolute',
                bottom: { xs: '-120px', md: '-180px' },
                right: { xs: '-100px', md: '-160px' },
                zIndex: 0,
                opacity: 0.13,
            }}>
                <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M400,300Q350,400,250,400Q150,400,100,300Q50,200,150,100Q250,0,350,100Q450,200,400,300Z" fill="#e53935" />
                </svg>
            </Box>
            {/* AppBar moved to App.jsx for global navigation */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-start' },
                            mt: { xs: 2, md: 6 },
                        }}>
                            <Chip
                                icon={<BoltIcon sx={{ color: '#fff' }} />}
                                label="AI-powered Health Analysis"
                                sx={{ bgcolor: '#e53935', color: '#fff', fontWeight: 700, mb: 2, fontSize: 18, px: 2, py: 1, borderRadius: 2, boxShadow: 2 }}
                            />
                            <Typography variant="h2" sx={{ fontWeight: 900, color: '#213547', mb: 2, textAlign: { xs: 'center', md: 'left' }, letterSpacing: 1, fontSize: { xs: 36, md: 56 } }}>
                                Blood Insights
                            </Typography>
                            <Typography variant="h5" sx={{ color: '#1976d2', mb: 4, textAlign: { xs: 'center', md: 'left' }, fontWeight: 500, fontSize: { xs: 18, md: 28 } }}>
                                Unlock the secrets of your blood test—<span style={{ color: '#e53935', fontWeight: 700 }}>get instant, expert-backed health insights</span>
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: 8,
                                    fontWeight: 700,
                                    px: 5,
                                    py: 1.8,
                                    fontSize: 22,
                                    bgcolor: 'linear-gradient(90deg, #00bcd4 0%, #1976d2 100%)',
                                    background: 'linear-gradient(90deg, #00bcd4 0%, #1976d2 100%)',
                                    color: '#fff',
                                    boxShadow: '0 4px 24px 0 #1976d233',
                                    transition: 'transform 0.2s',
                                    ':hover': {
                                        transform: 'scale(1.06)',
                                        background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                                    },
                                }}
                                onClick={() => navigate('/report')}
                            >
                                GET STARTED
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={8} sx={{
                            borderRadius: 8,
                            overflow: 'hidden',
                            bgcolor: '#fff',
                            p: 3,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 8px 32px 0 #1976d233',
                            animation: 'float 2.5s ease-in-out infinite alternate',
                        }}>
                            <LocalHospitalIcon sx={{ fontSize: 160, color: 'primary.main', filter: 'drop-shadow(0 8px 32px #1976d233)' }} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/* Keyframes for animation */}
            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 #e5393540; }
                    100% { box-shadow: 0 0 24px 12px #e5393533; }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-18px); }
                }
            `}</style>
        </Box>
    );
};

export default Main;
