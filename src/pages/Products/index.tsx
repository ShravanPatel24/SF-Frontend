import { useEffect, useState } from 'react';
import { PageBreadcrumb, CustomTable } from '@/components'
import useProduct from './product';


const ProductTables = () => {
	const { loading, productList, getList, totalPages, updateStatus } = useProduct();
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [status, setStatus] = useState('');
	const columns = ['S.No.', 'Category Name', 'Product Name', 'Status', 'Action'];
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
			<PageBreadcrumb title="Product Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={productList}
				addButtonName="Add Product"
				navigationUrl="/products"
				isImage='show'
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

export default ProductTables
