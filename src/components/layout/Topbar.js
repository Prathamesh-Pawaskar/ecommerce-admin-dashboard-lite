import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';

function Topbar({ onMenuClick }) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2c3e50', borderRadius: '8px', margin: '10px', width: 'calc(100% - 20px)' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Welcome, Admin!
          </Typography>
          <img
            src="https://placehold.co/30x30/aabbcc/ffffff?text=AD"
            alt="Admin Avatar"
            style={{ borderRadius: '50%', border: '1px solid #fff' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;