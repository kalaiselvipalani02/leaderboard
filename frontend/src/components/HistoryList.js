
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import API from '../api';

const HistoryList = ({ selectedUser, userName, refresh }) => {

  const [history, setHistory] = useState([]);


  const fetchHistory = async () => {
    if (!selectedUser) return;
    const res = await API.get(`/users/${selectedUser}/history`);
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, [selectedUser, refresh]); 
  
 
 
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6">Claim History {userName || 'Unknown User'}</Typography>
      <List>
        {history.map(h => (
          <ListItem key={h._id}>
            <ListItemText
              primary={`+${h.points} points`}
              secondary={new Date(h.claimedAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HistoryList;
