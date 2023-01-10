import requires from './require'

export const getAllShop = () => requires({
    url: '/shop/getAllShop',
    method: 'get'
});

export const getTop3GoodsBysId = () => requires({
    url: '/shop/getTop3GoodsBysId',
    method: 'get'
});

export const getGoodsBysId = (sId) => requires({
    url: '/shop/getGoodsBysId',
    params: sId,
    method: 'get'
});

export const findCartGoodsList = (data) => requires({
    url: '/carts/findCartGoodsList',
    params: data,
    method: 'get'
});

export const createOrder = (data) => requires({
    url: '/carts/createOrder',
    data,
    method: 'post'
});

export const selectGoods = (data) => requires({
    url: '/goods/selectGoods',
    params: data,
    method: 'get'
});

export const joinCart = (data) => requires({
    url:'/carts/joinCart',
    params: data,
    method: 'post'
});

export const selectOrderByUId = (data) => requires({
    url:'/user/selectOrderByUId',
    params: data,
    method: 'get'
});

export const selectShop = (data) => requires({
    url:'/shop/selectShop',
    params: data,
    method: 'get'
});

export const getPage = (page, num) => requires({
    url:`/goods/getPage/${page}/${num}`,
    method: 'get'
});

export const findShop = (data) => requires({
    url:'/shop/findShop',
    params: data,
    method: 'get'
});

export const findGoods = (val, num, data) => requires({
    url:`/goods/findGoods/${val}/${num}`,
    params: data,
    method: 'get'
});

export const insertComplaint = (data) => requires({
    url:'/complaint/insertComplaint',
    data,
    method: 'post'
});

export const insertComment = (data) => requires({
    url:'/comment/insertComment',
    data,
    method: 'post'
});

export const getGoodsByGId = (gid) => requires({
    url:`/goods/getGoodsByGId/${gid}`,
    method: 'get'
});

export const selectCommentByGId = (gid) => requires({
    url:'/goods/selectCommentByGId',
    params: gid,
    method: 'get'
});

export const backOrder = (oid) => requires({
    url:'/user/backOrder',
    params: oid,
    method: 'put'
});

export const findCommentGoodsByOId = (oid) => requires({
    url:'/comment/findCommentGoodsByOId',
    params: oid,
    method: 'get'
});


