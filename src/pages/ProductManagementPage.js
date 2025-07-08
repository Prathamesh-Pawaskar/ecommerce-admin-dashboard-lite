import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import ProductTable from '../components/products/ProductTable';
import ProductFormModal from '../components/products/ProductFormModal'; 
import { mockProducts } from '../utils/mockData';

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); 

  useEffect(() => {
    setProducts(JSON.parse(JSON.stringify(mockProducts)));
  }, []);

  const handleAddProduct = () => {
    setCurrentProduct(null); 
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product); 
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(`Are you sure you want to delete product ${productId}?`)) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      console.log(`Product ${productId} deleted.`);
    }
  };

  const handleFormSubmit = (productData) => {
    if (productData.id && products.some(p => p.id === productData.id)) {
      setProducts(prevProducts =>
        prevProducts.map(p => (p.id === productData.id ? productData : p))
      );
      console.log("Product updated:", productData);
    } else {
      const newId = productData.id || `PROD${Date.now()}`;
      setProducts(prevProducts => [
        ...prevProducts,
        { ...productData, id: newId }
      ]);
      console.log("Product added:", productData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null); 
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e', mb: 4 }}>
        Product Management
      </Typography>

      <ProductTable
        products={products}
        setProducts={setProducts}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <ProductFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        product={currentProduct}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

export default ProductManagementPage;