import { HttpClient } from '../helpers'

function ColorGuideService() {
	return {
		addColorGuide: (values: any) => {
			return HttpClient.post('/color-guide', values)
		},
		getColorGuideList: (request: any)=> {
			return HttpClient.get(`/color-guide?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getColorGuideDetails: (values: any) => {
			return HttpClient.get('/color-guide/'+ values)
		},
		updateColorGuide: (values: any, id: any) => {
			return HttpClient.patch('/color-guide/'+ id, values)
		}
	}
}

export default ColorGuideService()
