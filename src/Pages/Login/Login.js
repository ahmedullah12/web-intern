import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {loginWithEmail} = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    loginWithEmail(data.email, data.password)
    .then(res => {
        console.log(res.user);
        if(res.user){
          navigate(from, {replace: true});
        }
    })
    .catch(err => {
        console.log(err);
        const errorMessage = err.message;
        const errorCode = errorMessage.startsWith('Firebase: Error (auth/') ? errorMessage.slice(22, -2) : errorMessage;
        setLoginError(errorCode);
    }) 
  };

  const handleInputChange = () => {
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
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
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
            error={!!errors.email || loginError.includes('user-not-found')}
            helperText={errors.email?.message || (loginError.includes('user-not-found') ? loginError : '')}
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
            error={!!errors.password || loginError.includes('wrong-password')}
            helperText={errors.password?.message || (loginError.includes('wrong-password') ? loginError : '')}
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
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Sign In
          </Button>
        </form>
        <p>New to CourseLounge? Please <Link to={"/signup"}>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
