import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Badge, Row, Table } from 'react-bootstrap';
import { PageBreadcrumb } from '@/components';
import { OrderService } from '@/common';
import { useParams } from 'react-router-dom';

// Utility Functions
const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
};

const getStatusBadge = (status) => {
    switch (status) {
        case 1:
            return <Badge bg="success">Pending</Badge>;
        case 2:
            return <Badge bg="danger">Confirmed</Badge>;
        case 0:
            return <Badge bg="danger">Cancelled</Badge>;
        default:
            return null;
    }
};

// Subcomponents
const OrderDetailRow = ({ title, value }) => (
    <Col lg={4}>
        <div className="subservice-row">
            <span className="service-title">{title} :</span>
            <span className="service-view">{value}</span>
        </div>
    </Col>
);

const AddressDetail = ({ address, type }) => (
    <>
        <Row>
            <Col lg={12}>
                <div className="sub-service-title">
                    <h3><span>{type} Details</span></h3>
                </div>
            </Col>
        </Row>
        <Row>
            <OrderDetailRow title="Name" value={`${address?.firstName} ${address?.lastName}`} />
            {type === 'Delivery' && <OrderDetailRow title="Email" value={address?.email} />}
            {type === 'Delivery' && <OrderDetailRow title="Phone" value={address?.phone} />}
            <OrderDetailRow title="Company Name" value={address?.companyName} />
            <OrderDetailRow title="Street Address" value={address?.streetAddress} />
            <OrderDetailRow title="Apartment" value={address?.apartment} />
            <OrderDetailRow title="City" value={address?.city} />
            <OrderDetailRow title="Postal / Zip Code" value={address?.postcode} />
            <OrderDetailRow title="Country" value={address?.country} />
            <OrderDetailRow title="State" value={address?.state} />
        </Row>
    </>
);

const ProductDetails = ({ products }) => (
    <>
        <Row>
            <Col lg={12}>
                <div className="sub-service-title">
                    <h3><span>Product Details</span></h3>
                </div>
            </Col>
        </Row>
        <Row>
            <div className="table-responsive-sm">
                <Table className="table-bordered table-centered mb-0">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            {/* <th>Price</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><strong>{product?.name}</strong><br/>
                                    {product?.productVariant.map((productVariant, index) => (
                                        <div key={index}>- {productVariant.variationName} - {productVariant.variationValue}</div>
                                    ))}
                                </td>
                                <td>{product.quantity}</td>
                                {/* <td>{product.price}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Row>
    </>
);

const ViewOrderDetails = ({ id }) => {
    const [orderDetail, setOrderDetail] = useState({});

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (id) {
                try {
                    const response = await OrderService.getOrderDetails(id);
                    if (response?.code === 200) {
                        setOrderDetail(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            }
        };

        fetchOrderDetails();
    }, [id]);

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col lg={12}>
                        <div className="sub-service-title">
                            <h3><span>Order Details</span></h3>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <OrderDetailRow title="Order Id" value={orderDetail?.orderId} />
                    <OrderDetailRow title="Order Date" value={formatDateTime(orderDetail?.createdAt)} />
                    <OrderDetailRow title="Status" value={getStatusBadge(orderDetail?.status)} />
                </Row>
                <AddressDetail address={orderDetail?.deliveryAddress} type="Delivery" />
                <AddressDetail address={orderDetail?.billingAddress} type="Billing" />
                <ProductDetails products={orderDetail?.products} />
            </Card.Body>
        </Card>
    );
};

const ViewOrder = () => {
    const { id } = useParams();

    return (
        <>
            <PageBreadcrumb title={id ? 'View Order Details' : 'Add FAQ'} subName="FAQ" />
            <Row>
                <Col lg={12}>
                    <ViewOrderDetails id={id} />
                </Col>
            </Row>
        </>
    );
};

export default ViewOrder;
