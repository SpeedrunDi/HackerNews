import React from 'react';
import {Link} from "react-router-dom";
import {Grid, Typography} from "@mui/material";

const NotFullNews = ({post, time}) => (
  <Grid
    item
    sx={{
      boxShadow: "6",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      marginBottom: "30px",
      textDecoration: "none",
      color: "inherit"
    }}
    component={Link}
    to={'/news/' + post?.id}
  >
    <Grid item container mb="30px" justifyContent="space-between" alignItems="center">
      <Typography
        variant="span"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        fontSize="24px"
        sx={{width: {xs: "200px", sm: "380px", md: "520px"}, fontSize: {xs: "18px", sm: "24px"}}}
      >
        <Typography variant="span" fontWeight="700">Title:</Typography> {post.title}
      </Typography>
      <Typography variant="span">
        <Typography variant="span" fontWeight="700">Score:</Typography> {post.score}
      </Typography>
    </Grid>
    <Grid item container mb="10px" justifyContent="space-between">
      <Typography variant="span" fontStyle="italic">
        <Typography variant="span" fontWeight="700">By:</Typography> {post.by}
      </Typography>
      <Typography variant="span">
        {time?.toString()}
      </Typography>
    </Grid>
  </Grid>
);

export default NotFullNews;