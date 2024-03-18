import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                component="img"
                sx={{ width: '100%', maxHeight: 140 }}
                image={course.thumbnail}
                alt={course.courseName}
            />
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" gutterBottom>
                    {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Instructor:</strong> {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Price:</strong> ${course.price}
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'right' }}>
                    <Button component={Link} to={`/courses/${course._id}`} variant="contained" color="primary">
                        Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
