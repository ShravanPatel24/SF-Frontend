import { useEffect, useState } from 'react';
import { PageBreadcrumb, CustomTable } from '@/components'
import useCustomerQueries from './customerQueries';

const CustomerQueriesTables = () => {
	const { loading, queriesList, getList, totalPages, updateStatus } = useCustomerQueries();
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [status, setStatus] = useState('');
	// const baseUrl = process.env.VITE_API_URL;
	const columns = ['S.No.', 'Name', 'Mobile', 'Email', 'Created At', 'Message'];
	const statusFilterValues = [{ value: '', label: 'All' }, { value: '1', label: 'Active' }, { value: '0', label: 'Inactive' }];

	useEffect(() => {
		// Call getList function when component mounts
		getList({ page: pageNumber, sortBy: 'asc', limit: 10, searchBy: encodeURIComponent(searchTerm), status: status });
	}, [searchTerm, pageNumber, status]);

	// Function to handle input change
	const handleInputChange = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const onPageChange = (event: any) => {
		setPageNumber(event);
	};

	const changeStatus = (event: any) => {
		setStatus(event);
	};

	return (
		<>
			<PageBreadcrumb title="Customer Queries Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={queriesList}
				addButtonName=""
				navigationUrl="/faq"
				isImage='hide'
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
				filterBy=""
				filterValue={statusFilterValues}
				status={status}
				isSlug={false}
				onPageChange={onPageChange}
				updateStatus={updateStatus}
				changeStatus={changeStatus}
				searchTerm={searchTerm}
				handleInputChange={handleInputChange}
				isAction={false}
			/>
		</>
	)
}

export default CustomerQueriesTables
