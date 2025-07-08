import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  TextField,
  IconButton,
  Button,
  TablePagination,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../common/ConfirmationModal'; 

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const descendingComparator = (a, b, orderBy) => {
  if (typeof a[orderBy] === 'string' && typeof b[orderBy] === 'string') {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
      return -1;
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
      return 1;
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
};

function ProductTable({ products, setProducts, onEditProduct, onAddProduct }) { 
  const [orderBy, setOrderBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setOpenDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productIdToDelete));
    console.log(`Product ${productIdToDelete} deleted.`);
    setOpenDeleteConfirm(false);
    setProductIdToDelete(null); 
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
    setProductIdToDelete(null);
  };

  const headCells = [
    { id: 'image', label: 'Image', sortable: false },
    { id: 'title', label: 'Title', sortable: true },
    { id: 'price', label: 'Price', sortable: true },
    { id: 'stock', label: 'Stock', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(product.id).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    const preparedProducts = filteredProducts.map(product => ({
      ...product,
      priceSortable: parseFloat(product.price),
      stockSortable: parseInt(product.stock, 10)
    }));

    const actualOrderBy = orderBy === 'price' ? 'priceSortable' : (orderBy === 'stock' ? 'stockSortable' : orderBy);

    return stableSort(preparedProducts, getComparator(order, actualOrderBy));
  }, [filteredProducts, order, orderBy]);

  const paginatedProducts = useMemo(() => {
    return sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedProducts, page, rowsPerPage]);

  return (
    <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
          sx={{ minWidth: 250, mb: { xs: 2, sm: 0 } }}
        />
        <Button variant="contained" color="primary" onClick={onAddProduct} sx={{ backgroundColor: '#2c3e50' }}>
          Add New Product
        </Button>
      </Box>

      <TableContainer>
        <Table aria-label="product table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ fontWeight: 'bold', color: '#34495e' }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={headCells.length} align="center" sx={{ py: 4 }}>
                        No products found.
                    </TableCell>
                </TableRow>
            ) : (
                paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                          <img
                              src={product.image}
                              alt={product.title}
                              style={{ width: 80, height: 80, borderRadius: '4px', objectFit: 'cover' }}
                          />
                      </TableCell>
                      <TableCell sx={{ fontWeight: '500' }}>{product.title}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`badge bg-${product.stock > 50 ? 'success' : product.stock > 10 ? 'warning' : 'danger'}`}
                        >
                          {product.stock} in stock
                        </span>
                      </TableCell>
                      <TableCell>
                          <IconButton color="primary" onClick={() => onEditProduct(product)}>
                              <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteClick(product.id)}>
                              <DeleteIcon />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '.MuiTablePagination-toolbar': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            flexWrap: 'wrap',
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            marginBottom: 0,
          },
          '.MuiTablePagination-actions': {
            marginLeft: 2,
          },
        }}
      />

      <ConfirmationModal
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete product ${productIdToDelete}?`}
      />
    </Paper>
  );
}

export default ProductTable;