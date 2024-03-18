import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ConfirmationModal from "../../../components/ConfirmModal/ConfirmModal";
import UpdateModal from "../../../components/UpdateModal/UpdateModal";
import toast from "react-hot-toast";

const AllCourse = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(
        "https://web-intern-server-production.up.railway.app/app/courses"
      );
      const data = await res.data.courses;
      return data;
    },
  });

  useEffect(() => {
    setIsUpdateModalOpen(false); // Close the modal on component mount
    setSelectedCourse(null); // Reset selected course on component mount
  }, []);

  const handleOpenUpdateModal = (course) => {
    setSelectedCourse(course);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setSelectedCourse(null);
    setIsUpdateModalOpen(false);
  };
  const handleOpenConfirmModal = (course) => {
    setSelectedCourse(course);
    setIsConfirmModalOpen(true);
  };
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteCourse = (courseId) => {
    axios
      .delete(
        `https://web-intern-server-production.up.railway.app/app/course/${courseId}`
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          refetch();
          setIsConfirmModalOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) return <p>Loading....</p>;
  return (
    <>
      {courses.map((course) => (
        <Card key={course._id} sx={{ mb: 2 }}>
          <CardContent style={{ display: "flex" }}>
            {course.thumbnail && (
              <div style={{ marginRight: "20px" }}>
                <img
                  src={course.thumbnail}
                  alt="Thumbnail"
                  style={{ width: "200px", height: "220px" }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <Typography variant="h6">
                Course Name: {course.courseName}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Instructor: {course.instructor}
              </Typography>
              <Typography variant="body2" component="p">
                Details: {course.details}
              </Typography>
              <Typography variant="body2" component="p" fontWeight={"700"}>
                Price: ${course.price}
              </Typography>
              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: "8px" }}
                  onClick={() => handleOpenUpdateModal(course)}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleOpenConfirmModal(course)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <UpdateModal
        open={isUpdateModalOpen}
        handleClose={handleCloseUpdateModal}
        course={selectedCourse}
        refetch={refetch}
      />
      <ConfirmationModal
        open={isConfirmModalOpen}
        handleClose={handleCloseConfirmModal}
        handleConfirm={handleDeleteCourse}
        courseId={selectedCourse?._id}
      />
    </>
  );
};

export default AllCourse;
