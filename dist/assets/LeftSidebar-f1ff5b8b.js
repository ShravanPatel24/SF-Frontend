import{d as A,r as u,j as e,R as S,L as b}from"./index-50ad91ff.js";import{l as E}from"./logo-f3910204.js";import{l as F}from"./logo-dark-80b9d617.js";import{l as L}from"./logo-sm-c6d66e46.js";import{f as M,a as R,g as I}from"./index-df1ae962.js";import{C as P}from"./Collapse-9b12df91.js";import{S as _}from"./index-6536b3d7.js";import"./TransitionWrapper-09c32c32.js";import"./useMergedRefs-e6237522.js";import"./objectWithoutPropertiesLoose-4f48578a.js";import"./setPrototypeOf-0bb37fbe.js";const T=({item:s,linkClassName:i,subMenuClassNames:x,activeMenuItems:r,toggleMenu:o})=>{const[d,j]=u.useState(r.includes(s.key));u.useEffect(()=>{j(r.includes(s.key))},[r,s]);const l=()=>{const a=!d;return j(a),o&&o(s,a),!1};return e.jsxs("li",{className:`side-nav-item ${d?"menuitem-active":""}`,children:[e.jsxs(b,{to:"#",className:`side-nav-link ${i} ${r.includes(s.key)?"open":""}`,"aria-expanded":d,"data-menu-key":s.key,onClick:l,children:[s.icon&&e.jsx("i",{className:s.icon}),s.badge?e.jsx("span",{className:`badge bg-${s.badge.variant} float-end`,children:s.badge.text}):e.jsx("span",{className:"menu-arrow"}),e.jsxs("span",{children:[" ",s.label]})]}),e.jsx(P,{in:d,children:e.jsx("div",{children:e.jsx("ul",{className:`side-nav-second-level ${x}`,children:(s.children||[]).map((a,p)=>e.jsx(S.Fragment,{children:a.children?e.jsx(T,{item:a,linkClassName:r.includes(a.key)?"active":"",activeMenuItems:r,subMenuClassNames:"sub-menu",toggleMenu:o}):e.jsx($,{item:a,className:r.includes(a.key)?"menuitem-active":"",linkClassName:r.includes(a.key)?"active":""})},p))})})})]})},$=({item:s,className:i,linkClassName:x})=>e.jsx("li",{className:`side-nav-item ${i}`,children:e.jsx(w,{item:s,className:x})}),w=({item:s,className:i})=>e.jsxs(b,{to:s.url,target:s.target,className:`side-nav-link-ref ${i}`,"data-menu-key":s.key,children:[s.icon&&e.jsx("i",{className:s.icon}),s.badge&&e.jsx("span",{className:`badge bg-${s.badge.variant} float-end`,children:s.badge.text}),e.jsxs("span",{children:[" ",s.label]})]}),O=({menuItems:s})=>{let i=A();const x=u.useRef(null),[r,o]=u.useState([]),d=(l,a)=>{a&&o([l.key,...R(s,l)])},j=u.useCallback(()=>{var p;const l=document.getElementById("main-side-menu");let a=null;if(l){let N=l.getElementsByClassName("side-nav-link-ref");for(let m=0;m<N.length;++m){let g=(p=i==null?void 0:i.pathname)==null?void 0:p.replaceAll({}.PUBLIC_URL??"",""),f=N[m].pathname;if(g==={}.PUBLIC_URL+"/"&&(g+="ecommerce"),g===(f==null?void 0:f.replaceAll({}.PUBLIC_URL,""))){a=N[m];break}}if(a){let m=function(n,c,t,h){return n/=h/2,n<1?t/2*n*n+c:(n--,-t/2*(n*(n-2)-1)+c)},g=function(n,c,t){var h=n.scrollTop,B=c-h,v=0,y=20,C=function(){v+=y;var U=m(v,h,B,t);n.scrollTop=U,v<t&&setTimeout(C,y)};C()};const f=a.getAttribute("data-menu-key"),k=M(s,f);k&&o([k.key,...R(s,k)]),setTimeout(function(){var n=a;if(n!=null){var c=document.querySelector("#leftside-menu-container .simplebar-content-wrapper"),t=n.offsetTop-300;c&&t>100&&g(c,t,600)}},200)}}},[i,s]);return u.useEffect(()=>{j()},[]),e.jsx(e.Fragment,{children:e.jsx("ul",{className:"side-nav",ref:x,id:"main-side-menu",children:(s||[]).map((l,a)=>e.jsx(S.Fragment,{children:l.isTitle?e.jsx("li",{className:"side-nav-title",children:l.label}):e.jsx(e.Fragment,{children:l.children?e.jsx(T,{item:l,toggleMenu:d,subMenuClassNames:"",activeMenuItems:r,linkClassName:"side-nav-link"}):e.jsx($,{item:l,linkClassName:"side-nav-link",className:r.includes(l.key)?"menuitem-active":""})})},a))})})},q=()=>e.jsxs(e.Fragment,{children:[e.jsx(O,{menuItems:I()}),e.jsx("div",{className:"clearfix"})]}),Z=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"leftside-menu",children:[e.jsxs(b,{to:"/",className:"logo logo-light",children:[e.jsx("span",{className:"logo-lg",children:e.jsx("img",{src:E,alt:"logo",style:{height:"70px"}})}),e.jsx("span",{className:"logo-sm",children:e.jsx("img",{src:L,alt:"small logo"})})]}),e.jsxs("a",{href:"index.html",className:"logo logo-dark",children:[e.jsx("span",{className:"logo-lg",children:e.jsx("img",{src:F,alt:"dark logo"})}),e.jsx("span",{className:"logo-sm",children:e.jsx("img",{src:L,alt:"small logo"})})]}),e.jsxs(_,{className:"h-100",id:"leftside-menu-container","data-simplebar":"",children:[e.jsx(q,{}),e.jsx("div",{className:"clearfix"})]})]})});export{Z as default};
