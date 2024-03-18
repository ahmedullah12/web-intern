import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const [showReferLink, setShowReferLink] = useState(false);
  const [referLink, setReferLink] = useState("");
  const { id } = useParams();
  const { user, setReferLinkUser } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const referUser = searchParams.get("referUser");
  useEffect(() => {
    if (searchParams) {
      setReferLinkUser(referUser);
    }
  }, [referUser, searchParams, setReferLinkUser]);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://web-intern-server-production.up.railway.app/app/course/${id}`
      );
      return data.course;
    },
  });

  const handleRefer = () => {
    const customReferLink = `https://web-interns.netlify.app/courses/${id}?referUser=${user?.email}`;
    setReferLink(customReferLink);
    setShowReferLink(true);
  };

  const copyReferLink = () => {
    navigator.clipboard
      .writeText(referLink)
      .then(() => {
        toast.success("Link Copied to Clipboard", {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        console.error("Failed to copy refer link: ", err);
      });
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
      <Card sx={{ maxWidth: "600px" }}>
        <Box>
          <img
            src={course.thumbnail}
            alt={course.courseName}
            style={{ width: "100%", marginBottom: "10px" }}
          />
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
            <Button
              component={Link}
              to={`/payment/${course._id}`}
              variant="contained"
              color="secondary"
            >
              Order
            </Button>
          </Box>
          {showReferLink && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Refer Link:
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <p>{referLink}</p>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={copyReferLink}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDetails;
