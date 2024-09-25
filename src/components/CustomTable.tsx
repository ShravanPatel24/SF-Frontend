// import React from 'react';
import { Card, Row, Col, Badge, Dropdown, Table, Button } from 'react-bootstrap'
import Zoom from 'react-medium-image-zoom'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import 'react-medium-image-zoom/dist/styles.css'
import Select from 'react-select'

interface CustomTableProps {
	loading: boolean
	data: any[] // Use the appropriate type instead of 'any' if you know the structure of your data
	columns: any[] // Define the structure of a column if possible
	totalPages: number
	pageNumber: number
	onPageChange: (pageNumber: number) => void
	updateStatus: (id: string, status: string) => void
	searchTerm: string
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	navigationUrl: string
	addButtonName: string
	isImage: string
	filterBy: string
	filterValue: any[]
	status: string
	changeStatus: (status: string) => void
	isSlug: boolean
	isAction: boolean
	dateRangeFilterOptions: any[]
	onDateRangeChange: (dateRange: string) => void
	customStartDate: Date | null
	customEndDate: Date | null
	setCustomStartDate: (date: Date | null) => void
	setCustomEndDate: (date: Date | null) => void
}

const CustomTable: React.FC<CustomTableProps> = ({
	loading,
	data,
	columns,
	totalPages,
	pageNumber,
	onPageChange,
	updateStatus,
	searchTerm,
	handleInputChange,
	navigationUrl,
	addButtonName,
	isImage,
	filterBy,
	filterValue,
	status,
	changeStatus,
	isSlug,
	isAction = true,
	dateRangeFilterOptions,
	onDateRangeChange,
}) => {
	const baseUrl = process.env.VITE_API_URL

	const getStatusBadge = (status: any) => {
		if (status === 1) {
			return (
				<Badge bg={'success'} className="badge badge-success">
					Active
				</Badge>
			)
		} else if (status === 0) {
			return (
				<Badge bg={'pink'} className="badge badge-danger">
					Inactive
				</Badge>
			)
		}
	}

	const clearSearch = () => {
		handleInputChange({
			target: { value: '' },
		} as React.ChangeEvent<HTMLInputElement>)
	}

	const handlePageClick = (event: any) => {
		onPageChange(event.selected + 1)
	}

	const formatDateTime = (dateString: any) => {
		if (!dateString) return ''
		return new Date(dateString).toLocaleString()
	}

	return (
		<Row>
			<Card>
				<Card.Header>
					<Row className="align-items-center g-2">
						{' '}
						{/* align-items-center will vertically align items */}
						<Col lg={3}>
							{' '}
							{/* Adjust search bar width */}
							<div className="input-group">
								<input
									type="text"
									id="example-input1-group2"
									name="example-input1-group2"
									className="form-control"
									placeholder="Search..."
									value={searchTerm}
									onChange={handleInputChange}
								/>
								<span className="input-group-append">
									{searchTerm && (
										<Button variant="outline-secondary" onClick={clearSearch}>
											<i className="ri-close-line" />
										</Button>
									)}
								</span>
								<span className="input-group-append">
									<button
										type="button"
										className="btn btn-primary rounded-start-0">
										<i className="ri-search-line fs-16"></i>
									</button>
								</span>
							</div>
						</Col>
						{filterBy === 'status' && (
							<Col lg={2}>
								{' '}
								{/* Adjust Filter By Status width */}
								<div className="input-group">
									<Select
										className="select2 z-3"
										placeholder="Filter By Status"
										options={filterValue}
										value={filterValue.find(
											(status: any) => status.value === status
										)}
										onChange={(selectedOption: any) =>
											changeStatus(selectedOption?.value)
										}
									/>
								</div>
							</Col>
						)}
						{(navigationUrl === '/users' ||
							navigationUrl === '/users/partner' ||
							navigationUrl === '/business-type') && (
							<Col lg={3}>
								{' '}
								{/* Adjust Filter By Date Range width */}
								<div className="input-group">
									<Select
										className="select2 z-3"
										placeholder="Filter By Date Range"
										options={dateRangeFilterOptions}
										onChange={(selectedOption: any) =>
											onDateRangeChange(selectedOption?.value)
										}
									/>
								</div>
							</Col>
						)}
						{addButtonName !== '' && (
							<Col lg={3} className="text-end">
								{' '}
								{/* Align Add Button to the right */}
								<Link to={navigationUrl + '/add'} className="btn btn-primary">
									{addButtonName}
								</Link>
							</Col>
						)}
					</Row>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-bordered table-centered mb-0">
							<thead>
								<tr>
									{columns.map((column, index) => (
										<th key={index}>{column}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{data.length === 0 ? (
									<tr>
										<td colSpan={columns.length} className="text-center">
											{loading ? 'Loading ...' : 'Oops! No Records Found'}
										</td>
									</tr>
								) : (
									data.map((record, idx) => (
										<tr key={idx}>
											<td className="table-user">
												{(pageNumber - 1) * 10 + idx + 1}
											</td>
											{record?.categoryId && record?.categoryId?.name ? (
												<td className="table-user">
													{record?.categoryId?.name}
												</td>
											) : (
												''
											)}
											<td className="table-user">
												{isImage === 'show' ? (
													<Zoom>
														<img
															style={{
																borderStyle: 'solid',
																borderColor: 'gray',
															}}
															src={
																record?.images
																	? `${baseUrl}media/preview?filename=${record?.images[0]}`
																	: record?.image
																	? `${baseUrl}media/preview?filename=${record?.image}`
																	: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka'
															}
															alt="table-user"
															className="me-2 rounded-circle"
															// onError={(e) => { e.target?.src = '/src/assets/images/placeholder.jpg' }}
														/>
														&nbsp;{record?.name}
													</Zoom>
												) : (
													<>
														{record?.name
															? record?.name
															: record?.pageTitle
															? record?.pageTitle
															: record?.orderId
															? record?.orderId
															: record?.title
															? record?.title
															: record?.question}
													</>
												)}
											</td>
											{record?.phone && <td>{record?.phone}</td>}
											{record?.email && <td>{record?.email}</td>}
											{record?.for !== undefined && (
												<td>{record?.for === 0 ? 'User' : 'Partner'}</td>
											)}
											<td>{formatDateTime(record?.createdAt)}</td>
											{record?.message && <td>{record?.message}</td>}
											{navigationUrl === '/orders' && (
												<td>{formatDateTime(record?.createdAt)}</td>
											)}
											{record?.variationValues && (
												<td className="table-user">
													{record.variationValues.map(
														(item: any, index: any) => (
															<div key={index}>
																{item.image && item.image !== 'undefined' ? (
																	<Zoom>
																		<img
																			src={`${baseUrl}media/preview?filename=${item.image}`}
																			alt={item.value}
																			style={{
																				width: '20px',
																				height: '20px',
																				marginRight: '5px',
																			}}
																		/>
																		&nbsp;{item.value}
																	</Zoom>
																) : (
																	<>{item.value}</>
																)}
															</div>
														)
													)}
												</td>
											)}

											{filterBy && <td>{getStatusBadge(record?.status)}</td>}
											{isAction && (
												<td align="center">
													<Dropdown>
														<Dropdown.Toggle
															id="dropdown-basic"
															as={Button} // Use Button as the toggle so only the dropdown appears
															variant="link" // Optional: Remove button styling if you don't want the button to stand out
															className="p-0" // Remove padding for a cleaner look
														>
															<i className="bi bi-three-dots-vertical"></i>{' '}
															{/* Three dots icon will be part of the toggle */}
														</Dropdown.Toggle>
														<Dropdown.Menu>
															{navigationUrl === '/orders' && (
																<Dropdown.Item>
																	<Link
																		to={`${navigationUrl}/view/${record?.id}`}
																		className="text-reset fs-16 px-1">
																		<i className="ri-eye-line" /> View
																	</Link>
																</Dropdown.Item>
															)}
															{navigationUrl !== '/orders' && (
																<Dropdown.Item>
																	<Link
																		to={`${navigationUrl}/edit/${
																			isSlug ? record?.slug : record?.id
																		}`}
																		className="text-reset fs-16 px-1">
																		<i className="ri-pencil-line" /> Edit
																	</Link>
																</Dropdown.Item>
															)}
															<Dropdown.Item
																onClick={() => updateStatus(record, 'status')}>
																<a className="text-reset fs-16 px-1">
																	<i
																		className={
																			record?.status === 1
																				? 'ri-close-line'
																				: 'ri-check-line'
																		}
																	/>{' '}
																	{record?.status === 1
																		? 'Deactivate'
																		: 'Activate'}
																</a>
															</Dropdown.Item>
															{!record?.pageTitle && (
																<Dropdown.Item
																	onClick={() =>
																		updateStatus(record, 'delete')
																	}>
																	<a className="text-reset fs-16 px-1">
																		<i className="ri-delete-bin-2-line" />{' '}
																		Delete
																	</a>
																</Dropdown.Item>
															)}
														</Dropdown.Menu>
													</Dropdown>
												</td>
											)}
										</tr>
									))
								)}
							</tbody>
						</Table>
						<div className="d-lg-flex align-items-center text-center mt-2">
							{totalPages && (
								<ReactPaginate
									containerClassName={
										'pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0'
									}
									pageClassName={'page-item'}
									breakClassName={'page-item'}
									breakLinkClassName={'page-link'}
									pageLinkClassName={'page-link'}
									previousClassName={'page-item'}
									previousLinkClassName={'page-link'}
									nextClassName={'page-item'}
									nextLinkClassName={'page-link'}
									activeClassName={'active'}
									breakLabel="..."
									nextLabel=">"
									onPageChange={handlePageClick}
									pageRangeDisplayed={5}
									pageCount={totalPages}
									previousLabel="<"
									renderOnZeroPageCount={null}
								/>
							)}
						</div>
					</div>
				</Card.Body>
			</Card>
		</Row>
	)
}

export default CustomTable
