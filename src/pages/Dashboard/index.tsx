import { Col, Row } from 'react-bootstrap'
import Statistics from './Statistics'
import WeeklySelesChart from './WeeklySelesChart'
import YearlySelesChart from './YearlySelesChart'
// import ChatList from './ChatList'
import Projects from './Projects'
import { authApi } from '@/common'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

// componets
import { PageBreadcrumb } from '@/components'

// data
// import { statistics } from './data'

const Dashboard = () => {
	const [loading, setLoading] = useState(false)
	const [dashboardData, setDashboardData] = useState({})

	useEffect(() => {
		getList()
	}, []);

	const getList = async () => {
		setLoading(true);
		try {
			const res: any = await authApi.dashboardData();
			if (res?.code == 200) {
				console.log(res?.data)
				setDashboardData(res?.data);
			} else if (res?.code === 400 || res?.code === 401) {
				toast.error(res?.message);
			} else {
				toast.error(res?.message);
			}
		} catch (error) {
			toast.error('Error fetching categories');
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<PageBreadcrumb title="" subName="Dashboard" />
			<Row>
				<Col xxl={3} sm={6}>
					<Statistics
						title='Total Users'
						stats={dashboardData.usersCount || 0}
						// change={item.change}
						icon='ri-group-2-line' //'ri-eye-line'
						variant='text-bg-pink'
					/>
				</Col>
				<Col xxl={3} sm={6}>
					<Statistics
						title='Total Patners'
						stats={dashboardData.patnerCount || 0}
						// change={item.change}
						icon='ri-group-2-line'
						variant='text-bg-purple'
					/>
				</Col>
				<Col xxl={3} sm={6}>
					<Statistics
						title='Booked Product'
						stats={dashboardData.clientCount || 0}
						// change={item.change}
						icon='ri-wallet-2-line'
						variant='text-bg-primary'
					/>
				</Col>
				<Col xxl={3} sm={6}>
					<Statistics
						title='Confirm Products'
						stats={dashboardData.contactUsCount || 0}
						// change={item.change}
						icon='ri-shopping-basket-line'
						variant='text-bg-info'
					/>
				</Col>
			</Row>

			<Row>
				<Col lg={6}>
					<WeeklySelesChart currentWeekTotalOrder={dashboardData?.currentWeekTotalOrder || 0}
						previousWeekTotalOrder={dashboardData?.previousWeekTotalOrder || 0}
						currentMonthTotalOrder={dashboardData?.currentMonthTotalOrder || 0}
						previousMonthTotalOrder={dashboardData?.previousMonthTotalOrder || 0}
						weeklyOrder={dashboardData?.weeklyOrder || 0}
					/>
				</Col>
				<Col lg={6}>
					<YearlySelesChart yearlyOrder={dashboardData?.yearlyOrder} />
				</Col>
			</Row>

			<Row>
				<Col xl={6}>
					<Projects recentOrder={dashboardData?.recentOrder} />
				</Col>
				<Col xl={6}>
					<Projects recentOrder={dashboardData?.recentOrder} />
				</Col>
			</Row>
		</>
	)
}

export default Dashboard
