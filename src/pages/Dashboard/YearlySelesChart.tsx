import { Card, Col, Row } from 'react-bootstrap'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import { useState, useEffect } from 'react'
// components
import { CustomCardPortlet } from '@/components'

const UsChart = () => {
	const usChartOpts: ApexOptions = {
		series: [44, 55, 13, 43],

		chart: {
			width: 80,
			type: 'pie',
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		colors: ['#1a2942', '#f13c6e', '#3bc0c3', '#d1d7d973'],
		labels: ['Team A', 'Team B', 'Team C', 'Team D'],
	}
	return (
		<Card>
			<Card.Body>
				<div className="d-flex align-items-center">
					<div className="flex-grow-1 overflow-hidden">
						<h4 className="fs-22 fw-semibold">69.25%</h4>
						<p className="text-uppercase fw-medium text-muted text-truncate mb-0">
							{' '}
							US Dollar Share
						</p>
					</div>
					<div className="flex-shrink-0" dir="ltr">
						<ReactApexChart
							height={90}
							width={80}
							options={usChartOpts}
							series={usChartOpts.series}
							type="pie"
							className="apex-charts"
						/>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}
const YearlySelesChart = ({ yearlyOrder }) => {
	// const yearlyChartOpts: ApexOptions = {
	// 	series: [
	// 		{
	// 			name: 'inquiries',
	// 			data: [5, 15, 25, 36, 32, 42, 45],
	// 		},
	// 	],
	// 	chart: {
	// 		height: 250,
	// 		type: 'line',
	// 		toolbar: {
	// 			show: false,
	// 		},
	// 	},
	// 	colors: ['#3bc0c3', '#1a2942', '#d1d7d973'],

	// 	stroke: {
	// 		curve: 'smooth',
	// 		width: [3, 3],
	// 	},
	// 	markers: {
	// 		size: 3,
	// 	},
	// 	xaxis: {
	// 		categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	// 	},
	// 	legend: {
	// 		show: false,
	// 	},
	// }

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [yearlyChartOpts, setYearlyChartOpts] = useState({
        series: [
            {
                name: 'inquiries',
                data: [5, 15, 25, 36, 32, 42, 45],
            },
        ],
        chart: {
            height: 250,
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        colors: ['#3bc0c3', '#1a2942', '#d1d7d973'],
        stroke: {
            curve: 'smooth',
            width: [3, 3],
        },
        markers: {
            size: 3,
        },
        xaxis: {
            categories: months,
        },
        legend: {
            show: false,
        },
    });

	const [quarterlySales, setQuarterlySales] = useState({
        Q1: 0,
        Q2: 0,
        Q3: 0,
        Q4: 0,
        total: 0,
    });

    useEffect(() => {
        if (yearlyOrder && yearlyOrder?.series.length > 0) {
            // Initialize an array with 0 counts for all months
            // const monthlyData = Array(12).fill(0);

            setYearlyChartOpts(prevOpts => ({
                ...prevOpts,
                series: yearlyOrder?.series,
                xaxis: {
                    ...prevOpts.xaxis,
                    categories: months,
                },
            }));

			 // Calculate quarterly and total sales
			 const Q1 = yearlyOrder?.series[0]?.data?.slice(0, 3).reduce((acc, count) => acc + count, 0);
			 const Q2 = yearlyOrder?.series[0]?.data?.slice(3, 6).reduce((acc, count) => acc + count, 0);
			 const Q3 = yearlyOrder?.series[0]?.data?.slice(6, 9).reduce((acc, count) => acc + count, 0);
			 const Q4 = yearlyOrder?.series[0]?.data?.slice(9, 12).reduce((acc, count) => acc + count, 0);
			 const total = Q1 + Q2 + Q3 + Q4;

			 setQuarterlySales({
                Q1,
                Q2,
                Q3,
                Q4,
                total,
            });
        }
    }, [yearlyOrder]);

    return (
        <>
            <CustomCardPortlet
                cardTitle="Yearly Sales Report"
                titleClass="header-title"
            >
                <div dir="ltr">
                    <ReactApexChart
                        height={250}
                        options={yearlyChartOpts}
                        series={yearlyChartOpts.series}
                        type="line"
                        className="apex-charts"
                    />
                </div>
                <Row className="text-center">
                    <Col>
                        <p className="text-muted mt-3 mb-2">Quarter 1</p>
                        <h4 className="mb-0">{quarterlySales.Q1}</h4>
                    </Col>
                    <Col>
                        <p className="text-muted mt-3 mb-2">Quarter 2</p>
                        <h4 className="mb-0">{quarterlySales.Q2}</h4>
                    </Col>
                    <Col>
                        <p className="text-muted mt-3 mb-2">Quarter 3</p>
                        <h4 className="mb-0">{quarterlySales.Q3}</h4>
                    </Col>
                    <Col>
                        <p className="text-muted mt-3 mb-2">Quarter 4</p>
                        <h4 className="mb-0">{quarterlySales.Q4}</h4>
                    </Col>
                    <Col>
                        <p className="text-muted mt-3 mb-2">Total</p>
                        <h4 className="mb-0">{quarterlySales.total}</h4>
                    </Col>
                </Row>
            </CustomCardPortlet>
        </>
    );
};

export default YearlySelesChart
