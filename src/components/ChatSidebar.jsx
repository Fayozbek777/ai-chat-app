import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const ChatSidebar = () => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <Box width={240} border={1} p={2} height={400} overflow="auto">
      <Typography variant="h6" mb={1}>
        История чатов
      </Typography>
      {messages.map((msg, i) => (
        <Typography key={i} variant="body2" mb={0.5}>
          {msg.role === "user" ? "Вы:" : "AI:"} {msg.text.slice(0, 20)}...
        </Typography>
      ))}
    </Box>
  );
};

export default ChatSidebar;
