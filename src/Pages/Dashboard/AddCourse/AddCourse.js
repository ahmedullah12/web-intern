import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { TextField, Button, Box } from "@mui/material";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [thumbnailFile, setthumbnailFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleAddCourse = (data) => {
    console.log(data, thumbnailFile);
    const {courseName, details, instructor, price} = data;
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    if (thumbnailFile === null) {
      toast.error("Please upload a profile picture.");
      return;
    }
    const formData = new FormData();
    formData.append("image", thumbnailFile);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(imgData => {
        if(imgData.success === true){
            const course = {
                courseName,
                thumbnail: imgData.data.url,
                details,
                instructor,
                price,
            }
            axios.post("http://localhost:5000/app/course", course)
            .then(res => {
                if(res.status === 200){
                    toast.success(res.data.message);
                    reset();
                    navigate('/dashboard/all-course');
                }
            })
            .catch(err => console.log(err));
        }
    });
  };

  return (
    <div>
      <Typography mb={"20px"} textAlign={"center"} variant="h4" color="initial">
        Add a Course
      </Typography>

      <form onSubmit={handleSubmit(handleAddCourse)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="course-name"
              style={{ width: "120px", textAlign: "right" }}
            >
              Course name:
            </label>
            <TextField
              id="course-name"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ width: { md: "50%", sm: "70%" } }}
              {...register("courseName", {
                required: "Course Name is required",
              })}
              error={!!errors.courseName}
              helperText={errors.courseName?.message}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="thumbnailFile"
              style={{ width: "120px", textAlign: "right" }}
            >
              thumbnailFile:
            </label>
            <ImageUpload setFunc={setthumbnailFile} />
            {thumbnailFile && (
              <Typography color={"primary"}>{thumbnailFile.name}</Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="course-details"
              style={{ width: "120px", textAlign: "right" }}
            >
              Course details:
            </label>
            <TextField
              id="course-details"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              fullWidth
              sx={{ width: { md: "50%", sm: "70%" } }}
              {...register("details", {
                required: "Course Details is required",
              })}
              error={!!errors.details}
              helperText={errors.details?.message}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="course-instructor"
              style={{ width: "120px", textAlign: "right" }}
            >
              Course Instructor:
            </label>
            <TextField
              id="course-instructor"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{ width: { md: "50%", sm: "70%" } }}
              {...register("instructor", {
                required: "Course Instructor Name is required",
              })}
              error={!!errors.instructor}
              helperText={errors.instructor?.message}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              htmlFor="course-price"
              style={{ width: "120px", textAlign: "right" }}
            >
              Course price:
            </label>
            <TextField
              id="course-price"
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth
              sx={{ width: { md: "50%", sm: "70%" } }}
              {...register("price", {
                required: "Course Price is required",
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{ width: "160px" }}
              variant="contained"
              color="primary"
            >
              Add Course
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default AddCourse;
