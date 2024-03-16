import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const { signUpWithEmail, saveUser, updateUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    console.log(data, profilePicture);
    const {email, password, name} = data;
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    if (profilePicture === null) {
      toast.error("Please upload a profile picture.");
      return; // Exit the function
    }
    
    signUpWithEmail(email, password)
      .then((res) => {
        if (res.user.uid) {
          const referLink = `http://localhost:3000/${res.user.email}`
          const formData = new FormData();
          formData.append('image', profilePicture);

          const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
          fetch(url, {
              method: "POST",
              body: formData
          })
          .then(res => res.json())
          .then(imgData => {
            if(imgData.success === true){
              const user = {username: name, email, referLink, image: imgData.data.url};
              updateUser(name, imgData.data.url)
              .then(() => {})
              .catch(err => {
                console.log(err);
              })
              saveUser(user)
              .then(res => {
                if(res.status === 200){
                  toast.success("Account has been created.");
                  navigate('/');
                }
              })
            }
          })
        }
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.message;
        const errorCode = errorMessage.startsWith("Firebase: Error (auth/")
          ? errorMessage.slice(22, -2)
          : errorMessage;
        setSignUpError(errorCode);
      });
  };

  const handleInputChange = () => {
    setSignUpError("");
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
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <FormLabel >Picture</FormLabel>

          <ImageUpload setFunc={setProfilePicture}/>
          
          {profilePicture && <Typography color={"primary"}>{profilePicture.name}</Typography>}
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email || signUpError.includes("email-already-in-use")}
            helperText={
              errors.email?.message ||
              (signUpError.includes("email-already-in-use") ? signUpError : "")
            }
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
              minLength: {
                value: 8,
                message: "Password should be 8 characters or longer",
              },
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