import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, Toolbar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'; 

function Sidebar({ open, onClose }) {
  return (
    <Drawer
      variant="temporary" 
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }} 
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#34495e', 
          color: '#ecf0f1', 
          borderRadius: '0 8px 8px 0',
        },
      }}
    >
      <Toolbar sx={{
        justifyContent: 'space-between', 
        py: 2,
        px: 2 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
          E-Shop
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#ecf0f1' }}> 
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ backgroundColor: '#5a6a7c' }} />
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon sx={{ color: '#ecf0f1' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#ffffff' }}/>
        </ListItem>
        <ListItem button component={Link} to="/products" onClick={onClose}>
          <ListItemIcon sx={{ color: '#ecf0f1' }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" sx={{ color: '#ffffff' }}/>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} /> 
      <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid #5a6a7c' }}>
        <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
          Version 1.0
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;