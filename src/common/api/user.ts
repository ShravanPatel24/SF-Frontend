import { HttpClient } from '../helpers'

function UserService() {
	return {
		addUser: (values: any) => {
			return HttpClient.post('/admin/user', values)
		},
		getUserList: (request: any) => {
			let queryParams = `/admin/user?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}&type=${request.type}`;
	  
			if (request.filterDateRange) {
			  queryParams += `&filterDateRange=${request.filterDateRange}`;
			}
	  
			return HttpClient.get(queryParams);
		},
		getUserListWithOutPagination: (request: any)=> {
			return HttpClient.get(`/admin/user/list/dropdown?searchBy=${request.searchBy}&status=${request.status}`)
		},
		getUserDetails: (values: any) => {
			return HttpClient.get('/admin/user/'+ values)
		},
		getBusinessTypes: () => {
			return HttpClient.get('/business-type')
		},
		updateUser: (values: any, id: any) => {
			return HttpClient.patch('/admin/user/'+ id, values)
		},
		deleteUser: (id: any) => {
			return HttpClient.delete('/admin/user/'+ id)
		},
	}
}

export default UserService()