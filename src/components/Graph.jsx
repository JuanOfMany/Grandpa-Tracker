import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

export default function Graph () {

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    scales: {
    },
  };

  const data = {
    datasets: [
      {
        label: "Grandpa's Blood Pressure",
        data: [
          {x:10, y:14},
          {x:25, y:35},
          {x:21, y:20},
          {x:35, y:28},
          {x:15, y:10},
          {x:19, y:30},
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
      <Scatter id="chart" options={options} data={data} />
  )
}