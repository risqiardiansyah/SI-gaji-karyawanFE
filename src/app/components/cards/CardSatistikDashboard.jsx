import { Card } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Line } from 'react-chartjs-2';

const CardSatistikDashboard = ({ pemasukan, pengeluaran, loading }) => {
	const data = {
		labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
		datasets: [
			{
				label: "Pemasukan",
				data: pemasukan,
				fill: true,
				backgroundColor: "rgba(108, 219, 39, 0.2)",
				borderColor: "rgba(108, 219, 39, 0.8)",
			},
			{
				label: "Pengeluaran",
				data: pengeluaran,
				fill: true,
				backgroundColor: "rgba(255, 158, 179, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
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
	};
	return (
		<Card className="px-5 py-7">
			<h3>Earning Statistics</h3>
			{loading ? (
				<Skeleton width="100%">
					<div style={{ width: "100%", height: 200 }}></div>
				</Skeleton>
			) : (
				<Line data={data} options={options} />
			)}
		</Card>
	);
};

export default CardSatistikDashboard;
