import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

const TransactPage = () => {

  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [potentialReceivers, setPotentialReceivers] = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);





  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUserDetails(response.data);
        console.log('User details fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchPotentialReceivers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users?exclude=${userId}`);
        setPotentialReceivers(response.data);
        console.log('Potential receivers fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching potential receivers:', error);
      }
    };

    fetchUserDetails();
    fetchPotentialReceivers();
  }, [userId, loading]);

  const handleTransact = async () => {
    try {
      const data = {
        receiverId: selectedReceiverId,
        amount: parseFloat(amount),
      };

      const confirmed = window.confirm('Are you sure you want to proceed with the transaction?');

      if (confirmed) {
        // Log data for debugging
        console.log('Navigating to loading page...');
        navigate(`/loading/${userId}`);

        // Perform the transaction
        const url = `http://localhost:8080/api/transactions/${userId}`;

        console.log('Request URL:', url);
        const response = await axios.post(url, null, { params: { ...data } });

        // Check if the transaction was successful
        if (response.status === 200) {
          // Update sender and receiver amounts
          const updatedSender = { ...userDetails };
          const updatedReceiver = potentialReceivers.find((receiver) => receiver.id === selectedReceiverId);

          // Check if userDetails and currentBalance exist
          if (updatedSender && 'currentBalance' in updatedSender) {
            updatedSender.currentBalance -= parseFloat(amount);
            // Update the user state with the new sender details
            setUserDetails(updatedSender);
          } else {
            console.error('Error updating sender amount: User details or balance not found.');
          }

          // Check if updatedReceiver exists and has currentBalance property
          if (updatedReceiver && 'currentBalance' in updatedReceiver) {
            updatedReceiver.currentBalance += parseFloat(amount);
            // Set the updated receivers array
            setPotentialReceivers((prevReceivers) =>
              prevReceivers.map((receiver) =>
                receiver.id === selectedReceiverId ? updatedReceiver : receiver
              )
            );

            // Show success message
            navigate(`/success/${userId}`);
            } else {
            console.error('Error updating receiver amount: Receiver details or balance not found.');
          }
        } else {
          console.error('Transaction failed. Status code:', response.status);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error performing transaction:', error);

      
      alert('Transaction failed. Please try again later.');

      
    }
  };

  
  return (
    <div>
      <div className="container flex-col flex items-center mb-8">
        
        <div className='pt-7 flex mb-4'>
          <h2 className="text-2xl p-2 font-bold bg-primary rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l shadow-lg" style={{ fontSize: '24px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>Welcome {userDetails.name}</h2>
        </div>
        
        <div className="user-details-box-container" style={{ width: '40%', margin: '0-20%' }}>
          <div className="user-details-box p-4 mb-4" style={{ width: '100%', border: '20px solid #ccc', borderRadius: '20px' }}>
            <div className="container p-3 flex-col flex items-center " style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
              <h3>Your Details</h3>
            </div>
            <h3 className='p-2'>Name<span style={{ color: 'grey' }}> {userDetails.name}</span></h3>
            <p className='p-2'>Email <span style={{ color: 'grey' }}> {userDetails.email}</span></p>
            <p className='p-2'>Current Balance<span style={{ color: 'grey' }}>  {userDetails.currentBalance}</span></p>

            <h2 className='p-2 container p-3 flex-col flex items-center' style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Transact</h2>
            <div>
  <label className='p-2'>Select Receiver</label>
  <span style={{ color: 'grey' }}>
    <select
      value={selectedReceiverId}
      onChange={(e) => setSelectedReceiverId(e.target.value)}
    >
      <option value="" disabled>
        Select receiver
      </option>
      {potentialReceivers
        .filter((receiver) => receiver.name !== userDetails.name) // Exclude the sender from the list
        .map((receiver) => (
          <option key={receiver.id} value={receiver.id}>
            {receiver.name}
          </option>
        ))}
    </select>
  </span>
</div>
            <div className='p-2 '>
              <label className='p-2'>Amount</label>
              <input
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ backgroundColor: '#ccc' }}
              />
              {userDetails.currentBalance < parseFloat(amount) && (
                <p style={{ color: 'red' }}>Insufficient balance</p>
              )}
            </div>

            <div className='container p-1 flex-col flex items-center font-bold bg-primary rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l shadow-lg'>
              <button onClick={handleTransact} disabled={loading}>{loading ? 'Processing...' : 'Submit'}</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactPage;
