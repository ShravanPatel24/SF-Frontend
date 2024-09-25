import { CareersApi } from '@/common'
import { useState } from 'react'
import type { List } from '@/types'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

export default function useCareers() {
	const [loading, setLoading] = useState(false)
	const [careersList, setCareersList] = useState([]);
	const [totalPages, setTotalPages] = useState(1);


	const getList = async ({ page, sortBy, limit, searchBy, status }: List) => {
		setLoading(true);
		try {
			const res: any = await CareersApi.getCareersList({ page, sortBy, limit, searchBy, status });
			if (res?.code == 200) {
				// Handle potential errors in the response format
				setTotalPages(res?.data?.totalPages);
				if (Array.isArray(res?.data?.docs)) {
					setCareersList(res?.data?.docs);
				} else {
					console.error('Unexpected response format from CareersApi.getCategoryList:', res.data);
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

	const updateStatus = async (item: any, type: any) => {
		try {
			const message = type === 'delete' ? 'delete' : item.status === 0 ? 'activate' : 'deactivate';
			item.status = type === 'delete' ? item.status : item.status === 0 ? 1 : 0;
			item.isDelete = type === 'delete' ? (item.isDelete === 0 ? 1 : 0) : item.isDelete;
			Swal.fire({
				title: "Are you sure?",
				text: `You want to ${message} this faq?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: `Yes, ${message} it!`
			  }).then(async (result) => {
				if (result.isConfirmed) {
					item.categoryId = item.categoryId?.id;
					const res: any = await CareersApi.updateCareers(item, item?.id); 
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
	
	return { loading, getList, careersList, totalPages, updateStatus }
}
