import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  LogarithmicScale,
  CategoryScale,
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
    CategoryScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  let timestamps = [
    1694428361748, 1695428461748, 1696428366748, 1697528361748, 1699425361748, 1693449895264, 1693549891748,
  ]

  let days = timestamps.map((date) => format(date, "d"))

  let months = timestamps.map((date) => format(date, "MMMM"));

  let years = timestamps.map((date) => format(date, "yyyy"));

  let exampleBPData = {
    systolic: [120, 139, 100, 110, 170, 150, 160, 190],
    diastolic: [80, 75, 69, 85, 72, 100, 65, 61],
  };

  const data = {
    labels: months.map((month, index) => days[index] + month + ";" + years[index]),
    datasets: [
      {
        label: "Systolic",
        data: exampleBPData.systolic,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Diastolic",
        data: exampleBPData.diastolic,
        backgroundColor: "rgba(155, 89, 152, 2)",
      },
    ],
  };

  let usedLabels = [];

  const options = {
    showLine: true,
    scales: {
      y: {
        min: 60,
        max: 180,
      },
      x: {
        ticks: {
          autoSkip: false,
          callback: function(index) {
            let labelOfTick = this.getLabelForValue(index)
            console.log(labelOfTick);
            return (days[index])
          }
        },
        type: 'category',
        gridLines: {
          display: false,
          drawnOnChartArea: false,
        },
      },
      months: {
        type: 'category',
        position: 'bottom',
        gridLines: {
          display: false,
          drawnOnChartArea: false,
        },
        ticks: {
          display: true,
          autoSkip: false,
          callback: function(index) {
            // console.log(usedLabels.includes(months[index]))
            if (!usedLabels.includes(months[index])) {
              // console.log(months[index])
              usedLabels.push(months[index])
              // console.log(usedLabels);
              return months[index]
            } else {
              return " "
            }
             }
        },
      },
      years: {
        type: 'category',
        position: 'bottom',
        gridLines: {
          drawnOnChartArea: false,
        },
        ticks: {
          callback: function(index) {
            if (!usedLabels.includes(years[index])) {
              // console.log(months[index])
              usedLabels.push(years[index])
              // console.log(usedLabels);
              return years[index]
            } else {
              return " "
            }
          }
        }
      }
    },
  };

  return <Line id="chart" options={options} data={data} />;
}
