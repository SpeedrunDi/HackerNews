import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import axiosApi from "../../../axiosApi";

const Message = ({id, recursion}) => {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tree, setTree] = useState(false)

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

  const renderComments = () => {
    setTree(true)
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
  ) : message && (
    <Grid container
          flexDirection="column"
          marginBottom="30px"
          padding="10px 20px"
          sx={{border: "3px solid green", borderRadius: "20px"}}
    >
      <Grid item mb="20px">
        <Typography variant="span" textTransform="capitalize" fontWeight="700">
          {message.by}:
        </Typography>
        <Typography variant="span" marginLeft="10px" dangerouslySetInnerHTML={{__html: message.text}}/>
      </Grid>

      {recursion ? (
        message.kids?.map(id => (
          <Message key={id} id={id} recursion={true}/>
        ))
      ) : tree ?
        <>
          {message.kids?.map(id => (
            <Message key={id} id={id} recursion={true}/>
          ))}
        </> : (
          message.kids?.length && (
            <Typography variant="span" onClick={renderComments} sx={{cursor: "pointer", color: "red"}}>
              More {message.kids?.length} comments
            </Typography>
          )
        )
      }
    </Grid>
  );
};

export default Message;