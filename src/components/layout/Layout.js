import React, { useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Box, CssBaseline, useTheme } from '@mui/material'; 


function Layout({ children }) {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}> 
      <CssBaseline />

      <Topbar onMenuClick={handleDrawerToggle} />

      <Sidebar open={sidebarOpen} onClose={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1, 
          p: 3, 
          width: '100%', 
          marginTop: '64px', 
          [theme.breakpoints.up('md')]: {
            // Later implement a permanent sidebar on desktop
          },
        }}
      >
        {children} 
      </Box>
    </Box>
  );
}

export default Layout;