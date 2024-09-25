import { HttpClient } from '../helpers'

function StaticContentService() {
	return {
		addStaticContent: (values: any) => {
			return HttpClient.post('/static-content', values)
		},
		getStaticContentList: (request: any)=> {
			return HttpClient.get(`/static-content/for/admin?page=${request.page}&sortBy=${request.sortBy}&limit=${request.limit}&searchBy=${request.searchBy}&status=${request.status}`)
		},
		getStaticContentDetails: (values: any) => {
			return HttpClient.get('/static-content/page/'+ values)
		},
		updateStaticContent: (values: any, id: any) => {
			return HttpClient.patch('/static-content/using-pageId/'+ id, values)
		}
	}
}

export default StaticContentService()
