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
import { getAgeCounts } from "@/lib/functions/objects";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function AgeLineChart({patients}: {patients: Array<any>}) {
  const patientsData = getAgeCounts(patients)
  const data = {
    labels: patientsData.map((data: any) => data.count),
    datasets: [
      {
        label: "Patients",
        data: patientsData.map((data: any) => data.age),
        borderColor: "#D3D3D3",
        borderWidth: 3,
        pointBorderColor: "#D3D3D3",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(211, 211, 211, 1)");
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
        position: "top" as "top",
        labels: {
          font: {
            size: 14,
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
          text: "Age",
          padding: {
            bottom: 10,
          },
          font: {
            size: 25,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
        min: 15,
      },
      x: {
        ticks: {
          font: {
            size: 14,
            weight: "bold" as "bold",
          },
        },
        title: {
          display: true,
          text: "Number of patients",
          padding: {
            top: 10,
          },
          font: {
            size: 18,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
      },
    },
  };
  

  return (
    <div>
      <h1 className="font-semibold text-gray-700 text-2xl text-start">
        Number of Recent Patients per Age
      </h1>
      <div className="w-full mx-2 h-[400px] cursor-pointer p-[20px]">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default AgeLineChart;