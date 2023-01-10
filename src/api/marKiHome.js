import requires from './require'
export const findOrders = () => requires({
    url: '/order/findOrders',
    method: 'get'
});

export const takeOrder = (data) => requires({
    url: '/deliveryman/takeOrder',
    params: data,
    method: 'put'
});

export const deliveryOrder = (data) => requires({
    url: '/deliveryman/deliveryOrder',
    params: data,
    method: 'put'
});

export const finishOrder = (data) => requires({
    url: '/deliveryman/finishOrder',
    params: data,
    method: 'put'
});


