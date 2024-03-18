import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { Link } from "react-router-dom";

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(
        "https://web-intern-server-production.up.railway.app/app/limited-courses"
      );
      const data = await res.data.courses;
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div style={{ margin: "40px 0" }}>
      <Typography mb={"15px"} variant="h5" color={"black"} textAlign={"center"}>
        Our Courses
      </Typography>

      <Container maxWidth={"lg"}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {courses?.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "15px" }}>
          <Button component={Link} to="/courses" variant="contained">
            See All
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Courses;
