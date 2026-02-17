// src/App.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Container, Box, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatBox from "./components/ChatBox";

import { AuthProvider } from "./context/AuthContext";

// Иконки для тостера
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function MainLayout() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        pt: { xs: 4, sm: 6, md: 8, lg: 10 }, // адаптивные отступы сверху
        pb: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4, lg: 5 }, // адаптивные боковые отступы
      }}
    >
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#0a0e17",
          color: "#e2e8f0",
          overflowX: "hidden", // предотвращает горизонтальный скролл
        }}
      >
        {/* Toaster — responsive по умолчанию */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            top: 16,
            zIndex: 9999,
          }}
          toastOptions={{
            duration: 5000,
            pauseOnHover: true,
            style: {
              background: "rgba(26, 31, 46, 0.92)",
              color: "#e2e8f0",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "14px 20px",
              minWidth: { xs: "280px", sm: "340px" },
              maxWidth: "90vw",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            },
            success: {
              icon: <CheckCircle2 size={22} color="#60a5fa" />,
              style: {
                border: "1px solid #1e40af",
                background: "rgba(30, 41, 59, 0.95)",
                color: "#bfdbfe",
              },
            },
            error: {
              icon: <AlertCircle size={22} color="#f87171" />,
              style: {
                border: "1px solid #7f1d1d",
                background: "rgba(31, 26, 26, 0.95)",
                color: "#fecaca",
              },
            },
            loading: {
              icon: (
                <Loader2 size={22} className="animate-spin" color="#60a5fa" />
              ),
              style: {
                border: "1px solid #1e40af",
                background: "rgba(30, 41, 59, 0.95)",
                color: "#bfdbfe",
              },
            },
          }}
        />

        {/* Шапка / Home — responsive отступы */}
        <Box
          component="header"
          sx={{
            py: { xs: 5, sm: 6, md: 8, lg: 9 },
            textAlign: "center",
            borderBottom: "1px solid #1e293b",
            mb: { xs: 4, sm: 6, md: 8 },
            background: "linear-gradient(to bottom, #0f172a 0%, #0a0e17 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <Home />
        </Box>

        {/* Основной контент */}
        <Container
          maxWidth="xl" // позволяет растягиваться до 1536px на больших экранах
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, md: 4, lg: 6 }, // адаптивные внутренние отступы
            maxWidth: { lg: "1400px" }, // можно ограничить максимальную ширину контента
          }}
        >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ChatBox />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </AuthProvider>
  );
}

export default App;
