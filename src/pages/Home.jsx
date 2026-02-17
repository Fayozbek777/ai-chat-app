// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, UserPlus } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        width: "100%",
        minHeight: "30vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, md: 6 },
        py: { xs: 8, md: 12 },
        background: "linear-gradient(to bottom, #0f172a 0%, #0a0e17 100%)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 15 }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          align="center"
          sx={{
            background: "linear-gradient(90deg, #60a5fa, #3b82f6, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
            mb: 4,
            textShadow: "0 2px 10px rgba(59, 130, 246, 0.3)",
          }}
        >
          {user ? `Привет, ${user.username}!` : "Добро пожаловать"}
        </Typography>
      </motion.div>

      {user ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
        >
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              bgcolor: "#1e293b",
              p: 3,
              borderRadius: 3,
              border: "1px solid #334155",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#3b82f6",
                fontSize: "2.5rem",
                fontWeight: "bold",
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
                border: "3px solid #60a5fa",
              }}
            >
              {user.username?.[0]?.toUpperCase() || "?"}
            </Avatar>

            <Box>
              <Typography variant="h5" color="#e2e8f0" fontWeight={600}>
                {user.username}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Добро пожаловать обратно
              </Typography>
            </Box>
          </Stack>
        </motion.div>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 5 }}
          mt={6}
        >
          <motion.div
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<LogIn size={22} />}
              onClick={() => navigate("/login")}
              sx={{
                minWidth: 200,
                py: 1.8,
                px: 5,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)",
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                "&:hover": {
                  boxShadow: "0 12px 35px rgba(59, 130, 246, 0.6)",
                  background:
                    "linear-gradient(45deg, #60a5fa 30%, #3b82f6 90%)",
                },
              }}
            >
              Войти
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<UserPlus size={22} />}
              onClick={() => navigate("/register")}
              sx={{
                minWidth: 200,
                py: 1.8,
                px: 5,
                borderRadius: 3,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderWidth: 2,
                borderColor: "#60a5fa",
                color: "#60a5fa",
                background: "transparent",
                "&:hover": {
                  borderColor: "#3b82f6",
                  background: "rgba(59, 130, 246, 0.08)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                },
              }}
            >
              Регистрация
            </Button>
          </motion.div>
        </Stack>
      )}
    </Box>
  );
};

export default Home;
