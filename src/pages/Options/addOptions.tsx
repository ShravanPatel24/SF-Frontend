import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap'

import { PageBreadcrumb } from '@/components';
import { optionApi } from '@/common';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface Variation {
    value: string;
    image: File | string;
    previewImage: string;
  }

  type VariationValues = Variation[];
  type ValidationErrors = string[];

const CustomFromAddOption = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    // const [variationValues, setVariationValues] = useState(['']);
    // const [variationValues, setVariationValues] = useState([{ value: '', image: '', previewImage: '' }]);
    // const [validationErrors, setValidationErrors] = useState([]);
    const [variationValues, setVariationValues] = useState<VariationValues>([{ value: '', image: '', previewImage: '' }]);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>([]);
    const [loading, setLoading] = useState(false);
    const [optionId, setOptionId] = useState('');
    // const [image, setImage] = useState('');
    // const [previewImage, setPreviewImage] = useState('');
    const baseUrl = process.env.VITE_API_URL;

    const { id } = useParams(); // Get id from URL parameter
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOption = async () => {
            if (id) {
                try {
                    const response = await optionApi.getVariationDetails(id);
                    if (response?.code === 200) {
                        const { name, variationValues, id } = response.data;
                        setOptionId(id);
                        setName(name);
    
                        // Process variation values to set images with base URL
                        const processedVariationValues = variationValues.map((value: any) => ({
                            ...value,
                            image: `${value.image}`, // Set image URL with base URL
                            previewImage: `${baseUrl}media/preview?filename=${value.image}` // Set image URL with base URL
                        }));
    
                        setVariationValues(processedVariationValues);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            }
        };
    
        fetchOption();
    }, [id]);

    const handleImageChange = (index: number, file: File) => {
        const newVariationValues = [...variationValues];
        newVariationValues[index].image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            newVariationValues[index].previewImage = e?.target?.result as string;
            setVariationValues(newVariationValues);
        };
        reader.readAsDataURL(file);
    };

    const handleChangeInput = (index: number, value: string) => {
        const newVariationValues = [...variationValues];
        const newValidationErrors = [...validationErrors];
        newVariationValues[index].value = value;
        newValidationErrors[index] = '';
        setVariationValues(newVariationValues);
        setValidationErrors(newValidationErrors);
    };

    const handleAddInput = () => {
        setVariationValues([...variationValues, { value: '', image: '', previewImage: '' }]);
        setValidationErrors([...validationErrors, '']);
    };

    const handleRemoveInput = (index: number) => {
        const newVariationValues = [...variationValues];
        const newValidationErrors = [...validationErrors];
        newVariationValues.splice(index, 1);
        newValidationErrors.splice(index, 1);
        setVariationValues(newVariationValues);
        setValidationErrors(newValidationErrors);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Prevent page refresh
            console.log('Form submitted:', variationValues, name);
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', name);
                variationValues.forEach((item, index) => {
                    formData.append(`variationValues[${index}][value]`, item.value);
                    if (item.image) {
                        formData.append(`variationValues[${index}][image]`, item.image);
                    }
                });
                const res: any = optionId ? await optionApi.updateVariation(formData, optionId) : await optionApi.addVariation(formData);
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/products/options');
                } else if (res?.code === 400 || res?.code === 401) {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false);
            }
        }
        setValidated(true);

        const errors: string[] = [];
        variationValues.forEach((item, index) => {
            if (!item.value.trim()) {
                errors[index] = 'Please fill the option value.';
            }
        });
        setValidationErrors(errors);
    };

    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Option Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom01"
                                    placeholder="Option name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the option name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Option Values</Form.Label>
                                {variationValues.map((item, index) => (
                                    <Row key={index}>
                                        <Col className="mb-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="Option value"
                                                value={item.value}
                                                onChange={(e) => handleChangeInput(index, e.target.value)}
                                                isInvalid={!!validationErrors[index]}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {validationErrors[index]}
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col className="mb-2">
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={(e: any) => handleImageChange(index, e?.target?.files[0])}
                                            />
                                        </Col>
                                        {item?.previewImage && (
                                            <Col xs="auto">
                                                <Zoom>
                                                    <Image
                                                        style={{ borderStyle: 'solid', borderColor: 'gray', width: '30px', height: '30px' }}
                                                        src={item?.previewImage}
                                                        alt="preview"
                                                        className="avatar-lg rounded"
                                                        fluid
                                                    />
                                                </Zoom>
                                            </Col>
                                        )}
                                        <Col xs="auto">
                                            {index === variationValues.length - 1 && (
                                                <Button variant="success me-1" onClick={handleAddInput}>+</Button>
                                            )}
                                            {index > 0 && (
                                                <Button variant="danger" onClick={() => handleRemoveInput(index)}>-</Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}
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

const AddOption = () => {
    const { id } = useParams();
    return (
        <>
            <PageBreadcrumb title={id ? 'Edit Option' : 'Add Option'} subName="Option" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddOption />
                </Col>
            </Row>
        </>
    )
}

export default AddOption
