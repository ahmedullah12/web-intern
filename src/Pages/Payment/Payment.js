import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { course } = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p>Loading....</p>
      </div>
    );
  }

  console.log(course);
  return (
    <div style={{ marginTop: "30px" }}>
      <Container maxWidth="lg">
        <Typography variant="h4">
          Payment for{" "}
          <span style={{ color: "chocolate" }}>{course.courseName}.</span>{" "}
        </Typography>
        <Typography variant="p">Please Pay ${course?.price} TK to buy the product.</Typography>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm course={course} />
          </Elements>
        </div>
      </Container>
    </div>
  );
};

export default Payment;
