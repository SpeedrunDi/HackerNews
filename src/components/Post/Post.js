import React, {useEffect, useState} from 'react';
import {Box, CircularProgress} from "@mui/material";
import axiosApi from "../../axiosApi";
import NotFullNews from "./NotFullNews/NotFullNews";
import FullPostComponent from "./FullPostComponent/FullPostComponent";

const Post = ({id, fullPost}) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const {data} = await axiosApi.get(`/item/${id}.json`);
        setPost(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    if (id) {
      getNews().then()
    }
  }, [id]);

  let time
  if (post) {
    time = new Date(post.time * 1000)
  }

  return loading ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px",
      }}
      onClick={e => e.stopPropagation()}
    >
      <CircularProgress size={90}/>
    </Box>
  ) : post && (
    fullPost ? <FullPostComponent post={post} time={time}/> : <NotFullNews post={post} time={time}/>
  );
};

export default Post;