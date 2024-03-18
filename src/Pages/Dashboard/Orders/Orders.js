import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Orders = () => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/app/orders");
            const data = await res.data.orders;
            return data;
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Orders</Typography>
            <Grid container spacing={3}>
                {orders.map((order) => (
                    <Grid key={order._id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{order.courseName}</Typography>
                                <Typography variant="body1">
                                    <strong>Price:</strong> {order.price}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Buyer Name:</strong> {order.buyerName}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Buyer Email:</strong> {order.buyerEmail}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Orders;
