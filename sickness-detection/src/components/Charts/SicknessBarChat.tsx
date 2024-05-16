"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});
const data = {
  labels: ['grippe', 'grippe zeda', 'cancer', 'hypertension', 'mridh', 'fachla'],
  datasets: [
    {
      label: 'Trending sicknesses in the past 7 days',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const SicknessBarChart = () => {
  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1 className="font-semibold text-gray-700 text-2xl text-start">
        Trending Sicknesses in the past 7 days 
      </h1>
      <Bar data={data} />
    </div>
  );
};
export default SicknessBarChart;