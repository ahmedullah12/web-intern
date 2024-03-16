import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { TextField, Button, Box } from '@mui/material';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import { useForm } from 'react-hook-form';

const AddCourse = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const {register, handleSubmit} = useForm();


    const handleAddCourse = (data) => {
        console.log(data);
    }

    return (
        <div>
            <Typography mb={"20px"} textAlign={"center"} variant="h4" color="initial">
                Add a Course
            </Typography>

            <form onSubmit={handleSubmit(handleAddCourse)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="course-name" style={{ width: '120px', textAlign: 'right' }}>Course name:</label>
                        <TextField 
                            id="course-name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={{ width: { md: '50%', sm: '70%' } }}
                            {...register("courseName", {
                                required: "Course Name is required"
                            })}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="thumbnail" style={{ width: '120px', textAlign: 'right' }}>Thumbnail:</label>
                        <ImageUpload setFunc={setThumbnail}/>
                        {thumbnail && <Typography color={"primary"}>{thumbnail.name}</Typography>}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="course-details" style={{ width: '120px', textAlign: 'right' }}>Course details:</label>
                        <TextField 
                            id="course-details"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ width: { md: '50%', sm: '70%' } }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="course-instructor" style={{ width: '120px', textAlign: 'right' }}>Course Instructor:</label>
                        <TextField 
                            id="course-instructor"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={{ width: { md: '50%', sm: '70%' } }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="course-price" style={{ width: '120px', textAlign: 'right' }}>Course price:</label>
                        <TextField 
                            id="course-price"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            fullWidth
                            sx={{ width: { md: '50%', sm: '70%' } }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button sx={{ width: '160px' }} variant="contained" color="primary">
                            Add Course
                        </Button>
                    </Box>
                </Box>
            </form>
        </div>
    );
};

export default AddCourse;
