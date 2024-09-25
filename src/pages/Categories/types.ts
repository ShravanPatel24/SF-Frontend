export type TableRecord = {
	id: number
	firstName: string
	lastName: string
	username: string
}

export type Category = {
	id: number
	age: number
	name: string
	company: string
	phone: string
	subRows?: Category[]
}
