import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      display: false,
      text: "",
    },
  },
};

function getPreviousDay(date = new Date(), days) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - days);

  return previous;
}

const Tests = ({ tests, results }) => {
  const today = new Date();
  const today0 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const days = [
    getPreviousDay(today0, 4),
    getPreviousDay(today0, 3),
    getPreviousDay(today0, 2),
    getPreviousDay(today0, 1),
    today0,
  ];

  const getData = (ID) => {
    const daysHealthy = {};
    const daysInfected = {};

    days.forEach((day) => {
      const dayMs = day.getTime();
      daysHealthy[dayMs] = 0;
      daysInfected[dayMs] = 0;
    });

    Object.values(tests[ID].results).forEach((result) => {
      for (let i = 4; i > -1; i--) {
        const dayMs = days[i].getTime();

        if (results[result].date > dayMs) {
          if (results[result].infectedProb > 0.5) {
            daysInfected[dayMs]++;
          } else {
            daysHealthy[dayMs]++;
          }
          break;
        }
      }
    });

    return {
      labels: days.map((day) => day.toLocaleDateString()),
      datasets: [
        {
          label: "Sanas",
          data: days.map((day) => {
            const dayMs = day.getTime();
            return daysHealthy[dayMs];
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Infectadas",
          data: days.map((day) => {
            const dayMs = day.getTime();
            return daysInfected[dayMs];
          }),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };

  return (
    <Box className="over-particles width100">
      {Object.keys(tests).map((ID, i) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}a-content`}
            id={`panel1${i}-header`}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>{ID}</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {tests[ID].name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Line options={options} data={getData(ID)} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Tests;
