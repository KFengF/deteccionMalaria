import { Box, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box
      minHeight="90vh"
      width="600px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      <Box display="flex">
        <Box marginRight="10px">image</Box>
        <Box flexGrow={1}>
          <Typography>REPÚBLICA BOLIVARIANA DE VENEZUELA</Typography>
          <Typography>UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Typography>
          <Typography>CARRERA: INGENIERÍA EN COMPUTACIÓN</Typography>
        </Box>
      </Box>
      <Box margin="100px 0" textAlign="center">
        <Typography>
          DESARROLLO DE UNA APLICACIÓN WEB BASADA EN INTELIGENCIA ARTIFICIAL
          PARA LA DETECCIÓN DE CÉLULAS SANAS E INFECTADAS DE MALARIA
        </Typography>
        <Typography marginTop="16px">
          Proyecto de trabajo de Grado presentado para optar al título de
        </Typography>
        <Typography component="span" fontWeight="bold">
          INGENIERO EN COMPUTACIÓN
        </Typography>
      </Box>
      <Box width="160px" alignSelf="end" textAlign="right">
        <Typography fontWeight="bold">Tutor:</Typography>
        <Typography>Juan Alexander Pérez</Typography>
      </Box>
    </Box>
  );
};

export default About;
