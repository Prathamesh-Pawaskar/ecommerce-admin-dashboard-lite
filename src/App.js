import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage'; 
import ProductManagementPage from './pages/ProductManagementPage'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductManagementPage />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} /> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;