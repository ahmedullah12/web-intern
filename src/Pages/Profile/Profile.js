import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Typography, Box, Paper } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/app/user?email=${user?.email}`
      );

      const data = await res.data.user;
      return data;
    },
  });

  if (isLoading) return <p>Loading....</p>;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
      }}
    >
      <Paper elevation={3} sx={{ width: "500px",padding: "20px", textAlign: "center" }}>
        <img
          src={userData?.image}
          alt={userData?.username}
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "20px",
          }}
        />
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          {userData?.username}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {userData?.email}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
