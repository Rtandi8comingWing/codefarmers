import request from '../utils/request';

export const addTask = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/addtask',
        method: 'post',
        data : query
    });
    //新增一项任务
};

export const getTodoList = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
	//get请求配置params
};
export const getDoneList = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
	//get请求配置params
};


export const completeTask = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/completeTask',
        method: 'post',
        data : query
    });
    //点击checkbox任务状态转为完成
};

export const uncompleteTask = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //点击checkbox任务状态转为未完成
};


