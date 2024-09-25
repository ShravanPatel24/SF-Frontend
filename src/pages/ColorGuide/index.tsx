import { useEffect, useState } from 'react';
import { PageBreadcrumb, CustomTable } from '@/components'
import useCategory from './colorGuide';

const ColorGuideTables = () => {
	const { loading, colorGuideList, getList, totalPages, updateStatus } = useCategory();
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [status, setStatus] = useState('');
	// const baseUrl = process.env.VITE_API_URL;
	const columns = ['S.No.', 'Color Name', 'Status', 'Action'];
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
			<PageBreadcrumb title="Our Client Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={colorGuideList}
				addButtonName="Add Color Guide"
				navigationUrl="/color-guide"
				isImage='show'
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
				filterBy="status"
				filterValue={statusFilterValues}
				status={status}
				isSlug={false}
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

export default ColorGuideTables
