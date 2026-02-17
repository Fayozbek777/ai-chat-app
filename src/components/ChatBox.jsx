// src/components/ChatBox.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Send, AlertCircle, User, Bot, Loader2 } from "lucide-react";

import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  InputAdornment,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Схема валидации
const messageSchema = yup.object({
  message: yup
    .string()
    .trim()
    .min(1, "Введите хотя бы одно слово")
    .max(2000, "Сообщение слишком длинное (макс. 2000 символов)")
    .required("Сообщение обязательно"),
});

const ChatBox = () => {
  const messagesEndRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: { message: "" },
    mode: "onChange",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: data.message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    reset();

    await new Promise((r) => setTimeout(r, 800));

    toast.error("Лимит превышен или AI временно недоступен", {
      icon: <AlertCircle size={20} color="#f87171" />,
      duration: 5000,
      position: "top-center",
    });

    const errorMsg = {
      id: crypto.randomUUID(),
      role: "error",
      content:
        "Не удалось получить ответ. Лимит запросов или сервис временно недоступен.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, errorMsg]);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0a0e17", // основной очень тёмный фон
      }}
    >
      {/* Область сообщений */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const isError = msg.role === "error";

            const Component = isError
              ? ErrorMessage
              : isUser
                ? UserMessage
                : AssistantMessage;

            const iconColor = isUser
              ? "#60a5fa"
              : isError
                ? "#f87171"
                : "#94a3b8";

            const icon = isUser ? (
              <User size={18} color={iconColor} />
            ) : isError ? (
              <AlertCircle size={18} color={iconColor} />
            ) : (
              <Bot size={18} color={iconColor} />
            );

            return (
              <Component
                key={msg.id}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 0.75,
                  }}
                >
                  {icon}
                  <Typography
                    variant="caption"
                    sx={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    {isUser ? "Вы" : isError ? "Ошибка" : "Ассистент"}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", color: "#e2e8f0" }}
                >
                  {msg.content}
                </Typography>
              </Component>
            );
          })}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </Box>

      {/* Поле ввода */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          mx: 2,
          mb: 2,
          bgcolor: "#111827",
          border: "1px solid #1e293b",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                maxRows={5}
                minRows={1}
                placeholder="Напишите сообщение..."
                variant="outlined"
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        disabled={isSubmitting || !field.value?.trim()}
                        sx={{
                          color: "#60a5fa",
                          "&:hover": { bgcolor: alpha("#60a5fa", 0.12) },
                        }}
                      >
                        {isSubmitting ? (
                          <Loader2 size={22} className="animate-spin" />
                        ) : (
                          <Send size={22} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "#e2e8f0",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#1e293b",
                    "& fieldset": { borderColor: "#334155" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
                  "& .MuiFormHelperText-root": { color: "#f87171" },
                }}
              />
            )}
          />
        </Box>
      </Paper>
    </Box>
  );
};

// Стилизованные пузырьки сообщений
const MessageBubble = styled(motion.div)(({ theme }) => ({
  maxWidth: "82%",
  padding: theme.spacing(1.75, 2.5),
  borderRadius: 20,
  lineHeight: 1.5,
  wordBreak: "break-word",
  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
}));

const UserMessage = styled(MessageBubble)({
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "#ffffff",
  borderBottomRightRadius: 6,
  alignSelf: "flex-end",
});

const AssistantMessage = styled(MessageBubble)({
  background: "#1e293b",
  color: "#e2e8f0",
  borderBottomLeftRadius: 6,
  alignSelf: "flex-start",
  border: "1px solid #334155",
});

const ErrorMessage = styled(AssistantMessage)({
  background: "#1f1a1a",
  color: "#fecaca",
  borderLeft: "4px solid #ef4444",
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
});

export default ChatBox;
