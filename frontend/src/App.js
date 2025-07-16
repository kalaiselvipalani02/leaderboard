import "./App.css";
import { useState } from "react";
import UserList from "./components/UserList";
import ClaimButton from "./components/ClaimButton";
import HistoryList from "./components/HistoryList";
import LeaderBoard from "./components/LeaderBoard";
import { Container, Typography } from "@mui/material";

function App() {
  const [selectedUser, setSelectedUser] = useState({ id: "", name: "" });
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Leaderboard System
      </Typography>

      <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} refresh={refresh} />
      <ClaimButton selectedUser={selectedUser.id} onClaimed={triggerRefresh} />
      <LeaderBoard refresh={refresh}  />
      {selectedUser.id && <HistoryList selectedUser={selectedUser.id} userName={selectedUser.name} refresh={refresh} />}
    </Container>
  );
}

export default App;
