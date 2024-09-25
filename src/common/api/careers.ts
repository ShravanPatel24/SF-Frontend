import { HttpClient } from '../helpers'

function CareersService() {
	return {
		addCareers: (values: any) => {
			return HttpClient.post('/careers', values)
		},
		getCareersList: (request: any)=> {
			return HttpClient.get(`/careers?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getCareersDetails: (values: any) => {
			return HttpClient.get('/careers/'+ values)
		},
		updateCareers: (values: any, id: any) => {
			return HttpClient.patch('/careers/'+ id, values)
		}
	}
}

export default CareersService()
