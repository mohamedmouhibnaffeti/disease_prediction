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
import { getMonthName } from "@/lib/functions/dates";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);


function PatientsOverallChart({patients}: {patients: Array<any>}) {
  const patientsData = [
    { month: "January", patients: 0 },
    { month: "February", patients: 0 },
    { month: "March", patients: 0 },
    { month: "April", patients: 0 },
    { month: "May", patients: 0 },
    { month: "June", patients: 0 },
    { month: "July", patients: 0 },
    { month: "August", patients: 0 },
    { month: "September", patients: 0 },
    { month: "October", patients: 0 },
    { month: "November", patients: 0 },
    { month: "December", patients: 0 },
  ];
  const monthMap = patientsData.reduce((map: any, { month }, index) => {
      map[month] = index;
      return map;
  }, {});
  
  patients.forEach((patient) => {
      const monthName = getMonthName(patient.requestedAt);
      const monthIndex = monthMap[monthName];
      if (monthIndex !== undefined) {
          patientsData[monthIndex].patients++;
      }
  });
  console.log(patientsData)
  const data = {
    labels: patientsData.map((data) => data.month),
    datasets: [
      {
        label: "Patients",
        data: patientsData.map((data) => data.patients),
        borderColor: "#03AED2",
        borderWidth: 3,
        pointBorderColor: "#03AED2",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(109, 197, 209, 1)");
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
          text: "Number of patients",
          padding: {
            bottom: 10,
          },
          font: {
            size: 25,
            style: "italic" as "italic",
            family: "Arial",
          },
        },
        min: 0,
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
      <h1 className="font-semibold text-gray-700 text-2xl text-start">
        Number of Recent Patients
      </h1>
      <div className="w-full mx-2 h-[400px] cursor-pointer p-[20px]">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

export default PatientsOverallChart;