// src/pages/Register.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { UserPlus, Mail, User, Lock, CheckCircle2 } from "lucide-react";

import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  alpha,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Схема валидации
const registerSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  username: yup
    .string()
    .min(3, "Имя пользователя минимум 3 символа")
    .max(20, "Слишком длинное имя")
    .required("Имя пользователя обязательно"),
  password: yup
    .string()
    .min(6, "Пароль минимум 6 символов")
    .required("Пароль обязателен"),
});

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { email: "", username: "", password: "" },
    mode: "onChange",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data) => {
    // Имитация задержки сервера
    await new Promise((r) => setTimeout(r, 1200));

    const fakeToken = "reg-token-" + Date.now().toString(36);
    const userData = {
      email: data.email,
      username: data.username,
      token: fakeToken,
    };

    login(userData);
    setShowSuccess(true);

    toast.success("Регистрация завершена!", {
      icon: <CheckCircle2 size={22} color="#60a5fa" />,
      duration: 4000,
      position: "top-center",
    });

    setTimeout(() => navigate("/"), 1800);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      maxWidth={440}
      mx="auto"
      mt={10}
      p={5}
      sx={{
        bgcolor: "#111827",
        borderRadius: 4,
        border: "1px solid #1e293b",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight={700}
        sx={{
          background: "linear-gradient(90deg, #60a5fa, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 5,
        }}
      >
        Регистрация
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              margin="dense"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail
                      size={20}
                      color={errors.email ? "#f87171" : "#94a3b8"}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1e293b",
                  borderRadius: 2.5,
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

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Имя пользователя"
              margin="dense"
              error={!!errors.username}
              helperText={errors.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User
                      size={20}
                      color={errors.username ? "#f87171" : "#94a3b8"}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1e293b",
                  borderRadius: 2.5,
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Пароль"
              type="password"
              margin="dense"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock
                      size={20}
                      color={errors.password ? "#f87171" : "#94a3b8"}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1e293b",
                  borderRadius: 2.5,
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.8,
            borderRadius: 2.5,
            fontWeight: 600,
            background: "linear-gradient(45deg, #8b5cf6 30%, #a78bfa 90%)",
            boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)",
            "&:hover": {
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.6)",
              background: "linear-gradient(45deg, #a78bfa 30%, #8b5cf6 90%)",
            },
            "&:disabled": {
              background: "#1e293b",
              color: "#475569",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={26} color="inherit" />
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </Box>

      {/* Анимация успеха в синем тоне */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: alpha("#3b82f6", 0.15),
              borderRadius: 16,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <CheckCircle2 size={100} color="#60a5fa" />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Register;
