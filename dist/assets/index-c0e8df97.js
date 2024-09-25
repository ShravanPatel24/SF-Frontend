import{r as i,B as s,j as f}from"./index-50ad91ff.js";import{P as v}from"./PageBreadcrumb-2adbd738.js";import{C as O}from"./CustomTable-8273eff0.js";import"./Table-9e7095d0.js";import{O as b}from"./order-e5dcbdb3.js";import{S as x}from"./sweetalert2.all-c3a7603a.js";import"./Row-a90e51f1.js";import"./Col-6e802f16.js";import"./Anchor-ceb627db.js";import"./Button-825b6efb.js";import"./index-5266a108.js";import"./Card-4e1bc556.js";import"./createWithBsPrefix-d4ec82c8.js";import"./divWithClassName-189ef379.js";import"./Table-b92e9daa.js";import"./Dropdown-3b42b385.js";import"./NavbarContext-4275da30.js";import"./useMergedRefs-e6237522.js";import"./NavContext-578bc096.js";import"./extends-98964cd2.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./useWindow-d34922b0.js";import"./InputGroupContext-cef532f1.js";import"./Button-cbb264fd.js";import"./Badge-ab01f418.js";import"./index-8b12ee39.js";import"./setPrototypeOf-0bb37fbe.js";function C(){const[S,l]=i.useState(!1),[h,y]=i.useState([]),[B,n]=i.useState(1),d=async({page:a,sortBy:o,limit:r,searchBy:u,status:c})=>{var e,p,g;l(!0);try{const t=await b.getOrderList({page:a,sortBy:o,limit:r,searchBy:u,status:c});(t==null?void 0:t.code)==200?(n((e=t==null?void 0:t.data)==null?void 0:e.totalPages),Array.isArray((p=t==null?void 0:t.data)==null?void 0:p.docs)?y((g=t==null?void 0:t.data)==null?void 0:g.docs):console.error("Unexpected response format from OrderService.getCategoryList:",t.data)):(t==null?void 0:t.code)===400||(t==null?void 0:t.code)===401?s.error(t==null?void 0:t.message):s.error(t==null?void 0:t.message)}catch{s.error("Error fetching categories")}finally{l(!1)}};return{loading:S,getList:d,orderList:h,totalPages:B,updateStatus:async(a,o)=>{try{const r=o==="delete"?"delete":a.status===0?"activate":"deactivate";a.status=o==="delete"?a.status:a.status===0?1:0,a.isDelete=o==="delete"?a.isDelete===0?1:0:a.isDelete,x.fire({title:"Are you sure?",text:`You want to ${r} this faq?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:`Yes, ${r} it!`}).then(async u=>{var c;if(u.isConfirmed){a.categoryId=(c=a.categoryId)==null?void 0:c.id;const e=await b.updateOrder(a,a==null?void 0:a.id);(e==null?void 0:e.code)==200?(s.success(e==null?void 0:e.message),d({page:1,sortBy:"asc ",limit:10,searchBy:"",status:""})):(e==null?void 0:e.code)===400||(e==null?void 0:e.code)===401?s.error(e==null?void 0:e.message):s.error(e==null?void 0:e.message)}})}catch{s.error("Error updating category status")}}}}const Z=()=>{const{loading:S,orderList:l,getList:h,totalPages:y,updateStatus:B}=C(),[n,d]=i.useState(""),[m,a]=i.useState(1),[o,r]=i.useState(""),u=["S.No.","Order Id","Order Date","Status","Action"],c=[{value:"",label:"All"},{value:"1",label:"Active"},{value:"0",label:"Inactive"}];i.useEffect(()=>{h({page:m,sortBy:"asc",limit:10,searchBy:encodeURIComponent(n),status:o})},[n,m,o]);const e=t=>{d(t.target.value)},p=t=>{a(t)},g=t=>{r(t)};return f.jsxs(f.Fragment,{children:[f.jsx(v,{title:"Order Tables",subName:"Tables"}),f.jsx(O,{loading:S,data:l,addButtonName:"",navigationUrl:"/orders",isImage:"hide",columns:u,totalPages:y,pageNumber:m,filterBy:"status",filterValue:c,status:o,isSlug:!0,onPageChange:p,updateStatus:B,changeStatus:g,searchTerm:n,handleInputChange:e,isAction:!0})]})};export{Z as default};
