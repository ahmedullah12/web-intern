import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

const UpdateProfileModal = ({open, handleCloseModal, userData, refetch}) => {
    const {register, handleSubmit} = useForm()

    const handleUpdateUser = (data) => {
        console.log(data);
        const name = data.name
        axios.put(`http://localhost:5000/app/user/${userData._id}`, {name})
        .then(res => {
            if(res.status === 200) {
                toast.success(res.data.message);
                refetch();
                handleCloseModal();
            }
        })
        .catch(err => console.log(err));
    }




    return (
        <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="update-modal-title"
      aria-describedby="update-modal-description"
    >
      <Box sx={style}>
        <Typography id="update-modal-title" variant="h6" component="h2">
          Update name
        </Typography>
        <Box>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                defaultValue={userData.username}
                {...register("name", {required: true})}
              />
              
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
        </Box>
      </Box>
    </Modal>
    );
};

export default UpdateProfileModal;


