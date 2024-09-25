import { HttpClient } from '../helpers'

function ContactUsService() {
	return {
		addFAQ: (values: any) => {
			return HttpClient.post('/contact-us', values)
		},
		getFAQList: (request: any)=> {
			return HttpClient.get(`/contact-us?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getFAQDetails: (values: any) => {
			return HttpClient.get('/contact-us/'+ values)
		},
		updateFAQ: (values: any, id: any) => {
			return HttpClient.patch('/contact-us/'+ id, values)
		}
	}
}

export default ContactUsService()
