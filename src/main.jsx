import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#302c29",
      paper: "#302c29",
    },
    primary: {
      main: "#6d5144",
    },
    secondary: {
      main: "#cbbdb2",
    },
    text: {
      primary: "#f4ede7",
      secondary: "#d9cfc7",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightRegular: 400,
    htmlFontSize: 20,
    fontSize: 20,
    lineHeight: 1.6,
    letterSpacing: 0,
    fontStyle: "normal",
    body1: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    body2: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h1: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h2: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h3: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h4: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h5: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    h6: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    subtitle1: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    subtitle2: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    caption: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    button: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
    overline: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: 0 },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
