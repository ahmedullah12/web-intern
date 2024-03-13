import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const {signUpWithEmail} = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm();


  const handleSignUp = (data) => {
    console.log(data);
    signUpWithEmail(data.email, data.password)
    .then(res => {
        console.log(res.user);
    })
    .catch(err => {
        console.log(err);
        const errorMessage = err.message;
        const errorCode = errorMessage.startsWith('Firebase: Error (auth/') ? errorMessage.slice(22, -2) : errorMessage;
        setSignUpError(errorCode);
    })
  };

  const handleInputChange = () => {
    setSignUpError(""); // Reset loginError when user interacts with input fields
  };
  return (
    <div
      style={{
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "480px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            margin="normal"
            type="text"
            {...register("name", {
                required: "Name is required"
            })}
            error={!!errors.name}
            helperText={errors.name?.message} 
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            {...register("email", {
                required: "Email is required"
            })}
            error={!!errors.email || signUpError.includes('email-already-in-use')}
            helperText={errors.email?.message || (signUpError.includes('email-already-in-use') ? signUpError : '')}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            {...register("password", {
                required: "Password is required",
                minLength: {value: 8, message: "Password should be 8 character or long"}
            })}
            error={!!errors.password}
            helperText={errors.password?.message} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
