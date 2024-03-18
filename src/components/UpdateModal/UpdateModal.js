import React, { useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateModal = ({ open, handleClose, course, refetch }) => {
  const { register, handleSubmit, setValue } = useForm({});

  useEffect(() => {
    if (course) {
      setValue("courseName", course.courseName);
      setValue("instructor", course.instructor);
      setValue("details", course.details);
      setValue("price", course.price);
    }
  }, [course, setValue]);

  const handleUpdate = (data) => {
    console.log(data);
    const newCourse = {
      courseName: data.courseName,
      instructor: data.instructor,
      details: data.details,
      price: data.price,
    };

    axios
      .put(
        `https://web-intern-server-production.up.railway.app/app/course/${course._id}`,
        newCourse
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          refetch();
          handleClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-modal-title"
      aria-describedby="update-modal-description"
    >
      <Box sx={style}>
        <Typography id="update-modal-title" variant="h6" component="h2">
          Update Course
        </Typography>
        <Box sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              defaultValue={course?.courseName}
              {...register("courseName", {
                required: "Course Name is required",
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Instructor"
              name="instructor"
              defaultValue={course?.instructor}
              {...register("instructor", {
                required: "Course Instructor Name is required",
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Details"
              name="details"
              defaultValue={course?.details}
              {...register("details", {
                required: "Course Details is required",
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              defaultValue={course?.price}
              {...register("price", {
                required: "Course Price is required",
              })}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
