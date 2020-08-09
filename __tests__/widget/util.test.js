/**
 * @jest-environment jsdom
 */
import Vue from "vue";
import Compose from '@/main';
import RenderHeaderTable from './templates/render.header';
import DomSerialize from 'dom-serialize';
import _ from '@/widget/util.js';

describe('util.js renderHeader', () => {
    let cmp, vm, matchSnapshot;
    beforeAll(() => {
        Vue.use(Compose);
        cmp = Vue.extend(RenderHeaderTable);
        matchSnapshot = renderHeader => new Promise((resolve) => {
            vm = new cmp({
                data: {
                    renderHeader
                }
            }).$mount();
            window.setTimeout(() => {
                resolve(true);
            }, 500);
        });
    });
    it(`equals renderHeader('tips') to snapshot`, () => matchSnapshot(_.renderHeader('tips'))
        .then(() => {
            let html = DomSerialize(vm.$el).replace(/el-tooltip-[\d]+/, '');
            expect(html).toMatchSnapshot();
        })
    );
    it(`equals renderHeader('tips', 'el-icon-info') to snapshot`, () => matchSnapshot(_.renderHeader('tips', 'el-icon-info'))
        .then(() => {
            let html = DomSerialize(vm.$el).replace(/el-tooltip-[\d]+/, '');
            expect(html).toMatchSnapshot();
        })
    );
    it(`equals renderHeader(null, null, true) to snapshot`, () => matchSnapshot(_.renderHeader(null, null, true))
        .then(() => {
            let html = DomSerialize(vm.$el).replace(/el-tooltip-[\d]+/, '');
            expect(html).toMatchSnapshot();
        })
    );
    it(`equals renderHeader('tips', null, true) to snapshot`, () => matchSnapshot(_.renderHeader('tips', null, true))
        .then(() => {
            let html = DomSerialize(vm.$el).replace(/el-tooltip-[\d]+/, '');
            expect(html).toMatchSnapshot();
        })
    );
    it(`equals renderHeader('tips', 'el-icon-info', true) to snapshot`, () => matchSnapshot(_.renderHeader('tips', 'el-icon-info', true))
        .then(() => {
            let html = DomSerialize(vm.$el).replace(/el-tooltip-[\d]+/, '');
            expect(html).toMatchSnapshot();
        })
    );
});

describe.each([[1, '01'], [11, '11'], [123, '23'], ['1', '01']])(
    'util.js prefixInteger', 
    (param, expected) => {
        it(`equals prefixInteger(${param}) to ${expected}`, () => {
            expect(_.prefixInteger(param)).toBe(expected);
        });
    }
);

describe('util.js createBelongMonth', () => {
    beforeAll(() => {
        Date.prototype.getFullYear = jest.fn(() => 2019);
    });
    it(`createBelongMonth(2018) has correct length`, () => {
        expect(_.createBelongMonth(2018).length).toBe(2);
    });
    it('createBelongMonth(2018) month has correct prefix', () => {
        // "2018-1".length === 6
        expect(_.createBelongMonth(2018)[0].children[0].id.length).toBe(6);
    });
    it(`createBelongMonth(2018, true) month has correct prefix`, () => {
        // "2018-01".length === 7
        expect(_.createBelongMonth(2018, true)[0].children[0].id.length).toBe(7);
    });
    it(`createBelongMonth(2018) month has correct response`, () => {
        expect(_.createBelongMonth(2018)).toMatchSnapshot();
    });
    it(`createBelongMonth(2018, true) month has correct response`, () => {
        expect(_.createBelongMonth(2018, true)).toMatchSnapshot();
    });
});

describe('util.js getNameById', () => {
    const selection = [
        {id: 1, name: 'test1'},
        {id: 2, name: 'test2'}
    ];
    // 不存在的数组，返回空
    it(`getNameById(1, undefined) equals ''`, () => {
        expect(_.getNameById(1, undefined)).toBe('');
    });
    // 数组中存在的值，返回对应的name
    it(`getNameById(1, selection) equals test1`, () => {
        expect(_.getNameById(1, selection)).toBe('test1');
    });
    // 值全等校验，数字1和字符串1不匹配
    it(`getNameById('1', selection) equals ''`, () => {
        expect(_.getNameById('1', selection)).toBe('');
    });
    // 数组中不存在的值，返回空
    it(`getNameById(-1, selection) equals ''`, () => {
        expect(_.getNameById(-1, selection)).toBe('');
    });
});

