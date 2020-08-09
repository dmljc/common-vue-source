import axios from 'axios';
import qs from 'qs';
import _ from '@/widget/util';
import { Message } from 'element-ui';

const JSONAPI = axios.create({
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8'
    },
    transformRequest: [function(data) {
        return JSON.stringify(_.filterEmpty(data));
    }],
    paramsSerializer(params) {
        return qs.stringify(_.filterEmpty(params));
    }
});

function __responseSuccessInterceptor(response) {
    const data = response.data;
    if (data && data.code >= 200 && data.code < 400) {
        data.message && Message.success(data.message);
        return Promise.resolve(data);
    }

    data.message && Message.error(data.message);
    return Promise.reject(data);
}

function __responseErrorInterceptor(error) {
    if (error.response) {
        Message.error('请求失败');
    }
    return Promise.reject(error);
}

JSONAPI.interceptors.response.use(__responseSuccessInterceptor, __responseErrorInterceptor);

export {
    JSONAPI
};
