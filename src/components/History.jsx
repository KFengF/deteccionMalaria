import { Box, Paper } from "@mui/material";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Tests from "./Tests";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Células detectadas",
    },
  },
};

const labels = [
  "20-05-2022",
  "21-05-2022",
  "22-05-2022",
  "23-05-2022",
  "24-05-2022",
];

const data = {
  labels,
  datasets: [
    {
      label: "Total",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 600 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Células infectadas",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Células sanas",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
      borderColor: "rgb(128, 252, 3)",
      backgroundColor: "rgba(128, 252, 3, 0.5)",
    },
  ],
};

const History = () => {
  const [counter, set_counter] = useState(null);
  const [loading, set_loading] = useState(true);
  const [barD, set_barD] = useState(null);
  const [tests, set_tests] = useState(null);
  const [results, set_results] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const counterRef = ref(db, "counter/");
    const testRef = ref(db, "tests/");
    const resultsRef = ref(db, "results/");
    onValue(counterRef, (snapshot) => {
      const data = snapshot.val();
      set_counter(data);
    });
    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      set_tests(data);
    });
    onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      set_results(data);
    });
  }, []);

  useEffect(() => {
    if (counter && tests && results) {
      set_barD({
        labels: [""],
        datasets: [
          {
            label: "Infectada",
            data: [counter.infected],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Sana",
            data: [counter.healthy],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Total",
            data: [counter.total],
            borderColor: "rgb(128, 252, 3)",
            backgroundColor: "rgba(128, 252, 3, 0.5)",
          },
        ],
      });
      set_loading(false);
    }
  }, [counter, tests, results]);

  return (
    <Box
      minHeight="90vh"
      width="800px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="0 auto"
    >
      {loading ? (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <Paper
            className="over-particles v-margin24"
            elevation={2}
            style={{ width: "100%", padding: "5px 10px" }}
          >
            <Bar options={options} data={barD} />
          </Paper>
          <Tests tests={tests} results={results} />
        </>
      )}
    </Box>
  );
};

export default History;
