import { HttpClient } from '../helpers'

function SubCategoryService() {
	return {
		addSubCategory: (values: any) => {
			return HttpClient.post('/sub-category', values)
		},
		getSubCategoryList: (request: any)=> {
			return HttpClient.get(`/sub-category?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getCategoryListWithOutPagination: (request: any)=> {
			return HttpClient.get(`/sub-category/list/dropdown?searchBy=${request.searchBy}&status=${request.status}&categoryId=${request.categoryId}`)
		},
		getSubCategoryDetails: (values: any) => {
			return HttpClient.get('/sub-category/slug/'+ values)
		},
		updateSubCategory: (values: any, id: any) => {
			return HttpClient.patch('/sub-category/'+ id, values)
		}
	}
}

export default SubCategoryService()
