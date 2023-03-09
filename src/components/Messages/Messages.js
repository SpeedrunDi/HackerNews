import React, {useState} from 'react';
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Message from "./Message/Message";
import axiosApi from "../../axiosApi";

const Messages = ({postId, messagesId}) => {
  const [state, setState] = useState(messagesId && [...messagesId]);
  const [loading, setLoading] = useState(false)

  const resetComments = async () => {
    try {
      setLoading(true);
      const {data} = await axiosApi.get(`/item/${postId}.json`);
      setState([...data?.kids]);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        Comments
        <Typography variant="span" color="grey">
          ({state?.length || 0})
        </Typography>
        <IconButton onClick={resetComments}>
          <RestartAltIcon/>
        </IconButton>
      </Typography>
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
        state?.length && (
          <Box paddingY="20px" sx={{maxHeight: "450px", overflowY: "scroll"}}>
            {state.map(id => (
              <Message key={id} id={id}/>
            ))}
          </Box>
        )
      )}
    </Box>
  );
};

export default Messages;