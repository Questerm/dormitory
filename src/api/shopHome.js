import requires from './require'

export const getGoodsBysId = (data) => requires({
    url: '/shop/getGoodsBysId',
    params: data,
    method: 'get'
});

export const insertGoods = (data) => requires({
    url: '/goods/insertGoods',
    data,
    method: 'post'
});

export const deleteGoodsByGId = (Gid) => requires({
    url: `/goods/deleteGoodsByGId/${Gid}`,
    method: 'delete'
});

export const getShopOrders = (data) => requires({
    url: '/shop/getShopOrders',
    params: data,
    method: 'get'
});

export const pickOrderGoods = (data) => requires({
    url: '/shop/pickOrderGoods',
    params: data,
    method: 'put'
});

export const takeBackOrder = (data) => requires({
    url: '/shop/takeBackOrder',
    params: data,
    method: 'put'
});

export const replyComment = (data) => requires({
    url: '/shop/replyComment',
    params: data,
    method: 'put'
});

export const getCommentBySId = (data) => requires({
    url: '/shop/getCommentBySId',
    params: data,
    method: 'get'
});

export const getShopBySId = (data) => requires({
    url: '/shop/getShopBySId',
    params: data,
    method: 'get'
});

export const updateShop = (data) => requires({
    url: '/shop/updateShop',
    data,
    method: 'put'
});
