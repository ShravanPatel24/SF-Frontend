import { Table } from 'react-bootstrap';

// components
import { CustomCardPortlet } from '@/components'

// data
// import { projects } from './data'

const Projects = ({recentOrder}) => {
	const formatDate = (date) => {
		const d = new Date(date);
	  
		// Get individual components
		let hours = d.getHours();
		const minutes = d.getMinutes();
		// const seconds = d.getSeconds();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		
		// Convert hours from 24-hour to 12-hour format
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		
		// Pad minutes and seconds with leading zeroes
		const strMinutes = minutes < 10 ? '0' + minutes : minutes;
		// const strSeconds = seconds < 10 ? '0' + seconds : seconds;
	  
		// Format date
		const formattedDate = d.toISOString().split('T')[0];
		const formattedTime = `${hours}:${strMinutes} ${ampm}`;
	  
		return `${formattedDate} ${formattedTime}`;
	  };

	  
	return (
		<CustomCardPortlet cardTitle="Orders" titleClass="header-title">
			<Table hover responsive className="table-nowrap mb-0">
				<thead>
					<tr>
						<th>#</th>
						<th>Order No</th>
						<th>Order Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{(recentOrder || []).map((project, idx) => {
						return (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{project?.orderId}</td>
								<td>{formatDate(project?.createdAt)}</td>
								<td>{project.userId?.firstName + ' ' + project.userId?.lastName}</td>
								<td>{project.userId?.email || 'NA'}</td>
								<td>View</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</CustomCardPortlet>
	)
}

export default Projects
