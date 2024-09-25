import { HttpClient } from '../helpers'

function OrderService() {
	return {
		getOrderList: (request: any)=> {
			return HttpClient.get(`/order?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getOrderDetails: (values: any) => {
			return HttpClient.get('/order/'+ values)
		},
		updateOrder: (values: any, id: any) => {
			return HttpClient.patch('/order/'+ id, values)
		}
	}
}

export default OrderService()
