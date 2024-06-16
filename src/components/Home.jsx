import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";
import SearchField from "./SearchField";
import apiService from "../services/apiService";
import NoDataFallback from "./NoDataFallback";
import Loader from "./Loader";

const styles = {
  header: {
    padding: 3,
  },
  searchFieldContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

const Home = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [rateExceeded, setRateExceeded] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [page, query]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await apiService.getImages(page, 6, query);
      if (query) {
        setImages(response.data.results);
        setTotalCount(response.data.total);
      } else {
        setImages(response.data);
        setTotalCount(100);
      }
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching images:",
        error.response.data === "Rate Limit Exceeded"
      );
      if (error.response.data === "Rate Limit Exceeded") {
        setRateExceeded(true);
      }
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (rateExceeded) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: 350,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          For Unsplash API : Limit of 50 request's for an hour is exceed, Please
          try again later
        </Typography>
      </Box>
    );
  }

  return (
    <Container spacing={3}>
      <Typography variant="h3" sx={styles.header}>
        Image Search
      </Typography>
      <Box sx={styles.searchFieldContainer}>
        <SearchField onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: 2 }}>
        {loading ? (
          <Loader />
        ) : images.length > 0 ? (
          <Grid container spacing={2}>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </Grid>
        ) : (
          <NoDataFallback />
        )}
      </Box>
      {images.length > 0 && !loading ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={Math.ceil(totalCount / 6)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      ) : null}
    </Container>
  );
};

export default Home;
