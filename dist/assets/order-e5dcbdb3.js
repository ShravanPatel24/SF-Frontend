import{H as t}from"./index-50ad91ff.js";function a(){return{getOrderList:r=>t.get(`/order?page=${r.page}&sortBy=${r.sortBy}&limit=${r.limit}&searchBy=${r.searchBy}&status=${r.status}`),getOrderDetails:r=>t.get("/order/"+r),updateOrder:(r,e)=>t.patch("/order/"+e,r)}}const o=a();export{o as O};
