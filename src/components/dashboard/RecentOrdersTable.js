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
  TablePagination, 
} from '@mui/material';
import { visuallyHidden } from '@mui/utils'; 

function RecentOrdersTable({ orders }) {
  const [orderBy, setOrderBy] = useState('date'); 
  const [order, setOrder] = useState('desc'); 

  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5); 


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
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };


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


  const sortedOrders = useMemo(() => {

    const preparedOrders = orders.map(order => ({
      ...order,

      dateSortable: new Date(order.date),
 
      totalSortable: parseFloat(String(order.total).replace(/[^0-9.-]+/g,""))
    }));

    const actualOrderBy = orderBy === 'date' ? 'dateSortable' : (orderBy === 'total' ? 'totalSortable' : orderBy);

    return stableSort(preparedOrders, getComparator(order, actualOrderBy));
  }, [order, orderBy, orders]); 

  const paginatedOrders = useMemo(() => {
      return sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  const headCells = [
    { id: 'id', label: 'Order ID' },
    { id: 'customer', label: 'Customer' },
    { id: 'date', label: 'Date' },
    { id: 'total', label: 'Total' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="recent orders table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ fontWeight: 'bold', color: '#34495e' }}
              >
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
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedOrders.map((row) => ( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>${row.total.toFixed(2)}</TableCell> 
              <TableCell>
                <span
                  className={`badge bg-${
                    row.status === 'Delivered' ? 'success' :
                    row.status === 'Pending' ? 'warning' :
                    row.status === 'Cancelled' ? 'danger' : 'info'
                  }`}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {paginatedOrders.length === 0 && ( 
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 3 }}>
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedOrders.length}
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
    </TableContainer>
  );
}

export default RecentOrdersTable;