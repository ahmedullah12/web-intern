import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProfileModal from "../../components/UpdateProfileModal/UpdateProfileModal";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [referedOrders, setReferedOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user],
    queryFn: async () => {
      const res = await axios.get(
        `https://web-intern-server-production.up.railway.app/app/user?email=${user?.email}`
      );

      const data = await res.data.user;
      return data;
    },
  });

  useEffect(() => {
    axios
      .get(
        `https://web-intern-server-production.up.railway.app/app/user-orders?email=${user?.email}`
      )
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    axios
      .get(
        `https://web-intern-server-production.up.railway.app/app/referedOrders?email=${user?.email}`
      )
      .then((res) => {
        setReferedOrders(res.data.orders);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <p>Loading....</p>;
  return (
    <Container>
      <Box sx={{ mb: 4, mt: "25px", position: "relative" }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" textAlign={"center"}>
            Your Profile
          </Typography>
          <IconButton
            onClick={handleOpenModal}
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            <EditIcon />
          </IconButton>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} textAlign="center">
              <img
                src={userData?.image}
                alt={userData?.username}
                style={{
                  width: "200px",
                  height: "200px",
                  marginBottom: "20px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Name: {userData?.username}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Email: {userData?.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <UpdateProfileModal
          open={openModal}
          handleCloseModal={handleCloseModal}
          userData={userData}
          refetch={refetch}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Orders
          </Typography>
          <List>
            {orders.map((order, index) => (
              <ListItem
                key={index}
                sx={{ border: "1px solid gray", mb: 2, p: 2 }}
              >
                <ListItemText
                  primary={order.courseName}
                  secondary={`Price: ${order.price}, Date: ${moment(
                    order.date
                  ).format("MMMM Do YYYY")}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Box mb={"30px"}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Referred Orders
          </Typography>
          <Typography variant="body1">
            You have referred {referedOrders.length} orders.
          </Typography>
          <List>
            {referedOrders.map((referedOrder, index) => (
              <ListItem
                key={index}
                sx={{ border: "1px solid gray", mb: 2, p: 2 }}
              >
                <ListItemText
                  primary={`Buyer Name: ${referedOrder.buyerName}`}
                  secondary={`Buyer Email: ${referedOrder.buyerEmail}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
