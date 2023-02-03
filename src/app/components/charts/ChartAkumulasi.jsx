import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartAkumulasi = ({ pengeluaran, pemasukan }) => {
	const data = {
		labels: ["Pengeluaran", "Pemasukan"],
		datasets: [
			{
				data: [pengeluaran, pemasukan],
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
		legend: false,
	};
	return (
		<>
			<Bar data={data} options={options} height={250} />
		</>
	);
};

export default ChartAkumulasi;
