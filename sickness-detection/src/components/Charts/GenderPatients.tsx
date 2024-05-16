"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const femaleData = [
  { month: "January", sales: 100 },
  { month: "February", sales: 150 },
  { month: "March", sales: 200 },
  { month: "April", sales: 120 },
  { month: "May", sales: 180 },
  { month: "June", sales: 250 },
];

const maleData = [
    { month: "January", sales: 120 },
    { month: "February", sales: 130 },
    { month: "March", sales: 180 },
    { month: "April", sales: 140 },
    { month: "May", sales: 200 },
    { month: "June", sales: 280 },
  ];

function GenderLineChart() {
  const data = {
    labels: femaleData.map((data) => data.month),
    datasets: [
      {
        label: "Females",
        data: femaleData.map((data) => data.sales),
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(247, 151, 225, 1)"); // Transparent pink
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
      },
      {
        label: "Males",
        data: maleData.map((data) => data.sales),
        borderColor: "#00FFFF",
        borderWidth: 3,
        pointBorderColor: "#00FFFF",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(125, 249, 255, 1)"); // Transparent light blue
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as "top", // Specify the position explicitly
        labels: {
          font: {
            size: 14, // Adjust font size as needed
            weight: "bold" as "bold",
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold" as "bold",
          },
        },
        title: {
          display: true,
          text: "Number of patients",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 17,
            weight: "bold" as "bold",
          },
        },
        /*
        title: {
          display: true,
          text: "Month",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
        */
      },
    },
  };
  

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10">
        Line Chart using ChartJS
      </h1>
      <div
        style={{
          width: "900px",
          height: "400px",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default GenderLineChart;