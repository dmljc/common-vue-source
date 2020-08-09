/**
 * @jest-environment jsdom
 */
import Vue from 'vue';
import Compose from '@/main';
import ExportTest from './templates/export';
import { JSONAPI } from '@/widget/request';

jest.mock('@/widget/request', () => {
    const fn = url => new Promise((resolve, reject) => {
        if(url === '/api/1') {
            resolve({
                code: 200,
                data: {
                    resultUrl: 'resultUrl'
                }
            });
        }else if(url === '/api/2') {
            resolve({
                code: 200,
                result: {
                    resultUrl: 'resultUrl'
                }
            });
        }else if(url === '/api/3') {
            resolve({
                code: 200,
                result: {
                    url: 'url'
                }
            });
        }else if(url === '/api/4') {
            resolve({
                code: 200
            });
        }else if(url === '/api/5') {
            reject({
                code: 400
            });
        }
    });
    return {
        __esModule: true,
        JSONAPI: {
            get: jest.fn(fn),
            post: jest.fn(fn)
        }
    };
});

let vm, cmp;
beforeAll(() => {
    Vue.use(Compose);
    cmp = Vue.extend(ExportTest);
    vm = new cmp().$mount();

    window.open = jest.fn(url => url);
    vm.$message.success = jest.fn();
    vm.$message.error = jest.fn();
});
describe('compose $export api', () => {
    it('$export has correct behavior', async() => {
        await vm.$export('/api/1');
        // $export should call JSONAPI.get to send api
        expect(JSONAPI.get.mock.calls.length).toBe(1);
        // JSONAPI should have correct key: params
        expect(JSONAPI.get.mock.calls[0][1].hasOwnProperty('params')).toBe(true);
        // window.open sholud be called
        expect(window.open.mock.calls.length).toBe(1);
        // window.open should have correct params
        expect(window.open.mock.calls[0][0]).toBe('resultUrl');
        expect(window.open.mock.calls[0][1]).toBe('_self');
        // this.$message.success should be called
        expect(vm.$message.success.mock.calls.length).toBe(1);
    });
    it('$export has correct behavior', async() => {
        await vm.$export('/api/2');
        expect(window.open.mock.calls[0][0]).toBe('resultUrl');
    });
    it('$export has correct behavior', async() => {
        await vm.$export('/api/3');
        expect(window.open.mock.calls[0][0]).toBe('url');
    });
    it('$export has correct behavior', async() => {
        await vm.$export('/api/4');
        expect(window.open.mock.calls[0][0]).toBeUndefined();
    });
    it('$export has correct behavior', async() => {
        console.log = jest.fn();
        await vm.$export('/api/5');
    });
});

describe('compose $postExport api', () => {
    it('$postExport has correct behavior', async() => {
        await vm.$postExport('/api/1');
        // $export should call JSONAPI.post to send api
        expect(JSONAPI.post.mock.calls.length).toBe(1);
        // window.open sholud be called
        expect(window.open.mock.calls.length).toBe(1);
        // window.open should have correct params
        expect(window.open.mock.calls[0][0]).toBe('resultUrl');
        expect(window.open.mock.calls[0][1]).toBe('_self');
        // this.$message.success should be called
        expect(vm.$message.success.mock.calls.length).toBe(1);
    });
    it('$postExport has correct behavior', async() => {
        await vm.$postExport('/api/2');
        expect(window.open.mock.calls[0][0]).toBe('resultUrl');
    });
    it('$postExport has correct behavior', async() => {
        await vm.$postExport('/api/3');
        expect(window.open.mock.calls[0][0]).toBe('url');
    });
    it('$export has correct behavior', async() => {
        await vm.$postExport('/api/4');
        expect(window.open.mock.calls[0][0]).toBeUndefined();
    });
    it('$export has correct behavior', async() => {
        console.log = jest.fn();
        await vm.$postExport('/api/5');
    });
});

describe('compose $exportByEmail api', () => {
    it('$exportByEmail has correct behavior', async() => {
        await vm.$exportByEmail('/api/1');
        // $export should call JSONAPI.post to send api
        expect(JSONAPI.get.mock.calls.length).toBe(1);
        // JSONAPI should have correct key: params
        expect(JSONAPI.get.mock.calls[0][1].hasOwnProperty('params')).toBe(true);
        // this.$message.success should be called
        expect(vm.$message.success.mock.calls.length).toBe(1);
    });
    it('$exportByEmail has correct behavior', async() => {
        console.log = jest.fn();
        await vm.$exportByEmail('/api/5');
    });
});

describe('compose $postExportByEmail api', () => {
    it('$postExportByEmail has correct behavior', async() => {
        await vm.$postExportByEmail('/api/1');
        // $export should call JSONAPI.post to send api
        expect(JSONAPI.post.mock.calls.length).toBe(1);
        // this.$message.success should be called
        expect(vm.$message.success.mock.calls.length).toBe(1);
    });
    it('$postExportByEmail has correct behavior', async() => {
        console.log = jest.fn();
        await vm.$postExportByEmail('/api/5');
    });
});

describe('compose $scrollToView api', () => {
    let scroll;
    beforeAll(() => {
        scroll = jest.fn();
        document.getElementById = jest.fn(() => ({
            offsetTop: 100,
            scroll
        }));
        vm.$nextTick = jest.fn(fn => fn());
    });
    it('$scrollToView has correct behavior', () => {
        vm.$scrollToView('el');
        expect(vm.$nextTick).toBeCalled();
        expect(scroll).toBeCalledWith(0, 100-56);
    });
    it('$scrollToView has correct behavior', () => {
        vm.$scrollToView('el', 10);
        expect(scroll).toBeCalledWith(0, 100-10);
    });
    it('$scrollToView has correct behavior', () => {
        vm.$scrollToView({offsetTop: 200}, 10);
        expect(scroll).toBeCalledWith(0, 200-10);
    });
});

describe('compose $baiduGcApi api', () => {
    it('$baiduGcApi has correct behavior', async() => {
        vm.$jsonp = jest.fn(() => new Promise((resolve) => {
            resolve({status: 0});
        }));
        const callback = jest.fn();
        await vm.$baiduGcApi(callback);
        expect(vm.$jsonp.mock.calls.length).toBe(1);
        expect(vm.$jsonp.mock.calls[0][0]).toBe('https://api.map.baidu.com/geocoder/v2/');
        const params = vm.$jsonp.mock.calls[0][1];
        expect(params.ak).toBe('T4rCPEKnCXE9rrslhXHs98p0129116iq');
        expect(params.address).toBe('');
        expect(params.output).toBe('json');
        expect(callback).toBeCalled();
    });

    it('$baiduGcApi has correct behavior', async() => {
        vm.$jsonp = jest.fn(() => new Promise((resolve) => {
            resolve({status: -1});
        }));
        const callback = jest.fn();
        await vm.$baiduGcApi(callback);
        expect(vm.$message.error).toBeCalled();
    });

    it('$baiduGcApi has correct behavior', async() => {
        vm.$jsonp = jest.fn(() => new Promise((resolve) => {
            resolve({status: 0});
        }));
        const callback = jest.fn();
        await vm.$baiduGcApi('address', callback);
        const params = vm.$jsonp.mock.calls[0][1];
        expect(params.address).toBe('address');
        expect(callback).toBeCalled();
    });

    it('$baiduGcApi has correct behavior', async() => {
        vm.$jsonp = jest.fn(() => new Promise((resolve, reject) => {
            reject('error');
        }));
        const callback = jest.fn();
        console.error = jest.fn();
        await vm.$baiduGcApi('address', callback);
    });
});
