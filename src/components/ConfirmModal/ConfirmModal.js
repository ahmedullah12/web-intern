import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal = ({ open, handleClose, handleConfirm, courseId }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box sx={style}>
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          Are you sure you want to delete?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={() => handleConfirm(courseId)} color="error">Yes</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
