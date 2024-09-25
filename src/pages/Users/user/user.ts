import { UserService } from '@/common'
import { useState } from 'react'
import type { List } from '@/types'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function useUsers() {
	const [loading, setLoading] = useState(false)
	const [usersList, setUsersList] = useState([])
	const [totalPages, setTotalPages] = useState(1)

	const getList = async ({
		page,
		sortBy,
		limit,
		searchBy,
		status,
		type,
		filterDateRange,
	}: List) => {
		setLoading(true)
		try {
			const res: any = await UserService.getUserList({
				page,
				sortBy,
				limit,
				searchBy,
				status,
				type,
				filterDateRange,
			})
			if (res?.code == 200) {
				// Handle potential errors in the response format
				setTotalPages(res?.data?.totalPages)
				if (Array.isArray(res?.data?.docs)) {
					const updatedUsersList = res.data.docs.map((user: any) => {
						// Check if `name` or `email` is missing and update accordingly
						if (!user.hasOwnProperty('name') || !user.hasOwnProperty('email')) {
							return {
								...user,
								name: user.name || 'NA', // If `name` doesn't exist, add 'NA'
								email: user.email || 'NA', // Optional: Add 'NA' if email is missing
							}
						}
						return user // Return the user object as-is if both `name` and `email` exist
					})

					setUsersList(updatedUsersList)
				} else {
					console.error(
						'Unexpected response format from UserService.getUserList:',
						res.data
					)
				}
			} else if (res?.code === 400 || res?.code === 401) {
				toast.error(res?.message)
			} else {
				toast.error(res?.message)
			}
		} catch (error) {
			toast.error('Error fetching users')
		} finally {
			setLoading(false)
		}
	}

	const updateStatus = async (item: any, type: string) => {
		try {
			const message = type === 'delete'
				? 'delete'
				: item.status === 0
					? 'activate'
					: 'deactivate';

			Swal.fire({
				title: 'Are you sure?',
				text: `You want to ${message} this user?`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: `Yes, ${message} it!`,
			}).then(async (result) => {
				if (result.isConfirmed) {
					// Handle deletion
					if (type === 'delete') {
						const res: any = await UserService.deleteUser(item.id);
						if (res?.code === 200) {
							toast.success('User deleted successfully');
							getList({ // Refresh the user list
								page: 1,
								sortBy: 'asc',
								limit: 10,
								searchBy: '',
								status: '',
								filterDateRange: '',
							});
						} else {
							toast.error(res?.message || 'Failed to delete user');
						}
					} else {
						// Handle activate/deactivate
						item.status = item.status === 0 ? 1 : 0;
						const res: any = await UserService.updateUser(item, item.id);
						if (res?.code === 200) {
							toast.success(res?.message || 'User status updated');
							getList({ // Refresh the user list
								page: 1,
								sortBy: 'asc',
								limit: 10,
								searchBy: '',
								status: '',
								filterDateRange: '',
							});
						} else {
							toast.error(res?.message || 'Failed to update user');
						}
					}
				}
			});
		} catch (error) {
			toast.error('Error processing request');
		}
	};


	return { loading, getList, usersList, totalPages, updateStatus }
}