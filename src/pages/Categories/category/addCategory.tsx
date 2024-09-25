import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '@/components';
import { categoryApi } from '@/common';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
// import { useLocation, useNavigate } from 'react-router-dom'


const CustomFromAddBusinessType = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(false);

    const { slug } = useParams(); // Get slug from URL parameter
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            if (slug) {
                try {
                    const response = await categoryApi.getCategoryDetails(slug);
                    if (response?.code === 200) {
                        setCategoryId(response.data.id);
                        setName(response.data.name);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            }
        };

        fetchCategory();
    }, [slug]); // Run effect only when slug changes


    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Prevent page refresh
            setLoading(true)
            try {

                const res: any = slug ? await categoryApi.updateCategory({ name: name }, categoryId) : await categoryApi.addCategory({ name: name });
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/business-type/list');
                } else if (res?.code === 400 || res?.code === 401) {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false)
            }
        }
        setValidated(true);
    };


    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom01"
                                    placeholder="Business Type Name"
                                    name='businessTypeName'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Business Type Name.
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
            </Card.Body>
        </Card>
    );
};

const AddBusinessType = () => {
    // Get ID from URL
    const { slug } = useParams();

    return (
        <>
            <PageBreadcrumb title={slug ? 'Edit Business Type' : 'Add Business Type'} subName="Business Type" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddBusinessType />
                </Col>
            </Row>
        </>
    )
}

export default AddBusinessType
