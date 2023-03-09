import React from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import Post from "../../components/Post/Post";

const FullPost = () => {
  const {id} = useParams()

  return (
    <Container>
      <Grid container flexWrap="nowrap" alignItems="center">
        <Grid item>
          <Button variant="outlined" component={Link} to="/">
            All News
          </Button>
        </Grid>
        <Grid item mx="auto" pr="120px">
          <Typography fontSize="46px" textAlign="center" marginY="20px">
            Full post
          </Typography>
        </Grid>
      </Grid>
      <Post id={id} fullPost/>
    </Container>
  );
};

export default FullPost;