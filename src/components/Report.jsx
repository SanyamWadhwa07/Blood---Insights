import React, { useState, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceIcon from '@mui/icons-material/Science';
import OpacityIcon from '@mui/icons-material/Opacity';
import BiotechIcon from '@mui/icons-material/Biotech';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Box, Typography, Grid, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import ReportInputs from './ReportInputs';

function Report() {
    // Store extracted fields as { label: value }
    const [inputs, setInputs] = useState({
        'Haemoglobin (g/dL)': '',
        'RBC Count (millions/μL)': '',
        'Total WBC Count (cells/μL)': '',
        'Platelet Count (lakhs/μL)': '',
        'Neutrophils (%)': '',
        'Lymphocytes (%)': '',
        'Monocytes (%)': '',
        'Eosinophils (%)': '',
        'Basophils (%)': '',
        'Fasting Glucose (mg/dL)': '',
        'Urea (mg/dL)': '',
        'Creatinine (mg/dL)': '',
        'Total Cholesterol (mg/dL)': '',
        'HDL Cholesterol (mg/dL)': '',
        'LDL Cholesterol (mg/dL)': '',
        'Triglycerides (mg/dL)': '',
        'TSH (μIU/mL)': '',
        'T3 (ng/dL)': '',
        'T4 (μg/dL)': '',
    });

    // Define categories and their fields
    const categories = [
        {
            name: 'Complete Blood Count (CBC)',
            icon: <OpacityIcon color="primary" sx={{ mr: 1 }} />,
            fields: [
                'Haemoglobin (g/dL)',
                'RBC Count (millions/μL)',
                'Total WBC Count (cells/μL)',
                'Platelet Count (lakhs/μL)'
            ]
        },
        {
            name: 'Differential Count',
            icon: <ScienceIcon color="secondary" sx={{ mr: 1 }} />,
            fields: [
                'Neutrophils (%)',
                'Lymphocytes (%)',
                'Monocytes (%)',
                'Eosinophils (%)',
                'Basophils (%)'
            ]
        },
        {
            name: 'Metabolic Panel',
            icon: <BiotechIcon color="success" sx={{ mr: 1 }} />,
            fields: [
                'Fasting Glucose (mg/dL)',
                'Urea (mg/dL)',
                'Creatinine (mg/dL)'
            ]
        },
        {
            name: 'Lipid Profile',
            icon: <FavoriteIcon color="error" sx={{ mr: 1 }} />,
            fields: [
                'Total Cholesterol (mg/dL)',
                'HDL Cholesterol (mg/dL)',
                'LDL Cholesterol (mg/dL)',
                'Triglycerides (mg/dL)'
            ]
        },
        {
            name: 'Thyroid Panel',
            icon: <LocalHospitalIcon color="info" sx={{ mr: 1 }} />,
            fields: [
                'TSH (μIU/mL)',
                'T3 (ng/dL)',
                'T4 (μg/dL)'
            ]
        }
    ];

    // No multi-step form; show all categories at once
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();
    // Map backend keys to input names
    // When PDF is uploaded, use all extracted fields
    const handlePdfUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('http://127.0.0.1:5000/extract-pdf', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.extracted) {
                setInputs(data.extracted);
            }
        } catch (err) {
            alert('Failed to extract PDF');
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    const [showDialog, setShowDialog] = useState(false);
    const [recommendations, setRecommendations] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    // Add new field
    const handleAddField = () => {
        setInputs((prev) => ({ ...prev, '': '' }));
    };

    // Remove a field
    const handleRemoveField = (name) => {
        setInputs((prev) => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', { inputs });
            setRecommendations(response.data.recommendations || 'No recommendations found.');
        } catch (error) {
            setRecommendations('Error submitting form. Please try again.');
        }
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    return (
        <Box sx={{
            py: 8,
            px: { xs: 2, md: 8 },
            background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9ff 40%, #fbe9e7 80%, #e0f7fa 100%)',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
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
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#213547', mb: 2, textAlign: 'center', letterSpacing: 1 }}>
                Blood Insights – Personalized Blood Report Analysis
            </Typography>
            <Typography variant="h6" sx={{ color: '#e53935', mb: 2, textAlign: 'center', fontWeight: 600 }}>
                Fast, reliable, and easy-to-understand blood test insights
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#213547', mb: 4, textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
                Unlock the meaning behind your blood test results. Enter your values below and receive instant, expert-backed explanations and actionable health recommendations. All data is private and never stored.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                    variant="outlined"
                    component="label"
                    color="primary"
                    disabled={uploading}
                    sx={{ fontWeight: 600, borderRadius: 3 }}
                >
                    {uploading ? 'Extracting PDF...' : 'Upload Blood Report PDF'}
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handlePdfUpload}
                        ref={fileInputRef}
                    />
                </Button>
            </Box>
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 4, background: 'rgba(255,255,255,0.97)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 700, textAlign: 'center' }}>
                        Enter Your Blood Test Parameters
                    </Typography>
                    {/* Show all categories at once, each in its own accordion */}
                    {categories.map((cat, i) => (
                        <Accordion key={cat.name} defaultExpanded sx={{ mb: 2, borderRadius: 2, boxShadow: 'none', border: '1px solid #e0e0e0', background: 'rgba(245,247,250,0.95)' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f7fa', borderRadius: 2 }}>
                                {cat.icon}
                                <Typography sx={{ fontWeight: 700 }}>{cat.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {cat.fields.map((name) => (
                                        <Grid item xs={12} sm={6} md={4} key={name}>
                                            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f8fafc', boxShadow: '0 2px 12px 0 #1976d211' }}>
                                                <Typography sx={{ fontWeight: 700, minWidth: 120, color: '#1976d2', mr: 1 }}>{name}</Typography>
                                                <input
                                                    type="text"
                                                    name={name}
                                                    value={inputs[name] || ''}
                                                    onChange={e => setInputs(prev => ({ ...prev, [name]: e.target.value }))}
                                                    style={{ width: '50%', border: '1px solid #ccc', borderRadius: 4, padding: 6, background: '#fff', fontWeight: 500 }}
                                                />
                                                <Button size="small" color="error" onClick={() => handleRemoveField(name)} sx={{ minWidth: 0, ml: 1, fontWeight: 700 }}>✕</Button>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    {/* Render any custom fields not in categories */}
                    {Object.entries(inputs).filter(([name]) => !categories.some(cat => cat.fields.includes(name))).length > 0 && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Accordion defaultExpanded sx={{ mb: 2, borderRadius: 2, boxShadow: 'none', border: '1px solid #e0e0e0', background: 'rgba(245,247,250,0.95)' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f7fa', borderRadius: 2 }}>
                                    <Typography sx={{ fontWeight: 700 }}><ScienceIcon sx={{ mr: 1 }} />Other Tests</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        {Object.entries(inputs).filter(([name]) => !categories.some(cat => cat.fields.includes(name))).map(([name, value], idx) => (
                                            <Grid item xs={12} sm={6} md={4} key={name + idx}>
                                                <Paper elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f8fafc', boxShadow: '0 2px 12px 0 #1976d211' }}>
                                                    <input
                                                        type="text"
                                                        name={name}
                                                        value={name}
                                                        onChange={e => {
                                                            const newName = e.target.value;
                                                            setInputs(prev => {
                                                                const copy = { ...prev };
                                                                const val = copy[name];
                                                                delete copy[name];
                                                                copy[newName] = val;
                                                                return copy;
                                                            });
                                                        }}
                                                        style={{ width: '50%', marginRight: 8, fontWeight: 600, border: '1px solid #ccc', borderRadius: 4, padding: 6, background: '#fff' }}
                                                    />
                                                    <input
                                                        type="text"
                                                        name={name}
                                                        value={value}
                                                        onChange={e => setInputs(prev => ({ ...prev, [name]: e.target.value }))}
                                                        style={{ width: '40%', border: '1px solid #ccc', borderRadius: 4, padding: 6, background: '#fff', fontWeight: 500 }}
                                                    />
                                                    <Button size="small" color="error" onClick={() => handleRemoveField(name)} sx={{ minWidth: 0, ml: 1, fontWeight: 700 }}>✕</Button>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant="outlined" color="primary" onClick={handleAddField} sx={{ mr: 2, fontWeight: 600, px: 3, py: 1, borderRadius: 3, fontSize: 18 }}>
                            + Add Test Field
                        </Button>
                        <Button type="submit" variant="contained" color="error" size="large" sx={{ borderRadius: 8, fontWeight: 700, px: 6, py: 1.5, fontSize: 20, boxShadow: '0 4px 24px 0 #e5393533' }}>
                            Analyze My Report
                        </Button>
                    </Box>
                </Paper>
            </form>
            <Dialog open={showDialog} onClose={handleDialogClose} fullScreen={fullScreen}>
                <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 800, fontSize: 28 }}>Your Personalized Results</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mt: 2, color: '#213547', fontSize: 18, lineHeight: 1.7 }}>{recommendations}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" variant="contained" sx={{ fontWeight: 700 }}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Report
