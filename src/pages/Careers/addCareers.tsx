import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '@/components';
import { CareersApi } from '@/common';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

import ReactQuill from 'react-quill';
// styles
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'


const CustomFromAddCareers = () => {
    const [validated, setValidated] = useState(false);
    const [description, setDescription] = useState('');
    const [pageId, setPageId] = useState('');
    const [title, setTitle] = useState('');
    // const [image, setImage] = useState('');
    // const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    // const baseUrl = process.env.VITE_API_URL;

    const { id } = useParams(); // Get id from URL parameter
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const response = await CareersApi.getCareersDetails(id);
                    if (response?.code === 200) {
                        setPageId(response.data.id);
                        setTitle(response.data.title);
                        setDescription(response.data.description?.replace(/&lt;/g, '<').replace(/&lt;/g, '<'));
                        // setPreviewImage(`${baseUrl}media/preview?filename=${response.data.image}`);
                        // setImage(response.data.image);
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
                const requestData = {
                    description,
                    title
                    // image
                }
                const res: any = id ? await CareersApi.updateCareers(requestData, pageId) : await CareersApi.addCareers(requestData);
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/careers');
                } else if (res?.code === 400 || res?.code === 401) {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false)
            }
        }
        setValidated(true);
    };

    const modules = {
        toolbar: [
            [{ font: [] }, { size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'super' }, { script: 'sub' }],
            [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['direction', { align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };


    const handleChange = (html: any) => {
        setDescription(html);
    }

    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom01"
                                    placeholder="Title"
                                    name='pageName'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Title.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                            <Form.Label>Description</Form.Label>
                            <ReactQuill
                                modules={modules}
                                value={description}
                                theme="snow"
                                style={{ height: 400 }}
                                className="pb-4 mb-2"
                                onChange={handleChange}
                            />
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
            </Card.Body>
        </Card>
    );
};

const AddCareers = () => {
    // Get ID from URL
    const { id } = useParams();

    return (
        <>
            <PageBreadcrumb title={id ? 'Edit Careers' : 'Add Careers'} subName="Careers" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddCareers />
                </Col>
            </Row>
        </>
    )
}

export default AddCareers
