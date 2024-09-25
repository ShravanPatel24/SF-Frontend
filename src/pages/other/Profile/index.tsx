import { Button, Card, Col, Image, Nav, Row, Tab, Form, InputGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

// images
import bgProfile from '@/assets/images/bg-profile.jpg'
// import avatar1 from '@/assets/images/placeholder.jpg'
const avatar1 = "https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka"

// components
import { useAuthContext, authApi } from '@/common';

import { useNavigate } from "react-router-dom";

const ProfilePages = () => {
	const { user, removeSession, saveSession } = useAuthContext();
	const [validated, setValidated] = useState(false);
	const [validatedPassword, setValidatedPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');


	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [newPasswordError, setNewPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(''); // New state for confirm password error
	const [showPassword, setShowPassword] = useState(false);

	// const { id } = useParams(); // Get id from URL parameter
	const navigate = useNavigate();

	const nameRegex = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;

	const handleNameChange = (e: any) => {
		const value = e.target.value.trim();
		setName(value);
	
		if (!value) {
			setNameError('Name cannot be empty or contain only spaces.');
		} else if (!nameRegex.test(value)) {
			setNameError('Please enter a valid name.');
		} else {
			setNameError('');
		}
	};
	
	const handleEmailChange = (e: any) => {
		const value = e.target.value;
		setEmail(value);

		if (!emailRegex.test(value)) {
			setEmailError('Please enter a valid email.');
		} else {
			setEmailError('');
		}
	};

	const onSubmitProfile = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();

		const form = event.currentTarget;
		const trimmedName = name.trim();
		if (form.checkValidity() === false || nameError || emailError) {
			setValidated(true);
		} else {
			setLoading(true);
			// Perform form submission logic here
			try {
                const requestData = {
                    name:trimmedName,
                    email
                }
                const res: any = await authApi.updateProfile(requestData, user?.id);
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
					let updatedUser = user
					updatedUser.name = trimmedName
					updatedUser.email = email
					removeSession();
					saveSession(updatedUser);
					window.location.reload();
                } else if (res?.code === 400 || res?.code === 401) {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false)
            }
		}
	};

	const handlePasswordChange = (e: any) => {
		const value = e.target.value;
		setCurrentPassword(value);

		if (!passwordRegex.test(value)) {
			setPasswordError('Password must contain at least 8 characters, One uppercase letter (A-Z), One lowercase letter (a-z), One number (0-9), One special character (e.g., !, @, #, $)');
		} else {
			setPasswordError('');
		}
	};

	const handleNewPasswordChange = (e: any) => {
		const value = e.target.value;
		setNewPassword(value);

		if (!passwordRegex.test(value)) {
			setNewPasswordError('Password must contain at least 8 characters, One uppercase letter (A-Z), One lowercase letter (a-z), One number (0-9), One special character (e.g., !, @, #, $)');
		} else {
			setNewPasswordError('');
		}
	};

	const handleConfirmPasswordChange = (e: any) => {
		const value = e.target.value;
		setConfirmPassword(value);

		if (!passwordRegex.test(value)) {
			setNewPasswordError('Password must contain at least 8 characters, One uppercase letter (A-Z), One lowercase letter (a-z), One number (0-9), One special character (e.g., !, @, #, $)');
		} else {
			setNewPasswordError('');
		}
	}

	const validatePasswordMatch = () => {
		if (newPassword !== confirmPassword) {
		  setConfirmPasswordError('Passwords do not match!');
		  return false;
		} else {
		  setConfirmPasswordError('');
		  return true;
		}
	  };

	  const onSubmitPassword = async (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	
		const form = event.currentTarget;
	
		// Correct condition: Proceed if the form is valid, passwords match, and there are no errors
		if (form.checkValidity() === true && validatePasswordMatch() && !passwordError && !newPasswordError) {
			setLoading(true);
			try {
				const requestData = {
					currentPassword: currentPassword,
					password: newPassword
				};
	
				// Call API to update the profile
				const res: any = await authApi.changePassword(requestData);
	
				// Check if the response is successful
				if (res?.code === 200) {
					toast.success(res?.message);
					removeSession();
					localStorage.removeItem('_VELONIC_AUTH');
					window.location.reload();
					navigate('/auth/logout');
				} else if (res?.code === 400 || res?.code === 401) {
					toast.error(res?.message);
				}
			} catch (error) {
				console.error('Error during password update', error);
			} finally {
				setLoading(false);
			}
		} else {
			setValidatedPassword(true); // Show validation errors if form is invalid or passwords don't match
		}
	};
	

	const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

	return (
		<>
			<div>
				<Row>
					<Col sm={12}>
						<div
							className="profile-bg-picture"
							style={{ backgroundImage: `url(${bgProfile})` }}
						>
							<span className="picture-bg-overlay" />
						</div>
						<div className="profile-user-box">
							<Row>
								<Col sm={6}>
									<div className="profile-user-img">
										<Image
											src={avatar1}
											className="avatar-lg rounded-circle"
											alt="user"
										/>
									</div>
									<div>
										<h4 className="mt-4 fs-17 ellipsis">{user?.name}</h4>
										<p className="font-13"> {user?.email}</p>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<Card className="p-0">
							<Card.Body className="p-0">
								<div className="profile-content">
									<Tab.Container defaultActiveKey="Settings">
										<Nav as="ul" justify className="nav-underline gap-0">
											<Nav.Item>
												<Nav.Link
													as={Link}
													type="button"
													to="#"
													eventKey="Settings"
												>
													Profile
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													as={Link}
													type="button"
													to="#"
													eventKey="ChangePassword"
												>
													Change Password
												</Nav.Link>
											</Nav.Item>
										</Nav>
										<Tab.Content className="m-0 p-4">
											<Tab.Pane eventKey="Settings" id="edit-profile">
												<div className="user-profile-content">
													<Form noValidate validated={validated} onSubmit={onSubmitProfile}>
														<Row>
															<Col lg={6}>
																<Form.Group className="mb-3">
																	<Form.Label>Full Name</Form.Label>
																	<Form.Control
																		name="fullName"
																		placeholder='Full Name'
																		type="text"
																		id="validationCustom01"
																		value={name}
																		onChange={handleNameChange}
																		required
																		isInvalid={!!nameError}
																	/>

																	<Form.Control.Feedback type="invalid">
																		{nameError || 'Please fill the full name.'}
																	</Form.Control.Feedback>
																</Form.Group>
															</Col>
															<Col lg={6}>
																<Form.Group className="mb-3">
																	<Form.Label>Email</Form.Label>
																	<Form.Control
																		name="email"
																		placeholder='Email'
																		type="text"
																		value={email}
																		onChange={handleEmailChange}
																		required
																		isInvalid={!!emailError}
																	/>

																	<Form.Control.Feedback type="invalid">
																		{emailError || 'Please fill the email.'}
																	</Form.Control.Feedback>
																</Form.Group>
															</Col>
														</Row>
														{loading ? <Button variant="primary" disabled>
															<Spinner
																className="spinner-border-sm"
																tag="span"
																color="white"
															/>{' '}
															Loading...
														</Button>
															: <Button variant="primary" type="submit" disabled={loading}>
																Submit
															</Button>}
													</Form>
												</div>
											</Tab.Pane>

											<Tab.Pane eventKey="ChangePassword" id="change-password">
												<div className="user-profile-content">
													<Form noValidate validated={validatedPassword} onSubmit={onSubmitPassword}>
														<Row className="row-cols-sm-2 row-cols-1">
															<Col lg={6}>
																<Form.Group className="mb-3">
																	<Form.Label>Current Password</Form.Label>
																	<InputGroup>
																	<Form.Control
																		name="Password"
																		type={showPassword ? "text" : "password"}
																		placeholder="Enter Current Password"
																		value={currentPassword}
																		onChange={handlePasswordChange}
																		required
																		isInvalid={!!passwordError}
																	/>
																	<InputGroup.Text onClick={togglePasswordVisibility}>
																		<a className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
																	</InputGroup.Text>
																	<Form.Control.Feedback type="invalid">
																		{passwordError || 'current password is required.'}
																	</Form.Control.Feedback>
																	</InputGroup>
																</Form.Group>
															</Col>
															<Col lg={6}>
																<Form.Group className="mb-3">
																	<Form.Label>New Password</Form.Label>
																	<InputGroup>
																	<Form.Control
																		name="Password2"
																		// type="password"
																		type={showPassword ? "text" : "password"}
																		placeholder="Enter New Password"
																		value={newPassword}
																		onChange={handleNewPasswordChange}
																		required
																		isInvalid={!!newPasswordError}
																	/>
																	<InputGroup.Text onClick={togglePasswordVisibility}>
																		<a className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
																	</InputGroup.Text>
																	<Form.Control.Feedback type="invalid">
																		{newPasswordError || 'new password is required.'}
																	</Form.Control.Feedback>
																	</InputGroup>
																</Form.Group>
															</Col>
															<Col lg={6}>
																<Form.Group className="mb-3">
																<Form.Label>Confirm New Password</Form.Label> {/* Confirm Password Field */}
																<InputGroup>
																<Form.Control
																	name="confirmPassword"
																		// type="password"
																	type={showPassword ? "text" : "password"}
																	placeholder="Enter confirm new password"
																	value={confirmPassword}
																	onChange={handleConfirmPasswordChange}
																	required
																	isInvalid={!!confirmPasswordError}
																/>
																<InputGroup.Text onClick={togglePasswordVisibility}>
																		<a className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
																	</InputGroup.Text>
																<Form.Control.Feedback type="invalid">
																	{confirmPasswordError || 'Confirm new password is required.'}
																</Form.Control.Feedback>
																</InputGroup>
																</Form.Group>
															</Col>
														</Row>
														{loading ? (
															<Button variant="primary" disabled>
															<Spinner
																className="spinner-border-sm"
																tag="span"
																color="white"
															/>{' '}
															Loading...
														</Button>
														) : (
															<Button variant="primary" type="submit">
																Submit
															</Button>
														)}
													</Form>
												</div>
											</Tab.Pane>

										</Tab.Content>
									</Tab.Container>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default ProfilePages