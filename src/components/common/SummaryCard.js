import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function SummaryCard({ title, value, icon, backgroundColor, textColor }) {
  return (
    <Card
      sx={{
        minWidth: 200,
        backgroundColor: backgroundColor || '#ffffff', 
        color: textColor || '#333333',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon && (
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {React.cloneElement(icon, { sx: { fontSize: 32, color: textColor || '#2c3e50' } })}
            </Box>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;