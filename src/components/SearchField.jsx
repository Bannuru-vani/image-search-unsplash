import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const SearchField = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    let searchKey = event.target.value.trim();
    setQuery(searchKey);
    onSearch(searchKey);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box sx={{ maxWidth: "250px", paddingRight: 5, paddingBottom: 3 }}>
      <TextField
        placeholder="Search images..."
        value={query}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchField;
