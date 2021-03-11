import React, { PureComponent, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import {
	BarChart as Bars,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

export default class BarChart extends PureComponent {
	euroFormatter = (value) => `${value}€`;
	tooltipFormatter = (value) => [`${value}€`, this.props.valueName];

	render() {
		const data = [];

		this.props.labels.forEach((label) => {
			data.push({ name: label });
		});

		this.props.data.forEach((value) => {
			data[this.props.data.indexOf(value)].netIncome = value;
		});

		return (
			<Fragment>
				<MediaQuery maxDeviceWidth={768}>
					<Bars
						width={300}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							interval={1}
							angle={-20}
							dy={4}
							tick={{ fontSize: 10 }}
						/>
						<YAxis
							tickFormatter={this.euroFormatter}
							tick={{ fontSize: 10 }}
							dx={-2}
						/>
						<Tooltip formatter={this.tooltipFormatter} />
						<Bar dataKey="netIncome">
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry > 0 ? '#5AC968' : '#FF5253'}
								/>
							))}
						</Bar>
					</Bars>
				</MediaQuery>

				<MediaQuery minDeviceWidth={769}>
					<ResponsiveContainer width="100%" height="100%">
						<Bars
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="name"
								interval={0}
								angle={-20}
								dy={9}
								tick={{ fontSize: 12.5 }}
							/>
							<YAxis
								tickFormatter={this.euroFormatter}
								tick={{ fontSize: 12.5 }}
								dx={-2}
							/>
							<Tooltip formatter={this.tooltipFormatter} />
							<Bar dataKey="netIncome">
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={this.props.data[index] > 0 ? '#5AC968' : '#FF5253'}
									/>
								))}
							</Bar>
						</Bars>
					</ResponsiveContainer>
				</MediaQuery>
			</Fragment>
		);
	}
}
