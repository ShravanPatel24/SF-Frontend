import { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row, Image } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';
import { productApi, optionApi } from '@/common';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import useProduct from './product';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

interface VariationValue {
    value: string;
    label: string;
  }
  
  interface VariationState {
    [variationId: string]: VariationValue[];
  }
  
  interface VariationError {
    [index: number]: string | null;
  }
  
  interface VariationErrors {
    [variationId: string]: VariationError;
  }

  interface Option {
    value: string;
    label: string;
}


const CustomFromAddProduct = () => {
    const { getCategoryList, categoryList, getSubCategoryList, subCategoryList, getProductVariation, optionsList } = useProduct();
    const updateOptionsList: Option[] = optionsList;
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [productId, setProductId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [image, setImage] = useState('');
    const [isVariant, setIsVariant] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [description, setDescription] = useState('');
    const [model, setModel] = useState('');
    const [sku, setSku] = useState('');
    const [metaTagDescription, setMetaTagDescription] = useState('');
    const [metaTagKeywords, setMetaTagKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.VITE_API_URL;

    // const [searchTermForSubCategory, setSearchTermForSubCategory] = useState('');
    // const [searchTermForCategory, setSearchTerm] = useState('');
    // const [status, setStatus] = useState('');
    const [selectedVariations, setSelectedVariations] = useState([]);
    // const [variationValues, setVariationValues] = useState({});
    // const [variationOptions, setVariationOptions] = useState({});
    const [variationErrors, setVariationErrors] = useState({});


    const [variationValues, setVariationValues] = useState<VariationState>({});
    const [variationOptions, setVariationOptions] = useState<VariationState>({});
    // const [variationErrors, setVariationErrors] = useState<VariationErrors>({});

    const { slug } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        getCategoryList('', 1);
    }, []);

    useEffect(() => {
        if (slug) {
            const fetchCategory = async () => {
                try {
                    const response = await productApi.getProductDetails(slug);
                    if (response?.code === 200) {
                        const responseData = response.data;
                        setProductId(responseData.id);
                        setCategoryId(responseData.categoryId?.id);
                        getSubCategoryList('', 1, responseData.categoryId?.id);
                        setSubCategoryId(responseData.subCategoryId?.id);
                        setName(responseData.name);
                        setModel(responseData.model);
                        setSku(responseData.sku);
                        setDescription(responseData.description?.replace(/&lt;/g, '<').replace(/&lt;/g, '<'));
                        setMetaTagDescription(responseData.metaTagDescription);
                        setMetaTagKeywords(responseData.metaTagKeywords);
                        setImage(responseData.images[0]); // Assuming images is an array and you want to set the first image
                        setPreviewImage(`${baseUrl}media/preview?filename=${responseData.images[0]}`); // Assuming images is an array and you want to set the first image
                        setIsVariant(responseData.isVariant);
                        // Bind product variant values
                        if (responseData.isVariant && responseData.productVariant) {
                            getProductVariation('', 1);
                            // Map through each product variant and extract variationId and variationValues
                            const productVariants = responseData.productVariant.map((variant: any) => ({
                                variationId: variant.variationId?.id,
                                variationValues: variant.variationValues.map((value: any) => ({ value: value.value, label: value.value }))
                            }));
                            // Fetch and set variation options for each variant
                            for (const variant of productVariants) {
                                await fetchVariationValues(variant.variationId);
                            }
                            // Set selectedVariations and variationValues state variables
                            setSelectedVariations(productVariants.map((variant: any) => variant.variationId));
                            setVariationValues(productVariants.reduce((acc: any, variant: any) => {
                                acc[variant.variationId] = variant.variationValues;
                                return acc;
                            }, {}));
                        }
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                }
            };
            fetchCategory();
        }
    }, [slug]);
    
    

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        console.log("🚀 ~ file: addProduct.tsx:90 ~ handleSubmit ~ form:", form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('image', image);
                formData.append('description', description);
                formData.append('model', model);
                formData.append('sku', sku);
                formData.append('categoryId', categoryId);
                if(subCategoryId){
                    formData.append('subCategoryId', subCategoryId ? subCategoryId : '');
                }
                formData.append('isVariant', JSON.stringify(isVariant));
                formData.append('metaTagKeywords', metaTagKeywords);
                formData.append('metaTagDescription', metaTagDescription);

                // if (isVariant && selectedVariations.length > 0) {
                //     formData.append('selectedVariations', JSON.stringify(selectedVariations));
                //     formData.append('variationValues', JSON.stringify(variationValues));
                // }
                // Inside your handleSubmit function
                    if (isVariant && selectedVariations.length > 0) {
                        // Create an array to hold product variants
                        const productVariants: {
                            variationId: any; // Assuming `variation` contains the ObjectId
                            variationValues: VariationValue[]; // Assuming variationValues is an array corresponding to selectedVariations
                        }[] = [];
                        // Iterate over each selected variation
                        selectedVariations.forEach((variation, index) => {
                            console.log("🚀 ~ file: addProduct.tsx:184 ~ selectedVariations.forEach ~ variation:", variation, variationValues[variation])
                            // Create an object to represent a product variant
                            const productVariant = {
                                variationId: variation, // Assuming `variation` contains the ObjectId
                                variationValues: variationValues[variation] // Assuming variationValues is an array corresponding to selectedVariations
                            };
                            productVariants.push(productVariant);
                        });
                            console.log("🚀 ~ file: addProduct.tsx:192 ~ selectedVariations.forEach ~ selectedVariations:", selectedVariations)
                            console.log("🚀 ~ file: addProduct.tsx:192 ~ selectedVariations.forEach ~ productVariants:", productVariants)
                        // Add the productVariants array to the formData
                        formData.append('productVariant', JSON.stringify(productVariants));
                    }

                    console.log("🚀 ~ file: addProduct.tsx:113 ~ handleSubmit ~ variationValues:", variationValues)
                    // return;
                const res = slug ? await productApi.updateProduct(formData, productId) : await productApi.addProduct(formData);
                if (res?.code === 200) {
                    setLoading(false);
                    toast.success(res?.message);
                    navigate('/products/list');
                } else {
                    toast.error(res?.message);
                }
            } finally {
                setLoading(false);
            }
        }
        setValidated(true);
    };

    const handleImage = (event: any) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setPreviewImage(e?.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (html: any) => {
        setDescription(html);
    };

    const handleChangeCategory = (item: any) => {
        setCategoryId(item?.value);
        getSubCategoryList('', 1, item?.value);
    };

    const handleChangeVariant = (checked: any) => {
        setIsVariant(checked);
        if (checked) {
            getProductVariation('', 1);
        } else {
            setSelectedVariations([]);
            setVariationValues({});
        }
    };

    const handleSelectVariation = (selectedOptions: any) => {
        const selectedValues = selectedOptions.map((option: any) => option.value);
        setSelectedVariations(selectedValues);
        setVariationValues({});
        selectedValues.forEach((variationId: any) => fetchVariationValues(variationId));
    };
    
    const fetchVariationValues = async (variationId: any) => {
        const response = await optionApi.getVariationDetails(variationId);
        if (response?.code === 200) {
            const options = response?.data?.variationValues?.map((option: any) => ({
                label: option.value,
                value: option.value,
                image: option?.image
            }));
            setVariationOptions(prevOptions => ({
                ...prevOptions,
                [variationId]: options
            }));
        }
    };


    // const addVariationField = (variationId: string) => {
    //     setVariationValues((prevValues: any) => ({
    //         ...prevValues,
    //         [variationId]: [...(prevValues[variationId] || []), { value: '', label: '' }]
    //     }));
    //     setVariationErrors((prevErrors: any) => ({
    //         ...prevErrors,
    //         [variationId]: { ...(prevErrors[variationId] || {}), [(variationValues[variationId]?.length || 0)]: null }
    //     }));
    // };
    
    
    // const removeVariationField = (variationId: any, index: any) => {
    //     setVariationValues((prevValues: any) => {
    //         const updatedValues = { ...prevValues };
    //         updatedValues[variationId].splice(index, 1);
    //         return updatedValues;
    //     });
    // };
    

    // const handleVariationValueChange = (variationId: string, index: number, selectedOption: VariationValue | null) => {
    //     console.log("🚀 ~ file: addProduct.tsx:286 ~ handleVariationValueChange ~ selectedOption:", selectedOption)
    //     setVariationValues((prevValues: any) => {
    //         const updatedValues = { ...prevValues };
    //         const isDuplicate = Object.keys(prevValues).some((vId: any) => 
    //             prevValues[vId].some((v: any, i: any) => v.value === selectedOption?.value && (vId !== variationId || i !== index))
    //         );
    
    //         if (isDuplicate) {
    //             setVariationErrors((prevErrors: any) => ({
    //                 ...prevErrors,
    //                 [variationId]: {
    //                     ...prevErrors[variationId],
    //                     [index]: `Value "${selectedOption?.value}" is already selected in another variation.`
    //                 }
    //             }));
    //         } else {
    //             updatedValues[variationId][index] = selectedOption;
    //             console.log("🚀 ~ file: addProduct.tsx:304 ~ setVariationValues ~ updatedValues:", updatedValues)
    //             setVariationErrors((prevErrors: any) => ({
    //                 ...prevErrors,
    //                 [variationId]: {
    //                     ...prevErrors[variationId],
    //                     [index]: null
    //                 }
    //             }));
    //         }
    
    //         return updatedValues;
    //     });
    // };

    const handleVariationValueChange = (variationId: string, selectedOptions: any[]) => {
        console.log("🚀 ~ file: addProduct.tsx:286 ~ handleVariationValueChange ~ selectedOptions:", selectedOptions);
    
        setVariationValues((prevValues: any) => {
            const updatedValues = { ...prevValues };
            const selectedValues = selectedOptions.map(option => option.value);
    
            // Check for duplicates
            const isDuplicate = Object.keys(prevValues).some((vId: any) =>
                prevValues[vId].some((v: any) =>
                    selectedValues.includes(v.value) && vId !== variationId
                )
            );
    
            if (isDuplicate) {
                setVariationErrors((prevErrors: any) => ({
                    ...prevErrors,
                    [variationId]: {
                        ...prevErrors[variationId],
                        'message': `One or more selected values are already selected in another variation.`
                    }
                }));
            } else {
                updatedValues[variationId] = selectedOptions;
                // console.log("🚀 ~ file: addProduct.tsx:342 ~ setVariationValues ~ updatedValues:", updatedValues)
                setVariationErrors((prevErrors: any) => ({
                    ...prevErrors,
                    [variationId]: {
                        ...prevErrors[variationId],
                        'message': null
                    }
                }));
            }
    
            return updatedValues;
        });
    };
    

    const filterOptions = (option: any) => {
        // console.log("🚀 ~ file: addProduct.tsx:314 ~ filterOptions ~ option:", option)
        // Add your filtering logic here
        return selectedVariations.includes(option?.value);
    };

    return (
        <Card>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Name"
                                    name="productName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the product Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Select
                                    className="select2 z-3"
                                    options={categoryList}
                                    value={categoryList.find((category: any) => category.value === categoryId)}
                                    onChange={(selectedOption) => handleChangeCategory(selectedOption)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Category Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Sub Category</Form.Label>
                                <Select
                                    className="select2 z-3"
                                    options={subCategoryList}
                                    value={subCategoryList.find((subCategory: any) => subCategory.value === subCategoryId)}
                                    onChange={(selectedSubOption: any) => setSubCategoryId(selectedSubOption?.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Category Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={previewImage ? 3 : 4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    placeholder="product Image"
                                    onChange={handleImage}
                                    required={!previewImage}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select the product image.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {previewImage && (
                            <Col lg={1}>
                                <Zoom>
                                    <Image
                                        style={{ borderStyle: 'solid', borderColor: 'gray', width: '50px', height: '50px', margin: '15px 0 0 0' }}
                                        src={previewImage}
                                        alt="avatar"
                                        className="avatar-lg rounded"
                                        fluid
                                    />
                                </Zoom>
                            </Col>
                        )}
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Model"
                                    name="model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product SKU</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product SKU"
                                    name="sku"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Form.Group className="mb-3 d-flex align-items-center">
                                <Form.Label className="mb-0 me-2">Is Product variant required? (Product Option)</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    name="isVariant"
                                    checked={isVariant}
                                    onChange={(e) => handleChangeVariant(e.target.checked)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {isVariant && (
                        <>
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Variations</Form.Label>
                                        <Select
                                            className="select2 z-3"
                                            options={updateOptionsList}
                                            isMulti
                                            value={updateOptionsList.filter(filterOptions)}
                                            onChange={(selectedOptions) => handleSelectVariation(selectedOptions)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {selectedVariations.map((variationId: any) => (
                                <Row key={variationId}>
                                    <Col lg={12}>
                                        {/* <Form.Label>Variation Values for {updateOptionsList.find((option: any) => option?.value === variationId)?.label} <Button variant="primary btn-sm" onClick={() => addVariationField(variationId)}>Add Variation Value</Button></Form.Label> */}
                                        <Form.Label>
                                            Variation Values for{' '}
                                            {updateOptionsList.find((option: any) => option?.value === variationId)?.label}{' '}
                                            {/* <Button variant="primary btn-sm" onClick={() => addVariationField(variationId)}>
                                                Add Variation Value
                                            </Button> */}
                                        </Form.Label>
                                        {/* {variationValues[variationId]?.map((variationValue: VariationValue, index: number) => ( */}
                                            <Row className="mb-3">
                                                <Col lg={12}>
                                                    <Select
                                                        className="select2 z-2"
                                                        isMulti
                                                        options={variationOptions[variationId]}
                                                        value={variationValues[variationId]}
                                                        // value={variationOptions[variationId]?.find((option: any) => option.value === variationValue.value)}
                                                        onChange={(selectedOption) => handleVariationValueChange(variationId, selectedOption)}
                                                    />
                                                    {/* {variationErrors[variationId] && variationErrors[variationId][index] && (
                                                        <div className="text-danger">
                                                            {variationErrors[variationId][index]}
                                                        </div>
                                                    )} */}
                                                </Col>
                                                {/* <Col lg={2}>
                                                    <Button variant="danger btn-sm" onClick={() => removeVariationField(variationId, index)}>Remove</Button>
                                                </Col> */}
                                            </Row>
                                        {/* ))} */}
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Meta Tag Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Meta Tag Description"
                                    name="metaTagDescription"
                                    value={metaTagDescription}
                                    onChange={(e) => setMetaTagDescription(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please fill the Meta Tag Description.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Meta Tag Keywords</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Meta Tag Keywords"
                                    name="metaTagKeywords"
                                    value={metaTagKeywords}
                                    onChange={(e) => setMetaTagKeywords(e.target.value)}
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
                            placeholder="Put Description here"
                            theme="snow"
                            style={{ height: 170 }}
                            className="pb-4 mb-2"
                            onChange={handleChange}
                        />
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
                        <Button variant="primary" type="submit" disabled={loading}>
                            Submit
                        </Button>
                    )}
                </Form>
            </Card.Body>
        </Card>
    );
};

const AddProduct = () => {
    const { slug } = useParams();

    return (
        <>
            <PageBreadcrumb title={slug ? 'Edit Product' : 'Add Product'} subName="Product" />
            <Row>
                <Col lg={12}>
                    <CustomFromAddProduct />
                </Col>
            </Row>
        </>
    );
};

export default AddProduct;
