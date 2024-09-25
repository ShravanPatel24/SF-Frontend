import { HttpClient } from '../helpers'

function OutClientService() {
	return {
		addOurClient: (values: any) => {
			return HttpClient.post('/our-client', values)
		},
		getOurClientList: (request: any)=> {
			return HttpClient.get(`/our-client?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getOurClientDetails: (values: any) => {
			return HttpClient.get('/our-client/'+ values)
		},
		updateOurClient: (values: any, id: any) => {
			return HttpClient.patch('/our-client/'+ id, values)
		}
	}
}

export default OutClientService()
