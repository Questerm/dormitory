import requires from './require'

export const login = (params) => requires({
    url: '/login',
    data: params,
    method: 'post'
});

export const register = (params) => requires({
    url: '/register',
    data: params,
    method: 'post'
});

export const completeUser = (params) => requires({
    url: '/user/completeUser',
    data: params,
    method: 'post'
});

export const completeShop = (params) => requires({
    url: '/shop/completeShop',
    data: params,
    method: 'post'
});

export const completeDeliveryman = (params) => requires({
    url: '/deliveryman/completeDeliveryman',
    data: params,
    method: 'post'
});

