import React from 'react';
import {Grid, Link, Typography, Paper} from "@mui/material";
import Messages from "../../Messages/Messages";

const FullPostComponent = ({post, time, onResetPost}) => {
  return (
    <Paper elevation={6} sx={{padding: "20px"}}>
      <Grid container marginBottom="30px" flexDirection="column" padding="30px">
        <Grid item>
          <Typography variant="h4">
            <Typography variant="span" fontWeight="700">
              Title:
            </Typography>
            {post.title}
          </Typography>
        </Grid>
        <Grid item container ml="auto" mt="40px" justifyContent="space-between">
          <Grid item mt="auto">
            <Link href={post.url} target="_blank" fontSize="20px">
              Go to news
            </Link>
          </Grid>
          <Grid item>
            <Typography fontStyle="italic" borderBottom="1px solid black" padding="0">
              <Typography fontWeight="700" variant="span">By:</Typography> {post.by}
            </Typography>
            <Typography color="gray">
              {time?.toString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Messages postId={post.id} messagesId={post.kids} onResetPost={onResetPost}/>
    </Paper>
  );
};

export default FullPostComponent;