// src/components/Message.jsx
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Message = ({ role, text, index, onEdit, onDelete }) => {
  const isUser = role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "80%",
          p: 2,
          borderRadius: 3,
          background: isUser
            ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            : "#1e293b",
          color: isUser ? "#ffffff" : "#e2e8f0",
          borderBottomRightRadius: isUser ? 8 : 3,
          borderBottomLeftRadius: isUser ? 3 : 8,
          border: !isUser ? "1px solid #334155" : "none",
          boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          position: "relative",
        }}
      >
        <Typography variant="body1" sx={{ flex: 1, whiteSpace: "pre-wrap" }}>
          {text}
        </Typography>

        {isUser && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onEdit(index)}
              sx={{
                color: "#94a3b8",
                "&:hover": {
                  color: "#60a5fa",
                  bgcolor: alpha("#60a5fa", 0.12),
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(index)}
              sx={{
                color: "#94a3b8",
                "&:hover": {
                  color: "#f87171",
                  bgcolor: alpha("#f87171", 0.12),
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Message;
