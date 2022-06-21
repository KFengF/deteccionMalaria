import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ShortUniqueId from "short-unique-id";

const ResultsTable = ({ results }) => {
  const generateCSV = () => {
    if (!results) return;
    const uid = new ShortUniqueId({ length: 8 })();
    const metadata = "data:text/csv;charset=utf-8,";
    const keys = Object.keys(results[0]);
    const headers = keys.join(",") + "\n";
    const rows = results
      .map((result) => {
        return Object.values(result).join(",");
      })
      .join("\n");

    const encodedUri = encodeURI(metadata + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resultados-malaria-" + uid + ".csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  };

  return (
    <Box width="100%" display="flex" alignItems="start" justifyContent="center">
      <TableContainer
        component={Paper}
        style={{ maxWidth: "650px" }}
        className="over-particles"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre imagen</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Probabilidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {result.filename}
                </TableCell>
                <TableCell component="th" scope="row">
                  {result.status}
                </TableCell>
                <TableCell align="right">
                  {Math.floor(result.probability * 10000) / 100}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        size="large"
        edge="end"
        color="secondary"
        aria-label="download"
        sx={{ mr: 2 }}
        onClick={generateCSV}
      >
        <DownloadIcon />
      </IconButton>
    </Box>
  );
};

export default ResultsTable;
