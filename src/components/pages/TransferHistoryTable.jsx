import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // ... (existing styles)
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // ... (existing styles)
}));

const TransferHistoryTable = () => {
  const [transferHistory, setTransferHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransferHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/transfer-history');
        setTransferHistory(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transfer history:', error);
        setLoading(false);
      }
    };

    fetchTransferHistory();
  }, []);

  const formatDateTime = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <div className="container flex-col flex items-center mb-8">
    <div className=' pt-7 flex mb-6  '>
      <h2 className='text-2xl font-bold bg-primary p-3 rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 shadow-lg'
        style={{ fontSize: '24px' ,fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> SYS
        <span className="inline-block font-bold text-primary">BANK</span> Transfer History</h2>
     </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className='text-2xl font-bold bg-primary p-3 rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 shadow-lg'>
                <TableRow>
                  <StyledTableCell style={{ color: 'white' }}>ID</StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }}>Sender</StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }}>Receiver</StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }}>Amount</StyledTableCell>
                  <StyledTableCell style={{ color: 'white' }}>Date & Time</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transferHistory.map((transfer) => (
                  <StyledTableRow key={transfer.id}>
                    <StyledTableCell>{transfer.id}</StyledTableCell>
                    <StyledTableCell>{transfer.senderName}</StyledTableCell>
                    <StyledTableCell>{transfer.receiverName}</StyledTableCell>
                    <StyledTableCell>{transfer.sentAmount}</StyledTableCell>
                    <StyledTableCell>{formatDateTime(transfer.timestamp)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default TransferHistoryTable;
