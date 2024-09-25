import{k as se,j as e,r as n,i as Ve,B as ee}from"./index-50ad91ff.js";import{P as Pe}from"./PageBreadcrumb-2adbd738.js";import{S as Se}from"./Spinner-57400a8f.js";import{U as Ne}from"./index-5266a108.js";import"./Table-9e7095d0.js";import{a as v}from"./sweetalert2.all-c3a7603a.js";import{o as we}from"./option-e755a7ae.js";import{u as ke,p as w}from"./product-0fb1650c.js";import{R as De}from"./index-417bbafc.js";/* empty css                     */import{R as m}from"./Row-a90e51f1.js";import{C as c}from"./Col-6e802f16.js";import{C as ae}from"./Card-4e1bc556.js";import{F as t}from"./Form-57b1e97c.js";import{I as Le}from"./Image-4e39bf60.js";import{B as te}from"./Button-cbb264fd.js";import"./Anchor-ceb627db.js";import"./Button-825b6efb.js";import"./index-8b12ee39.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./extends-98964cd2.js";import"./setPrototypeOf-0bb37fbe.js";import"./category-f2587abd.js";import"./createWithBsPrefix-d4ec82c8.js";import"./divWithClassName-189ef379.js";const Te=()=>{const{getCategoryList:V,categoryList:k,getSubCategoryList:D,subCategoryList:L,getProductVariation:T,optionsList:re}=ke(),P=re,[oe,le]=n.useState(!1),[I,M]=n.useState(""),[ie,ne]=n.useState(""),[F,E]=n.useState(""),[x,G]=n.useState(""),[ce,K]=n.useState(""),[f,R]=n.useState(!1),[j,A]=n.useState(""),[U,q]=n.useState(""),[z,B]=n.useState(""),[O,$]=n.useState(""),[J,Q]=n.useState(""),[H,W]=n.useState(""),[X,S]=n.useState(!1),de="https://social-api.apikart.co/v1/",[p,N]=n.useState([]),[Ie,Y]=n.useState({}),[b,y]=n.useState({}),[ue,me]=n.useState({}),{slug:C}=se(),ge=Ve(),pe={toolbar:[[{font:[]},{size:[]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"super"},{script:"sub"}],[{header:[!1,1,2,3,4,5,6]},"blockquote","code-block"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["direction",{align:[]}],["link","image","video"],["clean"]]};n.useEffect(()=>{V("",1)},[]),n.useEffect(()=>{C&&(async()=>{var o,s,l,d;try{const i=await w.getProductDetails(C);if((i==null?void 0:i.code)===200){const r=i.data;if(ne(r.id),E((o=r.categoryId)==null?void 0:o.id),D("",1,(s=r.categoryId)==null?void 0:s.id),G((l=r.subCategoryId)==null?void 0:l.id),M(r.name),B(r.model),$(r.sku),q((d=r.description)==null?void 0:d.replace(/&lt;/g,"<").replace(/&lt;/g,"<")),Q(r.metaTagDescription),W(r.metaTagKeywords),K(r.images[0]),A(`${de}media/preview?filename=${r.images[0]}`),R(r.isVariant),r.isVariant&&r.productVariant){T("",1);const g=r.productVariant.map(u=>{var h;return{variationId:(h=u.variationId)==null?void 0:h.id,variationValues:u.variationValues.map(_=>({value:_.value,label:_.value}))}});for(const u of g)await Z(u.variationId);N(g.map(u=>u.variationId)),y(g.reduce((u,h)=>(u[h.variationId]=h.variationValues,u),{}))}}}catch(i){console.error("Error fetching category:",i)}})()},[C]);const he=async a=>{const o=a.currentTarget;if(console.log("🚀 ~ file: addProduct.tsx:90 ~ handleSubmit ~ form:",o),o.checkValidity()===!1)a.preventDefault(),a.stopPropagation();else{a.preventDefault(),S(!0);try{const s=new FormData;if(s.append("name",I),s.append("image",ce),s.append("description",U),s.append("model",z),s.append("sku",O),s.append("categoryId",F),x&&s.append("subCategoryId",x||""),s.append("isVariant",JSON.stringify(f)),s.append("metaTagKeywords",H),s.append("metaTagDescription",J),f&&p.length>0){const d=[];p.forEach((i,r)=>{console.log("🚀 ~ file: addProduct.tsx:184 ~ selectedVariations.forEach ~ variation:",i,b[i]);const g={variationId:i,variationValues:b[i]};d.push(g)}),console.log("🚀 ~ file: addProduct.tsx:192 ~ selectedVariations.forEach ~ selectedVariations:",p),console.log("🚀 ~ file: addProduct.tsx:192 ~ selectedVariations.forEach ~ productVariants:",d),s.append("productVariant",JSON.stringify(d))}console.log("🚀 ~ file: addProduct.tsx:113 ~ handleSubmit ~ variationValues:",b);const l=C?await w.updateProduct(s,ie):await w.addProduct(s);(l==null?void 0:l.code)===200?(S(!1),ee.success(l==null?void 0:l.message),ge("/products/list")):ee.error(l==null?void 0:l.message)}finally{S(!1)}}le(!0)},xe=a=>{const o=a.target.files[0];if(K(o),o){const s=new FileReader;s.onload=l=>{var d;A((d=l==null?void 0:l.target)==null?void 0:d.result)},s.readAsDataURL(o)}},fe=a=>{q(a)},je=a=>{E(a==null?void 0:a.value),D("",1,a==null?void 0:a.value)},be=a=>{R(a),a?T("",1):(N([]),y({}))},ye=a=>{const o=a.map(s=>s.value);N(o),y({}),o.forEach(s=>Z(s))},Z=async a=>{var s,l;const o=await we.getVariationDetails(a);if((o==null?void 0:o.code)===200){const d=(l=(s=o==null?void 0:o.data)==null?void 0:s.variationValues)==null?void 0:l.map(i=>({label:i.value,value:i.value,image:i==null?void 0:i.image}));me(i=>({...i,[a]:d}))}},Ce=(a,o)=>{console.log("🚀 ~ file: addProduct.tsx:286 ~ handleVariationValueChange ~ selectedOptions:",o),y(s=>{const l={...s},d=o.map(r=>r.value);return Object.keys(s).some(r=>s[r].some(g=>d.includes(g.value)&&r!==a))?Y(r=>({...r,[a]:{...r[a],message:"One or more selected values are already selected in another variation."}})):(l[a]=o,Y(r=>({...r,[a]:{...r[a],message:null}}))),l})},ve=a=>p.includes(a==null?void 0:a.value);return e.jsx(ae,{children:e.jsx(ae.Body,{children:e.jsxs(t,{noValidate:!0,validated:oe,onSubmit:he,children:[e.jsxs(m,{children:[e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Product Name"}),e.jsx(t.Control,{type:"text",placeholder:"Product Name",name:"productName",value:I,onChange:a=>M(a.target.value),required:!0}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please fill the product Name."})]})}),e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Category"}),e.jsx(v,{className:"select2 z-3",options:k,value:k.find(a=>a.value===F),onChange:a=>je(a),required:!0}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please fill the Category Name."})]})}),e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Sub Category"}),e.jsx(v,{className:"select2 z-3",options:L,value:L.find(a=>a.value===x),onChange:a=>G(a==null?void 0:a.value)}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please fill the Category Name."})]})}),e.jsx(c,{lg:j?3:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Product Image"}),e.jsx(t.Control,{type:"file",accept:"image/*",placeholder:"product Image",onChange:xe,required:!j}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please select the product image."})]})}),j&&e.jsx(c,{lg:1,children:e.jsx(Ne,{children:e.jsx(Le,{style:{borderStyle:"solid",borderColor:"gray",width:"50px",height:"50px",margin:"15px 0 0 0"},src:j,alt:"avatar",className:"avatar-lg rounded",fluid:!0})})}),e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Product Model"}),e.jsx(t.Control,{type:"text",placeholder:"Product Model",name:"model",value:z,onChange:a=>B(a.target.value)})]})}),e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Product SKU"}),e.jsx(t.Control,{type:"text",placeholder:"Product SKU",name:"sku",value:O,onChange:a=>$(a.target.value)})]})})]}),e.jsx(m,{children:e.jsx(c,{lg:4,children:e.jsxs(t.Group,{className:"mb-3 d-flex align-items-center",children:[e.jsx(t.Label,{className:"mb-0 me-2",children:"Is Product variant required? (Product Option)"}),e.jsx(t.Check,{type:"checkbox",name:"isVariant",checked:f,onChange:a=>be(a.target.checked)})]})})}),f&&e.jsxs(e.Fragment,{children:[e.jsx(m,{children:e.jsx(c,{lg:6,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Select Variations"}),e.jsx(v,{className:"select2 z-3",options:P,isMulti:!0,value:P.filter(ve),onChange:a=>ye(a)})]})})}),p.map(a=>{var o;return e.jsx(m,{children:e.jsxs(c,{lg:12,children:[e.jsxs(t.Label,{children:["Variation Values for"," ",(o=P.find(s=>(s==null?void 0:s.value)===a))==null?void 0:o.label," "]}),e.jsx(m,{className:"mb-3",children:e.jsx(c,{lg:12,children:e.jsx(v,{className:"select2 z-2",isMulti:!0,options:ue[a],value:b[a],onChange:s=>Ce(a,s)})})})]})},a)})]}),e.jsxs(m,{children:[e.jsx(c,{lg:6,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Meta Tag Description"}),e.jsx(t.Control,{as:"textarea",rows:3,placeholder:"Meta Tag Description",name:"metaTagDescription",value:J,onChange:a=>Q(a.target.value)}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please fill the Meta Tag Description."})]})}),e.jsx(c,{lg:6,children:e.jsxs(t.Group,{className:"mb-3",children:[e.jsx(t.Label,{children:"Meta Tag Keywords"}),e.jsx(t.Control,{as:"textarea",rows:3,placeholder:"Meta Tag Keywords",name:"metaTagKeywords",value:H,onChange:a=>W(a.target.value)}),e.jsx(t.Text,{className:"text-muted",children:"Please enter keywords separated by commas."}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please fill the Meta Tag Keywords."})]})})]}),e.jsxs(m,{children:[e.jsx(t.Label,{children:"Description"}),e.jsx(De,{modules:pe,value:U,placeholder:"Put Description here",theme:"snow",style:{height:170},className:"pb-4 mb-2",onChange:fe})]}),X?e.jsxs(te,{variant:"primary",disabled:!0,children:[e.jsx(Se,{className:"spinner-border-sm",tag:"span",color:"white"})," ","Loading..."]}):e.jsx(te,{variant:"primary",type:"submit",disabled:X,children:"Submit"})]})})})},ra=()=>{const{slug:V}=se();return e.jsxs(e.Fragment,{children:[e.jsx(Pe,{title:V?"Edit Product":"Add Product",subName:"Product"}),e.jsx(m,{children:e.jsx(c,{lg:12,children:e.jsx(Te,{})})})]})};export{ra as default};
