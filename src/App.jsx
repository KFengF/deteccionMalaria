import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Particles from "./components/Particles";
import History from "./components/History";

const theme = createTheme({
  palette: {
    primary: {
      light: "#8cfff7",
      main: "#6be8c2",
      dark: "#6eb5b0",
      contrastText: "#222",
    },
    secondary: {
      light: "#ab211f",
      main: "#890F0D",
      dark: "#610706",
      contrastText: "#ddd",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Particles />
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about/" element={<About />}></Route>
            <Route path="/history/" element={<History />}></Route>
          </Routes>
          <Footer />
        </StyledEngineProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
