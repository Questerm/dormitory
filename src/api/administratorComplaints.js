import requires from './require'

export const getAllComplaint = () => requires({
    url: '/complaint/getAllComplaint',
    method: 'get'
});

export const deleteComplaintByCId = (cid) => requires({
    url: `/complaint/deleteComplaintByCId/${cid}`,
    method: 'delete'
});