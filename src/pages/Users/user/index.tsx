import { useEffect, useState } from 'react'
import { PageBreadcrumb, CustomTable } from '@/components'
import useUsers from './user'
import { Button, Col, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CategoryTables = () => {
	const { loading, usersList, getList, totalPages, updateStatus } = useUsers()
	const [searchTerm, setSearchTerm] = useState('')
	const [pageNumber, setPageNumber] = useState(1)
	const [status, setStatus] = useState('')
	const [dateRange, setDateRange] = useState('') // For predefined ranges
	const [customStartDate, setCustomStartDate] = useState<Date | null>(null) // Custom Start Date
	const [customEndDate, setCustomEndDate] = useState<Date | null>(null) // Custom End Date
	const [applyCustomDateRange, setApplyCustomDateRange] = useState(false)

	const columns = [
		'S.No.',
		'Name',
		'Mobile Number',
		'Email',
		'Created At',
		'Status',
		'Action',
	]
	const statusFilterValues = [
		{ value: '', label: 'All' },
		{ value: '1', label: 'Active' },
		{ value: '0', label: 'Inactive' },
	]

	useEffect(() => {
		// Check if we should apply the custom date range
		if (applyCustomDateRange && customStartDate && customEndDate) {
			// Format the custom date range
			const filterDateRange = `${customStartDate.toISOString().split('T')[0]}-${
				customEndDate.toISOString().split('T')[0]
			}`

			// Make the API call with the custom date range
			getList({
				page: pageNumber,
				sortBy: 'asc',
				limit: 10,
				searchBy: encodeURIComponent(searchTerm),
				status,
				type: 'user',
				filterDateRange,
			})

			// Reset the applyCustomDateRange flag to prevent duplicate API calls
			setApplyCustomDateRange(false)
		} else if (dateRange !== 'custom') {
			// If it's not a custom date range, make the API call based on the pre-defined date ranges
			getList({
				page: pageNumber,
				sortBy: 'asc',
				limit: 10,
				searchBy: encodeURIComponent(searchTerm),
				status,
				type: 'user',
				filterDateRange: dateRange,
			})
		}
	}, [
		searchTerm,
		pageNumber,
		status,
		dateRange,
		applyCustomDateRange,
		customStartDate,
		customEndDate,
	])

	// Handle input change for search
	const handleInputChange = (event: any) => {
		setSearchTerm(event.target.value)
	}

	const onPageChange = (event: any) => {
		setPageNumber(event)
	}

	const changeStatus = (event: any) => {
		setStatus(event)
	}

	const onDateRangeChange = (selectedRange: string) => {
		setDateRange(selectedRange)

		// Clear custom date if selecting a predefined range
		if (selectedRange !== 'custom') {
			setCustomStartDate(null)
			setCustomEndDate(null)
			setApplyCustomDateRange(false)
		}
	}

	const handleApplyCustomRange = () => {
		if (customStartDate && customEndDate) {
			// Format the dates to "YYYY-MM-DD" using local time
			const formattedStartDate = customStartDate.toLocaleDateString('en-CA') // "en-CA" ensures "YYYY-MM-DD" format
			const formattedEndDate = customEndDate.toLocaleDateString('en-CA') // Use the same formatting for end date

			// Set the custom date range in the correct format
			const customDateRange = `${formattedStartDate}-${formattedEndDate}`

			// Set the state to apply the custom date range
			setApplyCustomDateRange(true)

			// Make the API call with the formatted date range
			getList({
				page: pageNumber,
				sortBy: 'asc',
				limit: 10,
				searchBy: encodeURIComponent(searchTerm),
				status,
				type: 'user',
				filterDateRange: customDateRange, // Send the correctly formatted date range
			})
		}
	}

	const handleClearCustomRange = () => {
		setCustomStartDate(null)
		setCustomEndDate(null)
		setApplyCustomDateRange(false) // Reset the date range application
	}

	const dateRangeFilterOptions = [
		{ value: '', label: 'All' },
		{ value: 'past_3_months', label: 'Past 3 Months' },
		{ value: 'past_6_months', label: 'Past 6 Months' },
		{ value: '2023', label: '2023' },
		{ value: '2022', label: '2022' },
		{ value: 'custom', label: 'Custom Date Range' },
	]

	return (
		<>
			<PageBreadcrumb title="Users" subName="Tables" />
			<CustomTable
				loading={loading}
				data={usersList}
				addButtonName=""
				navigationUrl="/users"
				isImage="show"
				columns={columns}
				totalPages={totalPages}
				pageNumber={pageNumber}
				filterBy="status"
				filterValue={statusFilterValues}
				status={status}
				isSlug={false}
				onPageChange={onPageChange}
				updateStatus={updateStatus}
				changeStatus={changeStatus}
				searchTerm={searchTerm}
				handleInputChange={handleInputChange}
				isAction={true}
				dateRangeFilterOptions={dateRangeFilterOptions}
				onDateRangeChange={onDateRangeChange}
				// Pass the additional date props to CustomTable
				customStartDate={customStartDate}
				customEndDate={customEndDate}
				setCustomStartDate={setCustomStartDate}
				setCustomEndDate={setCustomEndDate}
			/>
			{/* Show date pickers and Apply button for custom date range */}
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
							disabled={!customStartDate || !customEndDate}>
							Apply Date Range
						</Button>
						<Button
							variant="secondary"
							onClick={handleClearCustomRange}
							className="ms-2">
							Clear Date Range
						</Button>
					</Col>
				</Row>
			)}
		</>
	)
}

export default CategoryTables