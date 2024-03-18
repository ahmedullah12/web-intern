import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/app/course/${id}`
      );
      return data.course;
    },
  });

  const handleRefer = () => {
    // Implement refer logic here
  };


  if (isLoading) return <p>Loading....</p>;

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: "500px" }}>
        <Box>
          <img src={course.thumbnail} alt={course.courseName} style={{ width: "100%", marginBottom: "10px" }} />
        </Box>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {course.courseName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Instructor: {course.instructor}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {course.details}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${course.price}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleRefer}>
              Refer
            </Button>
            <Button component={Link} to={`/payment/${course._id}`} variant="contained" color="secondary">
              Order
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetails;
