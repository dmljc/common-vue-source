/**
 * @jest-environment jsdom
 */
import Vue from "vue";
import Compose from '@/main';
import TraySizeFilter from './templates/tray.size';
import ContainerTypeFilter from './templates/container.type';
import SelectionNamesFilter from './templates/selection.names';
import SecondStrFilter from './templates/second.str';
import CascaderNamesFilter from './templates/cascader.names';

beforeAll(() => {
    Vue.use(Compose);
});
describe('filter.js lsTraySizeStr', () => {
    let cmp, vm;
    beforeAll(() => {
        cmp = Vue.extend(TraySizeFilter);
        vm = new cmp({
            data: {}
        }).$mount();
    });
    it('equals lsTraySizeStr to snapshot', () => {
        expect(vm.$el).toMatchSnapshot();
    });
});

describe('filter.js containerTypeList', () => {
    let cmp, vm;
    beforeAll(() => {
        cmp = Vue.extend(ContainerTypeFilter);
        vm = new cmp({
            data: {}
        }).$mount();
    });
    it('equals containerTypeFilter to snapshot', () => {
        expect(vm.$el).toMatchSnapshot();
    });
});

describe('filter.js selectionNames', () => {
    let cmp, vm;
    beforeAll(() => {
        cmp = Vue.extend(SelectionNamesFilter);
        vm = new cmp({
            data: {}
        }).$mount();
    });
    it('equals selectionNamesFilter to snapshot', () => {
        expect(vm.$el).toMatchSnapshot();
    });
});

describe('filter.js SecondStrFilter', () => {
    let cmp, vm;
    beforeAll(() => {
        cmp = Vue.extend(SecondStrFilter);
        vm = new cmp({
            data: {}
        }).$mount();
    });
    it('equals SecondStrFilter to snapshot', () => {
        expect(vm.$el).toMatchSnapshot();
    });
});

describe('filter.js CascaderNamesFilter', () => {
    let cmp, vm;
    beforeAll(() => {
        cmp = Vue.extend(CascaderNamesFilter);
        vm = new cmp({
            data: {}
        }).$mount();
    });
    it('equals CascaderNamesFilter to snapshot', () => {
        expect(vm.$el).toMatchSnapshot();
    });
});