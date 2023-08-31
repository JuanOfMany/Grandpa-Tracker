import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter, Line } from "react-chartjs-2";
import { enUS } from "date-fns/locale";
import format from "date-fns/format";
import "chartjs-adapter-date-fns";

export default function Graph() {
  ChartJS.register(
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  let timestamps = [
    1694428361748, 1694428361748, 1695428461748, 1696428366748, 1697528361748,
    1699425361748, 1693449895264, 1693549891748,
  ].sort();

  let exampleBPData = {
    systolic: [120, 140, 139, 100, 110, 170, 150, 160],
    diastolic: [80, 100, 75, 69, 85, 72, 100, 65, 61],
  };

  const data = {
    datasets: [
      {
        label: "Systolic",
        data: exampleBPData.systolic.map((BP, index) => {
          let obj = {
            x: timestamps[index],
            y: BP,
          };
          return obj;
        }),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Diastolic",
        data: exampleBPData.diastolic.map((BP, index) => {
          let obj = {
            x: timestamps[index],
            y: BP,
          };
          return obj;
        }),
        backgroundColor: "rgba(155, 89, 152, 2)",
      },
    ],
  };

  const options = {
    showLine: true,
    scaleShowValues: true,
    scales: {
      y: {
        min: 50,
        max: 190,
      },
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          unit: 'month',
          displayFormats: {
             month: 'MM/yy'
          },
          tooltipFormat: 'dd/MM/yy'
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Scatter id="chart" options={options} data={data} />;
}
