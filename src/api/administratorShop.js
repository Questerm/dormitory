import requires from './require'

export const getAllShop = () => requires({
    url: '/shop/getAllShop',
    method: 'get'
});

export const deleteShopBySId = (id) => requires({
    url: `/shop/deleteShopBySId/${id}`,
    method: 'delete'
});

export const insertShop = (params) => requires({
    url: '/shop/insertShop',
    data: params,
    method: 'post'
});

export const updateShop = (params) => requires({
    url: '/shop/updateShop',
    data: params,
    method: 'put'
});

export const getShopBySId = (sName) => requires({
    url: `/shop/getShopBySId/${sName}`,
    method: 'get'
});

export const deleteShops = (params) => requires({
    url: '/shop/deleteShops',
    data: params,
    method: 'delete'
});