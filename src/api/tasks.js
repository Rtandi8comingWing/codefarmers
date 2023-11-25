import request from '../utils/request';

export const addTask = query => {
    return request({
        url: 'http://10.69.206.242/api/tasks',
        method: 'post',
        data : query
    });
    //新增一项任务
};

export const login = query => {
    return request({
        url: 'http://10.69.206.242/api/users/login',
        method: 'post',
        data : {
            username: "Alchemyhan",
            password: "hpl20040706hpl"
        }
    });
    //获取已完成任务
};

export const getTodoList =() => {
    return request({
        url: 'http://10.69.206.242/api/tasks?mode=incomplete',
        method: 'get',
    });
    //获取未完成任务
};
export const getDoneList = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //获取已完成任务
};
export const getImportantList = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //获取重要任务
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

export const addimpotant = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //从drawer中将未完成任务添加未已完成任务
};

export const deleteTask = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //删除一项任务 传入任务id
};

export const updateTaskInfo = query => {
    return request({
        url: 'http://127.0.0.1:4523/m1/3645045-0-default/user/tasks',
        method: 'post',
        data : query
    });
    //更新任务信息 传入更改后的jason数据
};
