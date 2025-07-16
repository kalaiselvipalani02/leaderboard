import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import API from "../api";

const UserList = ({ selectedUser, setSelectedUser , refresh }) => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });  

  const fectUser = async () => {
    const response = await API.get("/users");
    const data = response.data;
    setUsers(data);
  };

  useEffect(() => {
    fectUser();
  }, [refresh]);

  const handleAddUser = async () => {
   if (!newUserName || !newUserName.trim()) {
    setSnack({
      open: true,
      message: 'Please enter a user name',
      severity: 'error',
    });
    return;
  }
    try {
    await API.post("/users", { name: newUserName.trim() });
    setNewUserName("");
    fectUser();
    setSnack({
      open: true,
      message: 'User added successfully!',
      severity: 'success',
    });
  } catch (error) {
    console.error("Error adding user:", error.message);
    setSnack({
      open: true,
      message: 'Failed to add user',
      severity: 'error',
    });
  }
};
  

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>
      <List sx={{ border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
        {users.map((user , index) => (
         <React.Fragment key={user._id}>
    <ListItem disablePadding>
      <ListItemButton
        selected={selectedUser === user._id}
        onClick={() => setSelectedUser({ id: user._id, name: user.name })}
      >
        <ListItemText primary={user.name} />
      </ListItemButton>
    </ListItem>
    {index < users.length - 1 && <hr style={{ margin: 0, borderColor: "#eee" }} />} 
    {/* Optional: Use <Divider /> from MUI */}
  </React.Fragment>
        ))}
      </List>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="New User Name"
          variant="outlined"
          size="small"
          fullWidth
          value={newUserName}
          required
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddUser}>
          Add
        </Button>
      </Box>
      <Snackbar
  open={snack.open}
  autoHideDuration={3000}
  onClose={() => setSnack({ ...snack, open: false })}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert
    severity={snack.severity}
    onClose={() => setSnack({ ...snack, open: false })}
    sx={{ width: '100%' }}
  >
    {snack.message}
  </Alert>
</Snackbar>
    </Box>

    
  );
};

export default UserList;
