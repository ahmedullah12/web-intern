import { Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({setFunc}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFunc(file);
      } else {
        alert("Please upload an image file.");
        setFunc(null);
      }
    },
    });

    return (
      <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "4px",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps({accept: 'image/*'})} />
      {isDragActive ? (
        <Typography variant="body2">Drop the image here...</Typography>
      ) : (
        <Typography variant="body2">
          Drag and drop an image here, or click to select a file
        </Typography>
      )}
    </div>
    );
  };

export default ImageUpload;