import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import axiosApi from "../../../axiosApi";

const Message = ({id}) => {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tree, setTree] = useState([])

  useEffect(() => {
    const getMessage = async () => {
      try {
        setLoading(true);
        const {data} = await axiosApi.get(`/item/${id}.json`);
        setMessage(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    if (id) {
      getMessage().then()
    }
  }, [id]);

  const renderComments = async (currentMessage) => {
    const comments = [];
    try {
      setLoading(true);
      for (const id of currentMessage.kids) {
        const {data} = await axiosApi.get(`/item/${id}.json`);

        const childComments = []
        if (data.kids?.length) {
          for (const childId of data.kids) {
            const response = await axiosApi.get(`/item/${childId}.json`);

            !response.data.deleted && childComments.push(
              <Grid
                maxWidth="90%"
                item
                container
                justifyContent="space-between"
                alignItems="center"
                marginBottom="30px"
                padding="10px 20px"
                sx={{ border: "3px solid green", borderRadius: "20px", marginLeft: "50px" }}
                key={childId}
              >
                <Grid item>
                  <Typography variant="span" textTransform="capitalize" fontWeight="700">
                    {response.data.by}:
                  </Typography>
                  <Typography variant="span" marginLeft="10px" dangerouslySetInnerHTML={{ __html: response.data.text }} />
                </Grid>
              </Grid>
            );
          }
        }

        !data.deleted && comments.push(
          <Grid
            maxWidth="90%"
            item
            container
            justifyContent="space-between"
            alignItems="center"
            marginBottom="30px"
            padding="10px 20px"
            sx={{ border: "3px solid green", borderRadius: "20px", marginLeft: "50px" }}
            key={id}
          >
            <Grid item mb="20px">
              <Typography variant="span" textTransform="capitalize" fontWeight="700">
                {data.by}:
              </Typography>
              <Typography variant="span" marginLeft="10px" dangerouslySetInnerHTML={{ __html: data.text }} />
            </Grid>
            {childComments}
          </Grid>
        );
      }
    } catch (e) {}
    setLoading(false);
    setTree(comments)
  };

  return message && (
    <Grid container
          flexDirection="column"
          marginBottom="30px"
          padding="10px 20px"
          sx={{border: "3px solid green", borderRadius: "20px"}}
    >
      {loading ? (
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
      ) : (
        <>
          <Grid item mb="20px">
            <Typography variant="span" textTransform="capitalize" fontWeight="700">
              {message.by}:
            </Typography>
            <Typography variant="span" marginLeft="10px" dangerouslySetInnerHTML={{__html: message.text}}/>
          </Grid>

          {tree?.length ? <> {tree} </> : (
            message.kids?.length && (
              <Typography variant="span" onClick={() => renderComments(message)} sx={{cursor: "pointer", color: "red"}}>
                More {message.kids?.length} comments
              </Typography>
            )
          )}
        </>
      )}
    </Grid>
  );
};

export default Message;