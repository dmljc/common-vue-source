/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from '@vue/test-utils';
import Compose from '@/main';
import DetailHeader from '@/components/detail.header';

let wrapper;
const localVue = createLocalVue();
localVue.use(Compose);
const customMount = options => mount(DetailHeader, Object.assign({localVue}, options));

describe('detail-header default props & data', () => {
    it('detail-header default props & data', () => {
        wrapper = customMount();
        expect(wrapper.element).toMatchSnapshot();
    });
});

describe('detail-header customs props', () => {
    it('detail-header customs props case1', () => {
        wrapper = customMount({
            propsData: {
                header: '标题',
                status: '状态'
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('detail-header customs props case2', () => {
        wrapper = customMount({
            propsData: {
                header: '标题',
                subHeader: '子标题',
                status: '状态'
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });
    it('detail-header customs props case3', () => {
        wrapper = customMount({
            propsData: {
                header: '标题',
                subHeader: '子标题',
                status: '状态'
            },
            slots: {
                operation: '<el-button title="导出" />'
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});