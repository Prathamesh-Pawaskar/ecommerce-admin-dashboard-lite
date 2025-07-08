import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const defaultProductState = {
  id: '',
  title: '',
  price: '',
  stock: '',
  description: '',
  image: '', 
  imageFile: null, 
};

function ProductFormModal({ open, onClose, product, onSubmit }) {
  const [formData, setFormData] = useState(defaultProductState);
  const [errors, setErrors] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        title: product.title || '',
        price: product.price || '',
        stock: product.stock || '',
        description: product.description || '',
        image: product.image || '', 
        imageFile: null, 
      });
      setImagePreviewUrl(product.image || ''); 
    } else {
      setFormData(defaultProductState);
      setImagePreviewUrl('');
    }
    setErrors({}); 
  }, [product, open]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, imageFile: file, image: '' })); 
      setImagePreviewUrl(URL.createObjectURL(file)); 
      if (errors.image) {
        setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, imageFile: null }));
 
      if (!product?.image) {
        setImagePreviewUrl('');
      }
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = 'Title is required.';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      tempErrors.price = 'Valid price is required.';
    }
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      tempErrors.stock = 'Valid stock quantity is required.';
    }
    if (!formData.description) tempErrors.description = 'Description is required.';
    
  
    if (!product && !formData.imageFile) {
        tempErrors.image = 'Product image is required.';
    }
    if (product && !product.image && !formData.imageFile) {
      tempErrors.image = 'Product image is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalProduct = {
        ...formData,
        id: formData.id || `PROD${Date.now()}`, 
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: imagePreviewUrl || product?.image || 'https://via.placeholder.com/60?text=No+Image',
      };
      onSubmit(finalProduct);
      onClose(); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', color: '#34495e', borderBottom: '1px solid #eee', pb: 2 }}>
        {product ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ step: "0.01" }} // Allow decimal values for price
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Stock Quantity"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            error={!!errors.stock}
            helperText={errors.stock}
            inputProps={{ min: 0 }} // Prevent negative stock values
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />

          <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ mr: 2, mb: { xs: 1, sm: 0 } }}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Product Preview"
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
              />
            )}
            {errors.image && (
                <Typography color="error" variant="caption" sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}>
                    {errors.image}
                </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #eee', pt: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#2c3e50' }}>
          {product ? 'Save Changes' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductFormModal;