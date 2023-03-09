import React, {useEffect, useRef, useState} from 'react';
import Swal from "sweetalert2";
import {Box, Button, CircularProgress, Container, Grid, Typography} from "@mui/material";
import Post from "../../components/Post/Post";
import axiosApi from "../../axiosApi";

const Toast = Swal.mixin({
  toast: true,
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "white",
  color: "white",
  background: "#424242",
  position: "top-end",
});

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const interval = useRef()

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const {data} = await axiosApi.get(`/newstories.json`);

        if (data?.length < 101) {
          setLoading(false);
          return setNews(data);
        }

        data.splice(100);
        setNews(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    if (news?.length === 0) {
      getNews().then();

      interval.current = setInterval(async () => {
        try {
          const {data} = await axiosApi.get(`/newstories.json`);

          if (data?.length !== 0 && news?.length !== 0) {
            const lastNews = news[0];
            const lastUpdateNews = data[0];

            if (lastNews === lastUpdateNews) {
              return
            }
          }

          if (data?.length < 101) {
            return setNews(data);
          }

          data.splice(100);
          setNews(data);
        } catch (e) {}
      }, 60000);
    }
  }, [news]);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  const updateNews = async () => {
    try {
      setLoading(true);
      const {data} = await axiosApi.get(`/newstories.json`);

      if (data?.length !== 0 && news?.length !== 0) {
        const lastNews = news[0];
        const lastUpdateNews = data[0];

        if (lastNews === lastUpdateNews) {
          setLoading(false);
          return Toast.fire({
            title: "No new news!",
            icon: "info"
          });
        }
      }

      if (data?.length < 101) {
        setLoading(false);
        return setNews(data);
      }

      data.splice(100);
      setNews(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  if (loading) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  return (
    <Container>
      {loading && (
        <Box
          position="absolute"
          bgcolor="grey"
          sx={{
            opacity: "0.4",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "2"
          }}
          onClick={e => e.stopPropagation()}
        >
          <CircularProgress size={90}/>
        </Box>
      )}
      <Grid container justifyContent="center">
        <Grid container justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Grid item>
            <Typography variant="h3">
              Hacker news
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={updateNews}>update news</Button>
          </Grid>
        </Grid>
        <Grid item container flexDirection="column" maxWidth="720px" padding="50px 0">
          {
            news?.length ?
              news.map(id => (
                <Post key={id} id={id}/>
              )) : <Typography fontSize="36px" textAlign="center">No news!</Typography>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;