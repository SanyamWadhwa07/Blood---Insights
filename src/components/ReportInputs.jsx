
import React, { useState } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

function ReportInputs(props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 180, m: 1, borderRadius: 3, bgcolor: '#f8fafd' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} color="primary" />}
                    label={<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{props.heading}</Typography>}
                />
                {isChecked && (
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Enter value"
                        onChange={props.onChange}
                        value={props.value}
                        name={props.name}
                        sx={{ mt: 1, width: '90%' }}
                    />
                )}
            </CardContent>
        </Card>
    );
}

export default ReportInputs;
