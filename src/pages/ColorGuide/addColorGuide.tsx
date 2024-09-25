import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap'
import { PageBreadcrumb } from '@/components';
import { colorGuideApi } from '@/common';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


const CustomFromAddColorGuide = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.VITE_API_URL;

    const { id } = useParams(); // Get id from URL parameter
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const response = await colorGuideApi.getColorGuideDetails(id);
                    if (response?.code === 200) {
                        setClientId(response.data.id);
                        setName(response.data.name);
                        setPreviewImage(`${baseUrl}media/preview?filename=${response.data.image}`);
                        setImage(response.data.image);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            }
        };

        fetchCategory();
    }, [id]);


    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setLoading(true)
            try {
                console.log('Values saved', name, image)
                const formData = new FormData()
                formData.append('name', name)
                formData.append('image', image)
                console.log('Values saved', clientId)
                const res: any = id ? await colorGuideApi.updateColorGuide(formData, clientId) : await colorGuideApi.addColorGuide(formData);
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/color-guide');
                } else if (res?.code === 400 || res?.code === 401) {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false)
            }
        }
        setValidated(true);
    };

    const handleImage = async (event: any) => {
        const file = event.target.files[0];
        setImage(file);
            // Check if file is selected
            if (file) {
                // Create a new FileReader instance
                const reader = new FileReader();

                // Define a callback function to handle FileReader's load event
                reader.onload = (e: any) => {
                    // Set the previewImage state to the result of FileReader's readAsDataURL method
                    setPreviewImage(e?.target?.result);
                };

                // Read the file as a data URL
                reader.readAsDataURL(file);
            }
    }

    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={previewImage ? 5 : 6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Color Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom01"
                                    placeholder="Color Name"
                                    name='colorName'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Color Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={previewImage ? 5 : 6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Color Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept='image/*'
                                    id="validationCustom01"
                                    placeholder="Color Image"
                                    onChange={handleImage}
                                    required={!previewImage} // Set required attribute based on previewImage
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select the color image.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {previewImage && (
                            <Col lg={2}>
                                <Zoom>
                                    <Image style={{borderStyle: 'solid', borderColor: 'gray'}}
                                        src={previewImage}
                                        alt="avatar"
                                        className="avatar-lg rounded"
                                        fluid
                                    />
                                </Zoom>
                            </Col>
                        )}
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
            </Card.Body>
        </Card>
    );
};

const AddColorGuide = () => {
    // Get ID from URL
    const { id } = useParams();

    return (
        <>
            <PageBreadcrumb title={id ? 'Edit Color Guide' : 'Add Color Guide'} subName="Color Guide" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddColorGuide />
                </Col>
            </Row>
        </>
    )
}

export default AddColorGuide
