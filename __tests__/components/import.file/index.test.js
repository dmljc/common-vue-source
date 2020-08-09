/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from '@vue/test-utils';
import Compose from '@/main';
import ImportFile from '@/components/import.file';
import { JSONAPI } from '@/widget/request';

jest.mock('@/widget/request', () => {
    const resolveResult = jest.fn();
    resolveResult.mockReturnValueOnce({
        code: 200,
        data: {
            data: 'url1'
        }
    }).mockReturnValueOnce({
        code: 200,
        data: {
            resultUrl: 'url2'
        }
    }).mockReturnValueOnce({
        code: 200,
        data: {
            url: 'url3'
        }
    }).mockReturnValueOnce({
        code: 200,
        result: {
            data: 'url4'
        }
    }).mockReturnValueOnce({
        code: 200,
        result: {
            resultUrl: 'url5'
        }
    }).mockReturnValueOnce({
        code: 200,
        result: {
            url: 'url6'
        }
    }).mockReturnValueOnce({
        code: 200,
        result: {}
    }).mockReturnValueOnce({
        code: 200
    });

    const fn = () => new Promise((resolve) => {
        resolve(resolveResult());
    });
    return {
        __esModule: true,
        JSONAPI: {
            get: jest.fn(fn),
            post: jest.fn(fn)
        }
    };
});

let customMount;
beforeAll(() => {
    const localVue = createLocalVue();
    localVue.use(Compose);
    customMount = options => mount(ImportFile, Object.assign({ localVue }, options));
});

describe('import-file default props & data', () => {
    it('import-file default props & data', (done) => {
        const wrapper = customMount();
        window.setTimeout(() => {
            expect(wrapper.props('extraData')).toEqual({});
            expect(wrapper.props('onLoadInterceptor')({ code: 200 })).toEqual({ code: 200 });
            expect(wrapper.props('downloadAsync')).toBe(false);
            expect(wrapper.props('onSuccessCb')).toBe(null);
            expect(wrapper.vm.status).toBe('init');
            expect(wrapper.vm.uploadingPercent).toBe(0);
            expect(wrapper.vm.uploadingInterval).toBe('');
            expect(wrapper.vm.resultMessage).toBe('');
            expect(wrapper.vm.resultUrl).toBe('');
            expect(wrapper.vm.files).toEqual([]);
            expect(wrapper.element).toMatchSnapshot();
            done();
        }, 10);
    });
});

describe('import-file customs props', () => {
    it('import-file has correct custom props behavior', (done) => {
        const wrapper = customMount({
            propsData: {
                title: '报表导入',
                accept: '.xlsx,.xls,.img',
                extraData: { flag: 1 },
                templateUrl: '/test/templateUrl',
                importUrl: '/test/importUrl',
                visible: true,
                onLoadInterceptor: () => ({ code: 200 }),
                downloadAsync: true
            }
        });
        window.setTimeout(() => {
            expect(wrapper.element).toMatchSnapshot();
            done();
        }, 10);
    });
});

describe('import-file methods', () => {
    it('method[downloadTemplate] has correct behavior -[downloadAsync]', (done) => {
        const wrapper = customMount({
            propsData: {
                templateUrl: '/test/templateUrl',
                visible: true,
                downloadAsync: true
            }
        });
        window.open = jest.fn();
        window.setTimeout(async () => {
            // 测试按钮下载后端返回的六种结果分支
            const downloadBtn = wrapper.find('.import-init__download');
            await downloadBtn.trigger('click');
            expect(JSONAPI.get).toBeCalledWith('/test/templateUrl');
            expect(window.open).toBeCalledWith('url1', '_self');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('url2', '_self');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('url3', '_self');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('url4', '_self');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('url5', '_self');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('url6', '_self');
            window.open.mockClear();
            await downloadBtn.trigger('click');
            expect(window.open.mock.calls.length).toBe(0);
            await downloadBtn.trigger('click');
            expect(window.open.mock.calls.length).toBe(0);
            done();
        }, 10);
    });

    it('method[downloadTemplate] has correct behavior -[downloadSync]', (done) => {
        const wrapper = customMount({
            propsData: {
                templateUrl: '/test/templateUrl',
                visible: true,
                downloadAsync: false
            }
        });
        window.open = jest.fn();
        window.setTimeout(async () => {
            const downloadBtn = wrapper.find('.import-init__download');
            await downloadBtn.trigger('click');
            expect(window.open).toBeCalledWith('/test/templateUrl', '_self');
            done();
        }, 10);
    });

    it('method[createFormData] has correct behavior', (done) => {
        const wrapper = customMount({
            propsData: {
                extraData: {a: 'x'}
            }
        });
        window.setTimeout(() => {
            wrapper.vm.files = ['file1', 'file2'];
            const data = wrapper.vm.createFormData();
            expect(data.getAll('file')[0]).toBe('file1');
            expect(data.getAll('file')[1]).toBe('file2');
            expect(data.get('a')).toBe('x');
            done();
        }, 10);
    });
});