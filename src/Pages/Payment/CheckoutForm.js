import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../../contexts/AuthProvider";

const CheckoutForm = ({ course }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const date = new Date();
  const { price } = course;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError('')
    }
    setSuccess('');
    setProcessing(true)
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }


    if (paymentIntent.status === "succeeded") {

      const payment = {
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        price,
        courseName: course.courseName,
        courseId: course._id,
        date,
      }
      fetch("http://localhost:5000/app/payment", {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.insertedId) {
            setSuccess('Congrats! your payment completed');
            setTransactionId(paymentIntent.id);
          }
        })
    }
    setProcessing(false)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Some test card numbers
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              4242 4242 4242 4242
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              5555 5555 5555 4444
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              4000 0566 5566 5566
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment
            </Typography>
            <form onSubmit={handleSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                fullWidth
                sx={{ mt: 2 }}
              >
                Pay
              </Button>
            </form>
            {cardError && <Typography variant="body2" color="error">{cardError}</Typography>}
            {success && (
              <div>
                <Typography variant="body2" color="success">{success}</Typography>
                <Typography variant="body2">
                  Your transaction id: <b>{transactionId}</b>
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CheckoutForm;
