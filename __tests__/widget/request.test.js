/**
 * @jest-environment jsdom
 */

// todo 初版写的不好【后续有时间改进】，实际上应该通过jest.fn去mock JSONAPI.get|JSON.post，返回一个Promise，
// 进而去测试JSONAPI的__responseSuccessInterceptor | __responseErrorInterceptor
import {JSONAPI} from '@/widget/request';
import {Message} from 'element-ui';

jest.mock('element-ui', () => ({
    __esModule: true,
    Message: {
        success: jest.fn((message) => {
            expect(message).toBe('message');
        }),
        error: jest.fn((message) => {
            expect(message).toBe('请求失败');
        })
    }
}));

describe('JSONAPI create', () => {
    it('test JSONAPI options', () => {
        const params = {
            a: 1,
            b: '',
            c: null,
            d: undefined,
            e: 0,
            f: false,
            g: true,
            h: NaN
        };
        const transformRequest = JSONAPI.defaults.transformRequest[0];
        const paramsSerializer = JSONAPI.defaults.paramsSerializer;
        expect(JSONAPI.defaults.timeout).toBe(60000);
        expect(JSONAPI.defaults.headers['X-Requested-With']).toBe('XMLHttpRequest');
        expect(JSONAPI.defaults.headers['Content-Type']).toBe('application/json;charset=utf-8');
        expect(transformRequest(params)).toBe("{\"a\":1,\"e\":0,\"f\":false,\"g\":true}");
        expect(paramsSerializer(params)).toBe("a=1&e=0&f=false&g=true");
    });
});

describe('JSONAPI get', () => {
    let successInterceptors;
    let errorInterceptors;
    beforeAll(() => {
        const responseInterceptors = JSONAPI.interceptors.response.handlers[0];
        successInterceptors = responseInterceptors.fulfilled;
        errorInterceptors = responseInterceptors.rejected;
    });
    it('test JSONAPI success 200 interceptors', async() => {
        const successData = {
            code: 200,
            message: 'message'
        };
        const successResp = {data: successData};
        try {
            const res = await successInterceptors(successResp);
            expect(res).toEqual(successData);
            expect(Message.success).toHaveBeenCalled();
        } catch(e) {
            expect(e).toEqual(successData);
        }
    });

    it('test JSONAPI success 400 interceptors', async() => {
        const failData = {
            code: 400,
            message: '请求失败'
        };
        const failResp = {data: failData};
        try {
            const res = await successInterceptors(failResp);
            expect(res).toEqual(failData);
        } catch(e) {
            expect(Message.error).toHaveBeenCalled();
            expect(e).toEqual(failData);
        }
    });

    it('test JSONAPI error interceptors', async() => {
        const errorResp = {
            code: 400,
            message: 'message',
            response: '请求失败'
        };
        try {
            const res = await errorInterceptors(errorResp);
            // 不可能成功,若成功，则以下单测必定失败
            expect(res).toEqual(-1);
        } catch(e) {
            expect(Message.error).toHaveBeenCalled();
            expect(e).toEqual(errorResp);
        }
    });
});