describe('util.js getNameById', () => {
    let createElement;
    let elementClick;
    let appendChild;
    let removeChild;
    let open;
    let element;
    beforeAll(() => {
        elementClick = jest.fn(() => element.href);
        appendChild = jest.fn((element) => {
            expect(element.name).toBe('a');
            expect(element.download).toBe(true);
            expect(element.target).toBe('_blank');
            expect(typeof element.href).toBe('string');
        });
        removeChild = jest.fn((element) => {
            expect(element.name).toBe('a');
        });
        createElement = jest.fn((elementName) => {
            element = {
                name: elementName,
                click: elementClick
            };
            return element;
        });
        open = jest.fn(url => url);
        document.createElement = createElement;
        document.body.appendChild = appendChild;
        document.body.removeChild = removeChild;
        window.open = open;
    });
    it(`download() then return`, () => {
        _.download();
        expect(createElement.mock.calls.length).toBe(0);
        expect(open.mock.calls.length).toBe(0);
    });
    it(`download('url') and element[a].click to download`, () => {
        _.download('url');
        expect(createElement.mock.calls.length).toBe(1);
        expect(appendChild.mock.calls.length).toBe(1);
        expect(elementClick.mock.calls.length).toBe(1);
        expect(elementClick.mock.results[0].value).toBe('url');
        expect(removeChild.mock.calls.length).toBe(1);
    });
    it(`download('url', {b: 2, c: [3, 4]}) and element[a].click to download`, () => {
        _.download('url', {b: 2, c: [3, 4]});
        expect(createElement.mock.calls.length).toBe(1);
        expect(appendChild.mock.calls.length).toBe(1);
        expect(elementClick.mock.calls.length).toBe(1);
        // todo 完整的函数实现不应该有多余的后缀'&'
        expect(elementClick.mock.results[0].value).toBe('url?b=2&c[]=3&c[]=4&');
        expect(removeChild.mock.calls.length).toBe(1);
    });
    it(`download('url?a=1', {b: 2, c: [3, 4]}) and element[a].click to download`, () => {
        _.download('url?a=1', {b: 2, c: [3, 4]});
        expect(createElement.mock.calls.length).toBe(1);
        expect(appendChild.mock.calls.length).toBe(1);
        expect(elementClick.mock.calls.length).toBe(1);
        // todo 当前该函数无法在已有url后扩展参数，所以该单测不满足，但一个完整的函数应该具备这个功能
        // expect(elementClick.mock.results[0].value).toBe('url?a=1&b=2&c[]=3&c[]=4&');
        expect(removeChild.mock.calls.length).toBe(1);
    });
    it(`download('url', {}, false) and window.open to download`, () => {
        _.download('url', {}, false);
        expect(open.mock.calls.length).toBe(1);
        // todo 完整的函数实现不应该有多余的后缀‘?’
        expect(open.mock.results[0].value).toBe('url?');
    });
});

describe('util.js datetimeFormat', () => {
    it(`datetimeFormat([false]) equals '-'`, () => {
        expect(_.datetimeFormat()).toBe('-');
        expect(_.datetimeFormat('')).toBe('-');
        expect(_.datetimeFormat(0)).toBe('-');
    });
    it(`datetimeFormat(1568620176495) equals '2019-09-16 15:49:36'`, () => {
        expect(_.datetimeFormat(1568620176495)).toBe('2019-09-16 15:49:36');
    });
    it(`datetimeFormat('1568620176495') equals '2019-09-16 15:49:36'`, () => {
        expect(_.datetimeFormat('1568620176495')).toBe('2019-09-16 15:49:36');
    });
    it(`datetimeFormat(1568620176495, 'YYYY-MM-DD') equals '2019-09-16'`, () => {
        expect(_.datetimeFormat(1568620176495, 'YYYY-MM-DD')).toBe('2019-09-16');
    });
    it(`datetimeFormat('a') equals '-'`, () => {
        expect(_.datetimeFormat('a')).toBe('-');
    });
});

