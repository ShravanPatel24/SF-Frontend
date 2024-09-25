import { useEffect, useState } from 'react';
import { PageBreadcrumb, CustomTable } from '@/components'
import useOrder from './order';


const OrderTables = () => {
	const { loading, orderList, getList, totalPages, updateStatus } = useOrder();
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [status, setStatus] = useState('');
	const columns = ['S.No.', 'Order Id', 'Order Date', 'Status', 'Action'];
	const statusFilterValues = [{value: '', label:'All'}, {value: '1', label:'Active'}, {value: '0', label:'Inactive'}];

	useEffect(() => {
		// Call getList function when component mounts
		getList({ page: pageNumber, sortBy: 'asc', limit: 10, searchBy: encodeURIComponent(searchTerm) , status: status});
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
			<PageBreadcrumb title="Order Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={orderList}
				addButtonName=""
				navigationUrl="/orders"
				isImage='hide'
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
				filterBy="status"
				filterValue={statusFilterValues}
				status={status}
				isSlug={true}
				onPageChange={onPageChange}
				updateStatus={updateStatus}
				changeStatus={changeStatus}
				searchTerm={searchTerm}
				handleInputChange={handleInputChange}
				isAction={true}
			/>
		</>
	)
}

export default OrderTables
