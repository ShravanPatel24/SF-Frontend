import { HttpClient } from '../helpers'

function CategoryService() {
	return {
		addCategory: (values: any) => {
			return HttpClient.post('/business-type', values)
		},
		getCategoryList: (request: any) => {
			let queryParams = `/business-type?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`;

			if (request.filterDateRange) {
				queryParams += `&filterDateRange=${request.filterDateRange}`;
			}

			return HttpClient.get(queryParams);
		},
		getCategoryListWithOutPagination: (request: any) => {
			return HttpClient.get(`/business-type/list/dropdown?searchBy=${request.searchBy}&status=${request.status}`)
		},
		getCategoryDetails: (values: any) => {
			return HttpClient.get('/business-type/' + values)
		},
		updateCategory: (values: any, id: any) => {
			return HttpClient.patch('/business-type/' + id, values)
		},
	}
}

export default CategoryService()
