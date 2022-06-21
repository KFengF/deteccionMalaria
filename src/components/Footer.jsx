import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => (
  <Box
    height="140px"
    display="flex"
    alignItems="end"
    justifyContent="center"
    padding="10px 20px"
  >
    <Box>
      <Typography component="span" variant="subtitle2">
        Desarrollado por
      </Typography>
      <Typography component="span" variant="subtitle2" fontWeight="bold">
        {" "}
        Kevin Feng
      </Typography>
    </Box>
  </Box>
);

export default Footer;
