import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Link, IconButton } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";

export default function Topbar() {
  return (
    <Box>
      <AppBar className="over-particles">
        <Toolbar>
          <Link
            to="/"
            component={RouterLink}
            color="inherit"
            className="button-links"
          >
            <Button
              size="large"
              variant="text"
              startIcon={<HealthAndSafetyIcon />}
              color="inherit"
              aria-label="home"
            >
              Detección de Malaria
            </Button>
          </Link>
          <Box flexGrow={1}></Box>
          <Link
            to="/history"
            component={RouterLink}
            color="inherit"
            className="button-links"
          >
            <Button
              size="large"
              variant="text"
              startIcon={<HistoryIcon />}
              color="inherit"
              aria-label="home"
            >
              Historial
            </Button>
          </Link>
          <Link
            to="/about"
            component={RouterLink}
            color="inherit"
            className="button-links"
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="information"
              sx={{ mr: 2 }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
