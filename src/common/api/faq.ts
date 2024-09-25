import { HttpClient } from '../helpers'

function FAQService() {
	return {
		addFAQ: (values: any) => {
			return HttpClient.post('/faq', values)
		},
		getFAQList: (request: any)=> {
			return HttpClient.get(`/faq?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getFAQDetails: (values: any) => {
			return HttpClient.get('/faq/'+ values)
		},
		updateFAQ: (values: any, id: any) => {
			return HttpClient.patch('/faq/'+ id, values)
		}
	}
}

export default FAQService()
