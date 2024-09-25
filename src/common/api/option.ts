import { HttpClient } from '../helpers'

function VariationService() {
	return {
		addVariation: (values: any) => {
			return HttpClient.post('/variation', values)
		},
		getVariationList: (request: any)=> {
			return HttpClient.get(`/variation?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getVariationListWithOutPagination: (request: any)=> {
			return HttpClient.get(`/variation/list/dropdown?searchBy=${request.searchBy}&status=${request.status}`)
		},
		getVariationDetails: (values: any) => {
			return HttpClient.get('/variation/'+ values)
		},
		updateVariation: (values: any, id: any) => {
			return HttpClient.patch('/variation/'+ id, values)
		}
	}
}

export default VariationService()
