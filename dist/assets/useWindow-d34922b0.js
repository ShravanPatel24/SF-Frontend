import{r as t}from"./index-50ad91ff.js";import{c as o}from"./useMergedRefs-e6237522.js";function a(){const e=t.useRef(!0),n=t.useRef(()=>e.current);return t.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),n.current}function f(e){const n=t.useRef(null);return t.useEffect(()=>{n.current=e}),n.current}const u=typeof global<"u"&&global.navigator&&global.navigator.product==="ReactNative",s=typeof document<"u",d=s||u?t.useLayoutEffect:t.useEffect;function m(e,n){if(e.contains)return e.contains(n);if(e.compareDocumentPosition)return e===n||!!(e.compareDocumentPosition(n)&16)}const r=t.createContext(o?window:void 0);r.Provider;function p(){return t.useContext(r)}export{d as a,a as b,f as c,m as d,p as u};