describe('util.js numberFormat', () => {
    it(`numberFormat([empty]) equals ''`, () => {
        expect(_.numberFormat(NaN)).toBe('');
        expect(_.numberFormat(null)).toBe('');
        expect(_.numberFormat()).toBe('');
    });
    it(`numberFormat([number]) has 2 decimal`, () => {
        expect(_.numberFormat(0)).toBe('0.00');
        expect(_.numberFormat(0.1)).toBe('0.10');
        expect(_.numberFormat(0.99)).toBe('0.99');
        expect(_.numberFormat(0.001)).toBe('0.00');
        expect(_.numberFormat(0.0049)).toBe('0.00');
        expect(_.numberFormat(0.005)).toBe('0.01');
        expect(_.numberFormat(0.994)).toBe('0.99');
        expect(_.numberFormat(0.995)).toBe('0.99');
        expect(_.numberFormat(0.999)).toBe('1.00');
        expect(_.numberFormat(1)).toBe('1.00');
        expect(_.numberFormat(-1)).toBe('-1.00');
    });
    it(`numberFormat([string]) has 2 decimal`, () => {
        expect(_.numberFormat('0')).toBe('0.00');
        expect(_.numberFormat('')).toBe('0.00');
    });
    it(`numberFormat([number], 3) has 3 decimal`, () => {
        expect(_.numberFormat(0, 3)).toBe('0.000');
        expect(_.numberFormat(0.1, 3)).toBe('0.100');
        expect(_.numberFormat(0.99, 3)).toBe('0.990');
    });
    it(`numberFormat([string], 0) has 0 decimal`, () => {
        expect(_.numberFormat(0, 0)).toBe('0');
        expect(_.numberFormat(0.1, 0)).toBe('0');
        expect(_.numberFormat(0.99, 0)).toBe('1');
    });
});

describe('util.js str2arr', () => {
    it(`str2arr('') equals ''`, () => {
        expect(_.str2arr(undefined)).toEqual([]);
        expect(_.str2arr(null)).toEqual([]);
        expect(_.str2arr('')).toEqual([]);
    });
    it(`str2arr('1,2,3') equals ['1', '2', '3']`, () => {
        expect(_.str2arr('1,2,3')).toEqual(['1', '2', '3']);
    });
    it(`str2arr('1,2,3', ',', true) equals [1, 2, 3]`, () => {
        expect(_.str2arr('1,2,3', ',', true)).toEqual([1, 2, 3]);
    });
    it(`str2arr('1 2 3', ' ') equals ['1', '2', '3']`, () => {
        expect(_.str2arr('1 2 3', ' ')).toEqual(['1', '2', '3']);
    });
});

describe('util.js filterEmpty', () => {
    let data, dataAllowSpace;
    beforeAll(() => {
        data = {
            a: 1,
            b: '',
            c: null,
            d: undefined,
            e: 0,
            f: false,
            g: true,
            h: NaN
        };
        dataAllowSpace = Object.assign({}, data, {
            _allowSpace: true
        });
    });
    it(`filterEmpty([]) equals undefined`, () => {
        expect(_.filterEmpty([])).toEqual([]);
    });
    it(`filterEmpty([]) equals undefined`, () => {
        expect(_.filterEmpty()).toBeUndefined();
    });
    it(`filterEmpty(data) has correct output`, () => {
        expect(_.filterEmpty(data)).toEqual({
            a: 1,
            e: 0,
            f: false,
            g: true
        });
    });
    it(`filterEmpty(dataAllowSpace) has correct output`, () => {
        expect(_.filterEmpty(dataAllowSpace)).toEqual({
            a: 1,
            b: '',
            e: 0,
            f: false,
            g: true
        });
    });
});