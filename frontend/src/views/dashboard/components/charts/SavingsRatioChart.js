import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import {
	PieChart,
	Pie,
	Tooltip,
	Legend,
	Cell,
	ResponsiveContainer,
} from 'recharts';

const SavingsRatioChart = (props) => {
	const data = [
		{ name: 'Income', value: props.totalIncome },
		{ name: 'Expenses', value: props.totalExpenses },
	];

	// Hard coded the colors for income = green, expenses = red
	const colors = ['#5AC968', '#FF5252'];

	return (
		<Fragment>
			<MediaQuery maxDeviceWidth={768}>
				<PieChart width={300} height={300}>
					<Legend />
					<Tooltip />
					<Pie
						isAnimationActive={false}
						data={data}
						outerRadius={110}
						fill="#5AC968"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={Math.random()} fill={colors[index % colors.length]} />
						))}
					</Pie>
				</PieChart>
			</MediaQuery>
			<MediaQuery minDeviceWidth={769}>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Legend />
						<Tooltip />
						<Pie
							isAnimationActive={false}
							data={data}
							outerRadius={140}
							fill="#5AC968"
							dataKey="value"
						>
							{data.map((entry, index) => (
								<Cell
									key={Math.random()}
									fill={colors[index % colors.length]}
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</MediaQuery>
		</Fragment>
	);
};

export default SavingsRatioChart;
