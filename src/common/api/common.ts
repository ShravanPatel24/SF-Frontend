import { HttpClient } from '../helpers'

function CommonService() {
	return {
		getPreview: (value: any) => {
			return HttpClient.get('/media/preview?filename=' + value)
		}
	}
}

export default CommonService()
