import requires from './require'

export const getAllDeliveryman = () => requires({
    url: '/deliveryman/getAllDeliveryman',
    method: 'get'
});

export const deleteDeliverymanByDId = (id) => requires({
    url: `/deliveryman/deleteDeliverymanByDId/${id}`,
    method: 'delete'
});

export const insertDeliveryman = (params) => requires({
    url: '/deliveryman/insertDeliveryman',
    data: params,
    method: 'post'
});

export const updateDeliveryman = (params) => requires({
    url: '/deliveryman/updateDeliveryman',
    data: params,
    method: 'put'
});

export const getDeliverymanByDId = (dName) => requires({
    url: `/deliveryman/getDeliverymanByDId/${dName}`,
    method: 'get'
});

export const deleteDeliverymans = (params) => requires({
    url: '/deliveryman/deleteDeliverymans',
    data: params,
    method: 'delete'
});