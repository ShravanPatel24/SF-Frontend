import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'))
const ResetPassword = React.lazy(() => import('../pages/auth/ResetPassword'))
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'))

// // dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'))

// // Users
const UsersTable = React.lazy(() => import('../pages/Users/user'))
const AddUsers = React.lazy(() => import('../pages/Users/user/addUser'))
const PartnersTable = React.lazy(() => import('../pages/Users/partner'))
const AddPartners = React.lazy(
	() => import('../pages/Users//partner/addPartner')
)

// // Categories
const CategoryTable = React.lazy(() => import('../pages/Categories/category'))
const AddCategory = React.lazy(
	() => import('../pages/Categories/category/addCategory')
)
// const SubCategoryTable = React.lazy(() => import('../pages/Categories/subCategory'))
// const AddSubCategory = React.lazy(() => import('../pages/Categories//subCategory/addSubCategory'))

const OptionsTable = React.lazy(() => import('../pages/Options'))
const AddOptions = React.lazy(() => import('../pages/Options/addOptions'))

const StaticContentTable = React.lazy(() => import('../pages/StaticContent'))
const AddStaticContent = React.lazy(
	() => import('../pages/StaticContent/addStaticContent')
)

const FAQTable = React.lazy(() => import('../pages/Faq'))
const AddFAQ = React.lazy(() => import('../pages/Faq/addFaq'))

const CareersTable = React.lazy(() => import('../pages/Careers'))
const AddCareers = React.lazy(() => import('../pages/Careers/addCareers'))

const CustomerQueriesTable = React.lazy(
	() => import('../pages/CustomerQueries')
)

const OrderTable = React.lazy(() => import('../pages/Orders'))
const ViewOrderDetails = React.lazy(() => import('../pages/Orders/viewOrder'))

const ProductTable = React.lazy(() => import('../pages/Products'))
const AddProductTable = React.lazy(() => import('../pages/Products/addProduct'))

// // pages
const ProfilePages = React.lazy(() => import('../pages/other/Profile/'))
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))

// // error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/admin',
	name: 'Dashboard',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
		},
	],
}

const categoryRoutes: RoutesProps = {
	path: '/business-type',
	name: 'Categories',
	icon: 'category',
	header: 'Business Type',
	element: <CategoryTable />,
	children: [
		{
			path: '/business-type/add',
			name: 'Add Business Type',
			element: <AddCategory />,
			route: PrivateRoute,
		},
		{
			path: '/business-type/edit/:slug',
			name: 'Edit Business Type',
			element: <AddCategory />,
			route: PrivateRoute,
		},
		{
			path: '/business-type/list',
			name: 'Business Type',
			element: <CategoryTable />,
			route: PrivateRoute,
		},
	],
}

// Users routes
const usersRoutes: RoutesProps = {
	path: '/users',
	name: 'Users',
	icon: 'users',
	header: 'Users',
	element: <UsersTable />,
	children: [
		{
			path: '/users/add',
			name: 'Add Users',
			element: <AddUsers />,
			route: PrivateRoute,
		},
		{
			path: '/users/edit/:slug',
			name: 'Edit Users',
			element: <AddUsers />,
			route: PrivateRoute,
		},
		{
			path: '/users/list',
			name: 'Users',
			element: <UsersTable />,
			route: PrivateRoute,
		},
		{
			path: '/users/partner',
			name: 'Partners',
			element: <PartnersTable />,
			route: PrivateRoute,
		},
		{
			path: '/users/partner/add',
			name: 'Partners',
			element: <AddPartners />,
			route: PrivateRoute,
		},
		{
			path: '/users/partner/edit/:slug',
			name: 'Partners',
			element: <AddPartners />,
			route: PrivateRoute,
		},
	],
}

const productRoutes: RoutesProps = {
	path: '/products',
	name: 'Products',
	icon: 'products',
	header: 'Products',
	element: <ProductTable />,
	children: [
		{
			path: '/products/options',
			name: 'Options List',
			element: <OptionsTable />,
			route: PrivateRoute,
		},
		{
			path: '/products/options/add',
			name: 'Add Options',
			element: <AddOptions />,
			route: PrivateRoute,
		},
		{
			path: '/products/options/edit/:id',
			name: 'Add Options',
			element: <AddOptions />,
			route: PrivateRoute,
		},
		{
			path: '/products/list',
			name: 'Products List',
			element: <ProductTable />,
			route: PrivateRoute,
		},
		{
			path: '/products/add',
			name: 'Add Products',
			element: <AddProductTable />,
			route: PrivateRoute,
		},
		{
			path: '/products/edit/:slug',
			name: 'Edit Products',
			element: <AddProductTable />,
			route: PrivateRoute,
		},
		{
			path: '/products/view/:slug',
			name: 'View Product',
			element: <AddProductTable />,
			route: PrivateRoute,
		},
	],
}

const staticContentRoutes: RoutesProps = {
	path: '/static-content',
	name: 'Static Content',
	icon: 'options',
	header: 'Static Content',
	element: <StaticContentTable />,
	children: [
		{
			path: '/static-content/add',
			name: 'Add Static Content',
			element: <StaticContentTable />,
			route: PrivateRoute,
		},
		{
			path: '/static-content/edit/:slug',
			name: 'Edit Static Content',
			element: <AddStaticContent />,
			route: PrivateRoute,
		},
	],
}

const faqRoutes: RoutesProps = {
	path: '/faq',
	name: 'FAQ',
	icon: 'options',
	header: 'FAQ',
	element: <FAQTable />,
	children: [
		{
			path: '/faq/add',
			name: 'Add FAQ',
			element: <AddFAQ />,
			route: PrivateRoute,
		},
		{
			path: '/faq/edit/:id',
			name: 'Edit FAQ',
			element: <AddFAQ />,
			route: PrivateRoute,
		},
	],
}

const careersRoutes: RoutesProps = {
	path: '/careers',
	name: 'Careers',
	icon: 'options',
	header: 'Careers',
	element: <CareersTable />,
	children: [
		{
			path: '/careers/add',
			name: 'Add Careers',
			element: <AddCareers />,
			route: PrivateRoute,
		},
		{
			path: '/careers/edit/:id',
			name: 'Edit Careers',
			element: <AddCareers />,
			route: PrivateRoute,
		},
	],
}

const customerQueriesRoutes: RoutesProps = {
	path: '/customer-queries',
	name: 'Customer Queries',
	icon: 'options',
	header: 'Customer Queries',
	element: <CustomerQueriesTable />,
}

const orderRoutes: RoutesProps = {
	path: '/orders',
	name: 'Orders',
	icon: 'options',
	header: 'Orders',
	element: <OrderTable />,
	children: [
		{
			path: '/orders/view/:id',
			name: 'View Order',
			element: <ViewOrderDetails />,
			route: PrivateRoute,
		},
	],
}

// pages
const customPagesRoutes = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/profile',
			name: 'Profile',
			element: <ProfilePages />,
			route: PrivateRoute,
		},
	],
}

// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		element: <ForgotPassword />,
		route: Route,
	},
	{
		path: '/auth/reset-password',
		name: 'Reset Password',
		element: <ResetPassword />,
		route: Route,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route,
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [
	dashboardRoutes,
	customPagesRoutes,
	categoryRoutes,
	usersRoutes,
	productRoutes,
	staticContentRoutes,
	faqRoutes,
	customerQueriesRoutes,
	orderRoutes,
	careersRoutes,
]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}