import { Box, Typography } from "@mui/material";
import React from "react";

const NoDataFallback = () => {
  return (
    <Box sx={{ width: "100%", height: 350 }}>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        No Data Found
      </Typography>
    </Box>
  );
};

export default NoDataFallback;
