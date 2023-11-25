import request from '../utils/request';

/**
 * 新增数据
 */
export const saveAdd = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/saveAdd',
        method: 'post',
        data: query
    });
	//get请求配置params
};


export const fetchData = () => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/fetchData',
        method: 'get'
    });
	//get请求配置params
};

