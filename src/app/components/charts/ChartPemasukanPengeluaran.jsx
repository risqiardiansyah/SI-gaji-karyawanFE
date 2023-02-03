import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const ChartPemasukanPengeluaran = ({ dataVal, label }) => {
	const [Background, setBackground] = useState([]);
	const [Border, setBorder] = useState([]);
	useEffect(() => {
		const backgroundColor = [];
		const borderColor = [];
		for (let i = 0; i < dataVal.length; i++) {
			let r = Math.floor(Math.random() * 255);
			let g = Math.floor(Math.random() * 255);
			let b = Math.floor(Math.random() * 255);
			backgroundColor.push(`rgba(${r},${g},${b},0.2)`);
			borderColor.push(`rgba(${r},${g},${b},1)`);
		}
		setBackground(backgroundColor);
		setBorder(borderColor);
	}, []);

	const data = {
		labels: label,
		datasets: [
			{
				label: "# of Votes",
				data: dataVal,
				backgroundColor: Background,
				borderColor: Border,
				borderWidth: 1,
			},
		],
	};

	const options = {
		legend: false,
	};
	return <Pie data={data} options={options} height={150} />;
};

export default ChartPemasukanPengeluaran;
