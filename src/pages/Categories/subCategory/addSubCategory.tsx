import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '@/components';
import { subCategoryApi } from '@/common';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import useSubCategory from './subCategory';
import Select from 'react-select'

// styles
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

const CustomFromAddSubCategory = () => {
    const { getCategoryList, categoryList } = useSubCategory();
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubCategoryId] = useState('');
    // const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [metaTagDescription, setMetaTagDescription] = useState('');
    const [metaTagKeywords, setMetaTagKeywords] = useState('');
    const [loading, setLoading] = useState(false);

    // const [searchTerm, setSearchTerm] = useState('');
    // const [status, setStatus] = useState('');

    const { slug } = useParams(); // Get slug from URL parameter
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryList('', 1);
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            if (slug) {
                try {
                    const response = await subCategoryApi.getSubCategoryDetails(slug);
                    if (response?.code === 200) {
                        const { categoryId, id, name, title, description, metaTagDescription, metaTagKeywords } = response.data;
                        setCategoryId(categoryId?.id);
                        setSubCategoryId(id);
                        setName(name);
                        setTitle(title);
                        setDescription(description?.replace(/&lt;/g, '<').replace(/&lt;/g, '<'));
                        setMetaTagDescription(metaTagDescription);
                        setMetaTagKeywords(metaTagKeywords);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            }
        };

        fetchCategory();
    }, [slug]);


    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Prevent page refresh
            setLoading(true)
            try {
                console.log('Values saved', categoryId)
                if (!categoryId) {
                    toast.error('Please select a category');
                    return;
                }
                const requestData = {
                    categoryId, name, title, description, metaTagDescription, metaTagKeywords
                }
                console.log("🚀 ~ file: addSubCategory.tsx:77 ~ handleSubmit ~ requestData:", requestData)
                const res: any = slug ? await subCategoryApi.updateSubCategory(requestData, subcategoryId) : await subCategoryApi.addSubCategory(requestData);
                console.log('res', res?.code);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/categories/sub-category');
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
    }

    const handleChange = (html: any) => {
        setDescription(html);
    }

    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Select className="select2 z-3"
                                    options={categoryList}
                                    value={categoryList.find((category: any) => category.value === categoryId)}
                                    onChange={(selectedOption: any) => setCategoryId(selectedOption?.value)}
                                // required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Category Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sub Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom01"
                                    placeholder="Sub Category Name"
                                    name='categoryName'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Sub Category Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sub Category Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="validationCustom02"
                                    placeholder="Sub Category Title"
                                    name='categoryTitle'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Sub Category title.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Meta Tag Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    type="text"
                                    id="validationCustom02"
                                    placeholder="Meta Tag Description"
                                    name='metaTagDescription'
                                    value={metaTagDescription}
                                    onChange={(e) => setMetaTagDescription(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Meta Tag Description.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Meta Tag Keywords</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    type="text"
                                    id="validationCustom02"
                                    placeholder="Meta Tag Keywords"
                                    name='metaTagKeywords'
                                    value={metaTagKeywords}
                                    onChange={(e) => setMetaTagKeywords(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Please enter keywords separated by commas.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Meta Tag Keywords.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
					<Form.Label>Description</Form.Label>
                        <ReactQuill
                            modules={modules}
                            value={description}
							placeholder='Put Description here'
                            theme="snow"
                            style={{ height: 170 }}
                            className="pb-4 mb-2"
                            onChange={handleChange}
                        />
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

const AddSubCategory = () => {
    // Get ID from URL
    const { slug } = useParams();

    return (
        <>
            <PageBreadcrumb title={slug ? 'Edit Sub Category' : 'Add Sub Category'} subName="Sub Category" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddSubCategory />
                </Col>
            </Row>
        </>
    )
}

export default AddSubCategory
