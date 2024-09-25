import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap'
import { PageBreadcrumb } from '@/components'
import { UserService } from '@/common'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '@/components/Spinner'
import { toast } from 'react-toastify'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
// import { useLocation, useNavigate } from 'react-router-dom'

// styles
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

const CustomFromAddUser = () => {
	const [validated, setValidated] = useState(false)
	const [name, setName] = useState('')
	const [categoryId, setCategoryId] = useState('')
	const [image, setImage] = useState('')
	const [previewImage, setPreviewImage] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const baseUrl = process.env.VITE_API_URL

	const { slug } = useParams() // Get slug from URL parameter
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCategory = async () => {
			if (slug) {
				try {
					const response = await UserService.getUserDetails(slug)
					if (response?.code === 200) {
						setCategoryId(response.data.id)
						setName(response.data.name)
						setEmail(response.data.email)
						setPhoneNumber(response.data.phone)
						setImage(response.data.image)
						setPreviewImage(
							response.data.image
								? `${baseUrl}media/preview?filename=${response.data.image}`
								: ''
						)
					}
				} catch (error) {
					console.error('Error fetching category:', error)
				}
			}
		}

		fetchCategory()
	}, [slug]) // Run effect only when slug changes

	const handleSubmit = async (event: any) => {
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.preventDefault()
			event.stopPropagation()
		} else {
			event.preventDefault() // Prevent page refresh
			setLoading(true)
			try {
				console.log('Values saved', name, image, phoneNumber, email)
				const formData = new FormData()
				formData.append('name', name)
				formData.append('image', image)
				formData.append('phone', phoneNumber)
				formData.append('email', email)
				console.log('Values saved', categoryId)
				const res: any = slug
					? await UserService.updateUser(formData, categoryId)
					: await UserService.addUser(formData)
				console.log('res', res?.code)
				if (res?.code === 200) {
					setLoading(false)
					toast.success(res?.message)
					navigate('/users/list')
				} else if (res?.code === 400 || res?.code === 401) {
					toast.error(res?.message)
				}
			} finally {
				setLoading(false)
			}
		}
		setValidated(true)
	}

	const handleImage = async (event: any) => {
		const file = event.target.files[0]
		console.log('🚀 ~ file: addUser.tsx:45 ~ handleImage ~ file:', file)
		setImage(file)
		// Check if file is selected
		if (file) {
			// Create a new FileReader instance
			const reader = new FileReader()

			// Define a callback function to handle FileReader's load event
			reader.onload = (e: any) => {
				// Set the previewImage state to the result of FileReader's readAsDataURL method
				setPreviewImage(e?.target?.result)
			}

			// Read the file as a data URL
			reader.readAsDataURL(file)
		}
	}

	const handleCancel = () => {
		navigate('/users/list')
	}

	return (
		<Card>
			<Card.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row>
						<Col lg={4}>
							<Form.Group className="mb-3">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									id="validationCustom01"
									placeholder="Name"
									name="categoryName"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required={!slug}
								/>
								<Form.Control.Feedback type="invalid">
									Please fill the Name.
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col lg={4}>
							<Form.Group className="mb-3">
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="file"
									accept="image/*"
									id="validationCustom01"
									placeholder="Image"
									onChange={handleImage}
									required={!slug && !previewImage}
								/>
								<Form.Control.Feedback type="invalid">
									Please select the image.
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						{previewImage && (
							<Col lg={4}>
								<Zoom>
									<Image
										style={{ borderStyle: 'solid', borderColor: 'gray' }}
										src={previewImage}
										alt="avatar"
										className="avatar-lg rounded"
										fluid
										// onError={(e) => { e.target?.src = '/src/assets/images/placeholder.jpg' }}
									/>
								</Zoom>
							</Col>
						)}
						<Col lg={4}>
							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									id="validationCustom02"
									placeholder="Email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required={!slug}
								/>
								<Form.Control.Feedback type="invalid">
									Please fill the email.
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col lg={4}>
							<Form.Group className="mb-3">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control
									type="text"
									id="validationCustom02"
									placeholder="Phone Number"
									name="phone"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									required={!slug}
								/>
								<Form.Control.Feedback type="invalid">
									Please fill the phone number.
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>
					{loading ? (
						<Button variant="primary" disabled>
							<Spinner className="spinner-border-sm" tag="span" color="white" />{' '}
							Loading...
						</Button>
					) : (
						<>
							<Button variant="primary" type="submit" disabled={loading}>
								Submit
							</Button>
							<Button
								variant="secondary"
								className="ms-2"
								type="button"
								onClick={handleCancel}
								disabled={loading}>
								Cancel
							</Button>
						</>
					)}
				</Form>
			</Card.Body>
		</Card>
	)
}

const AddUser = () => {
	// Get ID from URL
	const { slug } = useParams()
    const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1) // This will navigate the user to the previous page
	}

	return (
		<>
			<PageBreadcrumb title={slug ? 'Edit User' : 'Add User'} subName="User" />
            <Row>
				<Col lg={12}>
					<div className="mb-3">
						<Button variant="secondary" onClick={handleBack}>
							<i className="ri-arrow-left-line"></i> Back
						</Button>
					</div>
					<CustomFromAddUser />
				</Col>
			</Row>
		</>
	)
}

export default AddUser