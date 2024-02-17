import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

const CustomerPageList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUserTransaction = async (userId) => {
    try {
      // Perform the transaction or removal action for the selected user
      await axios.post(`http://localhost:8080/api/transactions/${userId}`);
      
      // Update the users state to reflect the change
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error performing transaction:', error);
    }
  };

  return (
    <div className="container flex-col flex items-center mb-8">
    <div className=' pt-7 flex mb-6  '>
      <h2 className='text-2xl font-bold bg-primary p-3 rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 shadow-lg'
       style={{ fontSize: '24px' ,fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> SYS
              <span className="inline-block font-bold text-primary">BANK</span>  Customers List</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table >
              <TableHead className='text-2xl font-bold bg-primary p-3 rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 shadow-lg'>
                <TableRow>
                  <StyledTableCell style={{
                      color: 'white'}} >ID</StyledTableCell>
                  <StyledTableCell style={{
                      color: 'white'}}>Name</StyledTableCell>
                  <StyledTableCell style={{
                      color: 'white'}}>Email</StyledTableCell>
                  <StyledTableCell style={{
                      color: 'white'}}>Current Balance</StyledTableCell>
                  <StyledTableCell style={{
                      color: 'white'}}>Operations</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>{user.id}</StyledTableCell>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.currentBalance}</StyledTableCell>
                    <StyledTableCell>
                      <Link to={`/transact/${user.id}`}>
                        <button
                          className="h-[30px] w-[70px] rounded-md bg-primary p-2 text-1xl text-white hover:bg-primary/90 item-center "
                        >
                          Transact
                        </button>
                      </Link>
                    </StyledTableCell>
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

export default CustomerPageList;
