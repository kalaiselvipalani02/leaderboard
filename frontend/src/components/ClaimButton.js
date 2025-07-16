import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import API from '../api';

const ClaimButton = ({ selectedUser, onClaimed }) => {
  const [snack, setSnack] = useState({ open: false, message: '' });




  const claimPoints = async () => {
    try {
    if (!selectedUser) return alert("Please select a user");
    
    const res = await API.post(`/claim/${selectedUser}`);

    setSnack({ open: true, message: res.data.message });
    console.log(snack)
    onClaimed();
    } catch(error ){
      console.error('Claim Error:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={claimPoints} sx={{ mt: 2 }}>Claim Points</Button>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity="success" onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ClaimButton;
