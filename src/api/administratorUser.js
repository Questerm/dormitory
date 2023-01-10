import requires from './require'

export const getAllUser = () => requires({
    url: '/user/getAllUser',
    method: 'get'
});

export const deleteUserByUId = (id) => requires({
    url: `/user/deleteUserByUId/${id}`,
    method: 'delete'
});

export const insertUser = (params) => requires({
    url: '/user/insertUser',
    data: params,
    method: 'post'
});

export const updateUser = (params) => requires({
    url: '/user/updateUser',
    data: params,
    method: 'put'
});

export const getUserByUId = (userName) => requires({
    url: `/user/getUserByUId/${userName}`,
    method: 'get'
});

export const deleteUsers = (params) => requires({
    url: '/user/deleteUsers',
    data: params,
    method: 'delete'
});