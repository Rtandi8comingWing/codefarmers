import request from '../utils/request';

export const addTask = query => {
    return request({
        url: '/api/tasks',
        method: 'post',
        data : query
    });
    //新增一项任务
};

export const login = query => {
    return request({
        url: '/api/users/login',
        method: 'post',
        data : {
            username: "Alchemyhan",
            password: "hpl20040706hpl"
        }
    });
    //获取已完成任务
};

export const getTodoList = () => {
    return request({
        url: '/api/tasks?mode=incomplete',
        method: 'get',
    });
    //获取未完成任务
};
export const getDoneList = () => {
    return request({
        url: '/api/tasks?mode=completed',
        method: 'get',
    });
    //获取已完成任务
};
export const getImportantList = () => {
    return request({
        url: '/api/tasks?mode=important',
        method: 'get',
    });
    //获取重要任务
};
export const getNormalList = () => {
    return request({
        url: '/api/tasks?mode=normal',
        method: 'get',
    });
    //获取普通任务
}

export const completeTask = query => {
    return request({
        url: '/api/tasks/' + query + '/complete?status=true',
        method: 'get',
    });
    //点击checkbox任务状态转为完成
};

export const uncompleteTask = query => {
    return request({
        url: '/api/tasks/' + query + '/complete?status=false',
        method: 'get',
    });
    //点击checkbox任务状态转为未完成
};

export const addimpotant = query => {
    return request({
        url: '/api/tasks/'+ query + '/important?status=true',
        method: 'get',
    });
    //从drawer中将未完成任务添加未已完成任务
};

export const deleteTask = query => {
    return request({
        url: 'http://10.69.206.242/api/tasks/' + query.taskId,
        method: 'delete',
        data : query
    });
    //删除一项任务 传入任务id
};

export const updateTaskInfo = query => {
    return request({
        url: '/api/tasks/' + query.taskId,
        method: 'put',
        data : query
    });
    //更新任务信息 传入更改后的jason数据
};
