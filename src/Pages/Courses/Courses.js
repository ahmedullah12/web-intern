import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import CourseCard from '../../components/CourseCard/CourseCard';

const Courses = () => {
    

    const { data: courses, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
          const res = await axios.get("http://localhost:5000/app/courses");
          const data = await res.data.courses;
          return data;
        },
      });

    if(isLoading) return <p>Loading...</p>
    return (
        <div style={{margin: "40px 0"}}>
            <Typography mb={"15px"} variant='h5' color={"black"} textAlign={"center"}>Our Courses</Typography>

            <Container maxWidth={"lg"}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                }}
            >
                {
                    courses?.map(course => <CourseCard key={course._id} course={course}/>)
                }
            </Box>
            </Container>
        </div>
    );
};

export default Courses;