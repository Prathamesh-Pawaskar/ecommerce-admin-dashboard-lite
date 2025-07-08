import { Typography, Box, Grid } from '@mui/material';
import SummaryCard from '../components/common/SummaryCard';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import SalesChart from '../components/dashboard/SalesChart'; 
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { mockOrders, mockSalesData } from '../utils/mockData';

function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', mb: 4 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} className="mb-4">
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Sales"
            value="$45,678"
            icon={<AttachMoneyIcon />}
            backgroundColor="#e0f7fa"
            textColor="#00796b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Orders"
            value="1,234"
            icon={<ShoppingCartIcon />}
            backgroundColor="#ffe0b2"
            textColor="#e65100"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Active Users"
            value="567"
            icon={<PeopleIcon />}
            backgroundColor="#e8f5e9"
            textColor="#33691e"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 4, p: 3, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', mb: 3 }}>
          Recent Orders
        </Typography>
        <RecentOrdersTable orders={mockOrders} />
      </Box>


      <Box sx={{ mt: 4, p: 3, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', mb: 3 }}>
          Sales Data (Last 6 Months)
        </Typography>
        <SalesChart chartData={mockSalesData} /> 
      </Box>

    </Box>
  );
}

export default DashboardPage;