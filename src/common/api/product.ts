import { HttpClient } from '../helpers'

function ProductService() {
	return {
		addProduct: (values: any) => {
			return HttpClient.post('/product', values)
		},
		getProductList: (request: any)=> {
			return HttpClient.get(`/product?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getProductListWithOutPagination: (request: any)=> {
			return HttpClient.get(`/product/list/dropdown?searchBy=${request.searchBy}&status=${request.status}`)
		},
		getProductDetails: (values: any) => {
			return HttpClient.get('/product/slug/'+ values)
		},
		updateProduct: (values: any, id: any) => {
			return HttpClient.patch('/product/'+ id, values)
		},
	}
}

export default ProductService()
