import React , {useState , useEffect} from "react";
import { Paper , Typography,Table, TableHead,TableBody,TableCell,TableRow } from "@mui/material";
import API from "../api";


const LeaderBoard = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [refresh]);

  const fetchLeaderboard = async () => {
    const res = await API.get('/users/leaderboard');
    setUsers(res.data);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6">Leaderboard</Typography>
      <Table>
        <TableHead>
          <TableRow>
          
            <TableCell>User Name</TableCell>
            <TableCell>Total Points</TableCell>
            <TableCell>Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id} sx={index === 0 ? { backgroundColor: '#fff9c4' } : {}}>
        
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.totalPoints}</TableCell>
               <TableCell>{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LeaderBoard;
