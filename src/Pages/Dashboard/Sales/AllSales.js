import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";

const OrdersStats = () => {
  const [orders, setOrders] = useState([]);
  const [timeFrame, setTimeFrame] = useState("today"); // Default value is today

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          "https://web-intern-server-production.up.railway.app/app/orders"
        );
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  const calculateCoursesSold = (startDate, endDate) => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });
    return filteredOrders.length;
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  let coursesSold;
  switch (timeFrame) {
    case "today":
      coursesSold = calculateCoursesSold(startOfToday, endOfToday);
      break;
    case "1week":
      coursesSold = calculateCoursesSold(oneWeekAgo, today);
      break;
    case "1month":
      coursesSold = calculateCoursesSold(oneMonthAgo, today);
      break;
    case "1year":
      coursesSold = calculateCoursesSold(oneYearAgo, today);
      break;
    case "lifetime":
      coursesSold = orders.length;
      break;
    default:
      coursesSold = 0;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Courses Sales Statistics
      </Typography>
      <div>
        <Button
          onClick={() => handleTimeFrameChange("today")}
          variant={timeFrame === "today" ? "contained" : "outlined"}
          color="primary"
          sx={{ mr: 1 }}
        >
          Today
        </Button>
        <Button
          onClick={() => handleTimeFrameChange("1week")}
          variant={timeFrame === "1week" ? "contained" : "outlined"}
          color="primary"
          sx={{ mr: 1 }}
        >
          1 Week
        </Button>
        <Button
          onClick={() => handleTimeFrameChange("1month")}
          variant={timeFrame === "1month" ? "contained" : "outlined"}
          color="primary"
          sx={{ mr: 1 }}
        >
          1 Month
        </Button>
        <Button
          onClick={() => handleTimeFrameChange("1year")}
          variant={timeFrame === "1year" ? "contained" : "outlined"}
          color="primary"
          sx={{ mr: 1 }}
        >
          1 Year
        </Button>
        <Button
          onClick={() => handleTimeFrameChange("lifetime")}
          variant={timeFrame === "lifetime" ? "contained" : "outlined"}
          color="primary"
        >
          Lifetime
        </Button>
      </div>
      <p>Courses Sold: {coursesSold}</p>
    </div>
  );
};

export default OrdersStats;
