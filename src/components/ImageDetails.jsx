import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Container, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { capitalizeFirstChar } from "../utils";
import BackToHomepageButton from "./BackToHomePage";

const ImageDetails = () => {
  const { id } = useParams();
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    fetchImageDetails();
  }, []);

  const fetchImageDetails = async () => {
    try {
      const response = await apiService.getImageDetails(id);
      setImageDetails(response.data);
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };

  return (
    <Container>
      {imageDetails ? (
        <Box sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 3 }}>
            <BackToHomepageButton />
          </Box>
          <Box sx={{ maxWidth: 500, paddingBottom: 3, margin: "auto" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={imageDetails.urls.regular}
              alt={imageDetails.alt_description}
            />
          </Box>
          <Box
            sx={{
              maxWidth: "50%",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <FavoriteIcon
                  sx={{ marginRight: 0.5, fontSize: 14 }}
                  color="error"
                />
                <Typography variant="caption">
                  {imageDetails.likes} likes
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">
                  Uploaded on{" "}
                  <strong>
                    {moment(imageDetails.createdAt).format("DD-MM-YYYY")}
                  </strong>
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1">
              {capitalizeFirstChar(imageDetails.alt_description)}
            </Typography>
            <Typography variant="body2">By {imageDetails.user.name}</Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Container>
  );
};

export default ImageDetails;
