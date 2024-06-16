import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstChar } from "../utils";

const ImageCard = ({ image, key }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${image.id}`);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} key={key} spacing={3}>
      <Card
        sx={{ maxWidth: 340, cursor: "pointer" }}
        onClick={() => handleCardClick()}
      >
        <CardMedia
          component="img"
          height="140"
          image={image.urls.regular}
          alt={image.alt_description}
        />

        <CardContent>
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
            <Typography variant="caption">{image.likes} likes</Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {image.description ||
              capitalizeFirstChar(image.alt_description || "")}
          </Typography>
          <Typography variant="body2">By {image.user.name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ImageCard;
