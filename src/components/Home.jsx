import { Alert, Box, Snackbar } from "@mui/material";
import React, { useState } from "react";
import MainSection from "./MainSection";
import ResultsTable from "./ResultsTable";

const Home = () => {
  const initialState = { status: "info", body: "" };
  const [message, setMessage] = useState(initialState);
  const [results, set_results] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage(initialState);
  };

  return (
    <Box minHeight="90vh" width="100%">
      <Snackbar
        open={!!message.body.length}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.status}
          sx={{ width: "100%" }}
        >
          {message.body}
        </Alert>
      </Snackbar>
      <MainSection setMessage={setMessage} set_results={set_results} />
      {!!results.length && <ResultsTable results={results} />}
    </Box>
  );
};

export default Home;
