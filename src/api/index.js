import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '../table.json',
        method: 'get',
        data: query
    });
	//get请求配置params
};
//获取异常数据的请求
export const fetchExceptionData = () => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/getExceptionInfo',
        method: 'get'
    });
	//get请求配置params
};
//获取数据比例
export const getSex = () => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/getSex',
        method: 'get'
    });
	//get请求配置params
};

/* 登陆信息匹配 
export const loginInfo = query => {
	return request({
		url: 'http://127.0.0.1:4523/m1/2794878-0-default/api/login',
		headers:{'Content-Type': 'application/json'},
		method: 'post',
		data: query
	})
}
*/
/**
 * 登陆的方法
 */
export const loginInfo = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/loginInfo',
        method: 'get',
        params: query
    });
	//get请求配置params
};

export const chart1 = () => {
    return request({
        url: 'http://127.0.0.1:4523/m1/2794878-0-default/chart1',
        method: 'get'
    });
	//get请求配置params
};

export const getTasksList = () => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post'
    });
	//get请求配置params
};