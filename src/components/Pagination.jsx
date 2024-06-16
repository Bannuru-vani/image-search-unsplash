import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ count, page, onChange }) => {
  return (
    <Box sx={{ padding: 5 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        size="large"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
