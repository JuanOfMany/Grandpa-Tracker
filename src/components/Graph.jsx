import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { enUS } from "date-fns/locale";
import format from "date-fns/format";
import 'chartjs-adapter-date-fns';

export default function Graph() {
  const exampleDate = Date.now();
  console.log(exampleDate);

  ChartJS.register(LinearScale, TimeScale, LogarithmicScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    showLine: false,
    scales: {
      y: {
        min: 60,
        max: 180,
      },
      x:
        {
          ticks: {
            callback: function (value, index, ticks) {
              return format(value, "d MMM");
            },
          },
          type: 'time',
          adapters: {
            date: {
              locale: enUS,
            }
          }
        },
        months: {
          type: 'linear',
          position: 'bottom',
        },
        years: {
          type: 'linear',
          position: 'bottom',
        }
    },
  };

  const data = {
    datasets: [
      {
        label: "Grandpa's Blood Pressure",
        data: [
          { x: Date.now(), y: 120 },
          { x: 1694428361748, y: 130 },
          { x: 1696428366748, y: 110 },
          { x: 1691428461748, y: 100 },
          { x: 1699425361748, y: 150 },
          { x: 1697528361748, y: 170 },
        ],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return <Scatter id="chart" options={options} data={data} />;
}
