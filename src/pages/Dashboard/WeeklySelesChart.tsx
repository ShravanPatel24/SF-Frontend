import { Col, Row } from 'react-bootstrap'
// import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { useState, useEffect } from 'react'

// components
import { CustomCardPortlet } from '@/components'

const WeeklySelesChart = ({ currentWeekTotalOrder, previousWeekTotalOrder, currentMonthTotalOrder, previousMonthTotalOrder, weeklyOrder }) => {
	const [weeklyChartOpts, setWeeklyChartOpts] = useState({
		series: [
			{
				name: 'Orders',
				data: [],
			},
		],
		chart: {
			height: 377,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				columnWidth: '60%',
			},
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#3bc0c3', '#1a2942', '#d1d7d973'],
		xaxis: {
			categories: [],
		},
		yaxis: {
			title: {
				text: '(thousands)',
			},
		},
		legend: {
			offsetY: 7,
		},
		grid: {
			padding: {
				bottom: 20,
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + ' Orders';
				},
			},
		},
	});
	useEffect(() => {
		const categories = weeklyOrder && weeklyOrder.map(order => new Date(order._id).toLocaleDateString('en-US', { weekday: 'long' }));
		const data = weeklyOrder && weeklyOrder.map(order => order.count);

		setWeeklyChartOpts(prevOpts => ({
			...prevOpts,
			series: [
				{
					name: 'Orders',
					data: data,
				},
			],
			xaxis: {
				...prevOpts.xaxis,
				categories: categories,
			},
		}));
	}, [weeklyOrder]);
	return (
		<CustomCardPortlet
			cardTitle="Weekly Order Report"
			titleClass="header-title"
		>
			<div dir="ltr">
				<ReactApexChart
					height={377}
					options={weeklyChartOpts}
					series={weeklyChartOpts.series}
					type={weeklyChartOpts.chart.type}
					// type="bar"
					className="apex-charts"
				/>
			</div>

			<Row className="text-center">
				<Col>
					<p className="text-muted mt-3">Current Week Order</p>
					<h3 className=" mb-0">
						<span>{currentWeekTotalOrder}</span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Previous Week Order</p>
					<h3 className=" mb-0">
						<span>{previousWeekTotalOrder} </span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Current Month Order</p>
					<h3 className=" mb-0">
						<span>{currentMonthTotalOrder}</span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Previous Month Orders</p>
					<h3 className=" mb-0">
						<span>{previousMonthTotalOrder}</span>
					</h3>
				</Col>
			</Row>
		</CustomCardPortlet>
	)
}

export default WeeklySelesChart
