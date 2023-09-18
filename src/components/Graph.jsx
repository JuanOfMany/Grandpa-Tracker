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
import { Scatter, Line, Bubble } from "react-chartjs-2";
import { enUS } from "date-fns/locale";
import format from "date-fns/format";
import "chartjs-adapter-date-fns";
import annotationPlugin from 'chartjs-plugin-annotation';

export default function Graph() {
  ChartJS.register(
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    annotationPlugin
  );

  let timestamps = [
    1694428361748, 1694428361748, 1695428461748, 1696428366748, 1697528361748,
    1699425361748, 1693449895264, 1693549891748,
  ].sort();

  let exampleBPData = {
    systolic: [120, 140, 139, 100, 110, 160, 150, 160],
    diastolic: [80, 100, 75, 69, 85, 72, 100, 65, 61],
  };

  let averageSystolic = exampleBPData.systolic.reduce((average, current) => average + current, 0)/exampleBPData.systolic.length

  let averageDiastolic = exampleBPData.diastolic.reduce((average, current) => average + current, 0)/exampleBPData.diastolic.length

  console.log(averageSystolic + '/' + averageDiastolic)

  const data = {
    datasets: [
      {
        label: "Systolic",
        data: exampleBPData.systolic.map((BP, index) => {
          let obj = {
            x: timestamps[index],
            y: BP,
            // r: Math.abs(BP - 120) * 0.5,
            r: 10,
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
            // r: Math.abs(BP - 80) * 0.8
            r: 10,
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
        type: "time",
        time: {
          parser: "YYYY-MM-DD",
          unit: "month",
          displayFormats: {
            month: "MMMM yy",
          },
          tooltipFormat: "B dd/MM/yy",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          targetSystolic: {
            type: 'line',
            borderDash: [6, 6],
            yMin: 120,
            yMax: 120,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          },
          targetDiastolic: {
            type: 'line',
            borderDash: [6, 6],
            yMin: 80,
            yMax: 80,
            borderColor: 'rgb(255, 99, 132',
            borderWidth: 2,
          }
        },
      }
    },
  };

  return <Bubble id="chart" options={options} data={data} />;
}
