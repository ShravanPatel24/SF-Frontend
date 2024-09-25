import { useEffect, useState } from 'react'
import { PageBreadcrumb, CustomTable } from '@/components'
import useCategory from './category'
import { Button, Col, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CategoryTables = () => {
	const { loading, categoryList, getList, totalPages, updateStatus } = useCategory()
	const [searchTerm, setSearchTerm] = useState('')
	const [pageNumber, setPageNumber] = useState(1)
	const [status, setStatus] = useState('')
	const columns = ['S.No.', 'Name', 'Created At', 'Status', 'Action']
	const statusFilterValues = [
		{ value: '', label: 'All' },
		{ value: '1', label: 'Active' },
		{ value: '0', label: 'Inactive' },
	]
	const [dateRange, setDateRange] = useState('')
	const [customStartDate, setCustomStartDate] = useState<Date | null>(null)
	const [customEndDate, setCustomEndDate] = useState<Date | null>(null)
	const [isCustomRange, setIsCustomRange] = useState(false)

	const formatDate = (date: Date) => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handleApplyCustomRange = () => {
		if (customStartDate && customEndDate) {
			const formattedStartDate = formatDate(customStartDate)
			const formattedEndDate = formatDate(customEndDate)
			const customDateRange = `${formattedStartDate}-${formattedEndDate}`
			setIsCustomRange(true)
			getList({
				page: pageNumber,
				sortBy: 'asc',
				limit: 10,
				searchBy: encodeURIComponent(searchTerm),
				status,
				filterDateRange: customDateRange,
			})
		}
	}

	const handleClearCustomRange = () => {
		setCustomStartDate(null)
		setCustomEndDate(null)
		setDateRange('')
		setStatus('') 
		setSearchTerm('') 
		setIsCustomRange(false) 
		getList({ page: 1, sortBy: 'asc', limit: 10, searchBy: '',  status: '', filterDateRange: '' })
	}

	const onDateRangeChange = (selectedRange: string) => {
		setDateRange(selectedRange)
		setIsCustomRange(false)
		if (selectedRange !== 'custom') {
			getList({ page: pageNumber, sortBy: 'asc', limit: 10, searchBy: encodeURIComponent(searchTerm), status, filterDateRange: selectedRange })
		}
	}

	useEffect(() => {
		if (!isCustomRange && dateRange !== 'custom') {
			getList({ page: pageNumber, sortBy: 'asc', limit: 10, searchBy: encodeURIComponent(searchTerm), status, filterDateRange: dateRange })
		}
	}, [searchTerm, pageNumber, status, dateRange, isCustomRange])

	return (
		<>
			<PageBreadcrumb title="Business Type Tables" subName="Tables" />
			<CustomTable
				loading={loading}
				data={categoryList}
				addButtonName="Add Business Type"
				navigationUrl="/business-type"
				isImage="hide"
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
				filterBy="status"
				filterValue={statusFilterValues}
				status={status}
				isSlug={false}
				onPageChange={setPageNumber}
				updateStatus={updateStatus}
				changeStatus={setStatus}
				searchTerm={searchTerm}
				handleInputChange={(e) => setSearchTerm(e.target.value)}
				isAction={true}
				dateRangeFilterOptions={[
					{ value: '', label: 'All' },
					{ value: 'past_3_months', label: 'Past 3 Months' },
					{ value: 'past_6_months', label: 'Past 6 Months' },
					{ value: '2023', label: '2023' },
					{ value: '2022', label: '2022' },
					{ value: 'custom', label: 'Custom Date Range' },
				]}
				onDateRangeChange={onDateRangeChange}
				customStartDate={customStartDate}
				customEndDate={customEndDate}
				setCustomStartDate={setCustomStartDate}
				setCustomEndDate={setCustomEndDate}
			/>
			{dateRange === 'custom' && (
				<Row className="mt-3">
					<Col lg={6}>
						<DatePicker
							selected={customStartDate}
							onChange={(date) => setCustomStartDate(date)}
							placeholderText="Start Date"
							className="form-control"
						/>
					</Col>
					<Col lg={6}>
						<DatePicker
							selected={customEndDate}
							onChange={(date) => setCustomEndDate(date)}
							placeholderText="End Date"
							className="form-control"
						/>
					</Col>
					<Col lg={12} className="mt-3 text-end">
						<Button
							variant="primary"
							onClick={handleApplyCustomRange}
							disabled={!customStartDate || !customEndDate}
						>
							Apply Date Range
						</Button>
						<Button
							variant="secondary"
							onClick={handleClearCustomRange}
							className="ms-2"
						>
							Close Date Range
						</Button>
					</Col>
				</Row>
			)}
		</>
	)
}

export default CategoryTables
