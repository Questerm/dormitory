import requires from './require'

export const findByListCid = (num, gid, uid) => requires({
    url: `/joinCart/${num}/${gid}/${uid}`,
    method: 'get'
});