import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackToHomepageButton = () => {
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate("/");
  };

  return (
    <IconButton aria-label="back to homepage" onClick={handleBackToHomepage}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackToHomepageButton;
