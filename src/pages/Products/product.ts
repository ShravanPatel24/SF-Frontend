import { productApi, categoryApi, subCategoryApi, optionApi } from '@/common'
import { useState } from 'react'
import type { List } from '@/types'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

export default function useProduct() {
	const [loading, setLoading] = useState(false)
	const [categoryList, setCategoryList] = useState([]);
	const [subCategoryList, setSubCategoryList] = useState([]);
	const [optionsList, setOptionsList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const getCategoryList = async (searchBy: any, status: any) => {
		setLoading(true);
		try {
			const res: any = await categoryApi.getCategoryListWithOutPagination({ searchBy, status });
			if (res?.code == 200) {
				if (Array.isArray(res?.data)) {
					const options = res?.data.map((category: any) => ({
						label: category.name,
						value: category.id
					  }));
					setCategoryList(options);
				}
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

	const getSubCategoryList = async (searchBy: any, status: any, categoryId: any) => {
		setLoading(true);
		try {
			const res: any = await subCategoryApi.getCategoryListWithOutPagination({ searchBy, status, categoryId });
			if (res?.code == 200) {
				// Handle potential errors in the response format
				if (Array.isArray(res?.data)) {
					const options = res?.data.map((category: any) => ({
						label: category.name,
						value: category.id
					  }));
					setSubCategoryList(options);
				}
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

	const getProductVariation = async (searchBy: any, status: any) => {
		setLoading(true);
		try {
			const res: any = await optionApi.getVariationListWithOutPagination({ searchBy, status });
			if (res?.code == 200) {
				if (Array.isArray(res?.data)) {
					const options = res?.data.map((option: any) => ({
						label: option.name,
						value: option.id
					  }));
					setOptionsList(options);
				}
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

	const getList = async ({ page, sortBy, limit, searchBy, status }: List) => {
		setLoading(true);
		try {
			const res: any = await productApi.getProductList({ page, sortBy, limit, searchBy, status });
			if (res?.code == 200) {
				// Handle potential errors in the response format
				setTotalPages(res?.data?.totalPages);
				if (Array.isArray(res?.data?.docs)) {
					setProductList(res?.data?.docs);
				} else {
					console.error('Unexpected response format from productApi.getproductList:', res.data);
				}
			} else if (res?.code === 400 || res?.code === 401) {
				toast.error(res?.message);
			} else {
				toast.error(res?.message);
			}
		} catch (error) {
			toast.error(`Error fetching categories ${error}`);
		} finally {
			setLoading(false);
		}
	};

	const updateStatus = async (item: any, type: any) => {
		try {
			const message = type === 'delete' ? 'delete' : item.status === 0 ? 'activate' : 'deactivate';
			item.status = type === 'delete' ? item.status : item.status === 0 ? 1 : 0;
			item.isDelete = type === 'delete' ? (item.isDelete === 0 ? 1 : 0) : item.isDelete;
			Swal.fire({
				title: "Are you sure?",
				text: `You want to ${message} this product?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: `Yes, ${message} it!`
			  }).then(async (result) => {
				if (result.isConfirmed) {
					item.productVariant = JSON.stringify(item.productVariant)
					const res: any = await productApi.updateProduct(item, item?.id); 
					if (res?.code == 200) {
						toast.success(res?.message);
						getList({ page: 1, sortBy: 'asc ', limit: 10, searchBy: '', status: '' });
					} else if (res?.code === 400 || res?.code === 401) {
						toast.error(res?.message);
					} else {
						toast.error(res?.message);
					}
				}
			  });
		} catch (error) {
			toast.error('Error updating category status');
		}
	};
	
	return { loading, getList, productList, totalPages, updateStatus, getCategoryList, categoryList, getSubCategoryList, subCategoryList, getProductVariation, optionsList }
}
