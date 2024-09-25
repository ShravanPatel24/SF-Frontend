import { useEffect, useState } from 'react';
import { PageBreadcrumb, CustomTable } from '@/components'
import useSubCategory from './subCategory';

const SubCategoryTables = () => {
	const { loading, subCategoryList, getList,  totalPages, updateStatus } = useSubCategory();
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [status, setStatus] = useState('');
	const columns = ['S.No.', 'Category Name', 'Sub Category Name', 'Status', 'Action'];
	const statusFilterValues = [{value: '', label:'All'}, {value: '1', label:'Active'}, {value: '0', label:'Inactive'}];
	// const baseUrl = process.env.VITE_API_URL;

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
			<PageBreadcrumb title="Sub Category Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={subCategoryList}
				addButtonName="Add Sub Category"
				navigationUrl="/categories/sub-category"
				isImage='hide'
				filterBy="status"
				filterValue={statusFilterValues}
				status={status}
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
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

export default SubCategoryTables
