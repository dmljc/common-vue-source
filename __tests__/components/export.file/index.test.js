/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from '@vue/test-utils';
import Compose from '@/main';
import ExportFile from '@/components/export.file';

let customMount;
beforeAll(() => {
    const localVue = createLocalVue();
    localVue.use(Compose);
    customMount = options => mount(ExportFile, Object.assign({localVue}, options));
});

describe('export-file default props & data', () => {
    it('export-file default props & data', () => {
        const wrapper = customMount();
        window.setTimeout(() => {
            expect(wrapper.props('type')).toBe('confirm');
            expect(wrapper.vm.range).toBe(1);
            expect(wrapper.element).toMatchSnapshot();
        }, 10);
    });
});

describe('export-file customs props', () => {
    it('export-file has correct custom props behavior', () => {
        const wrapper = customMount({
            propsData: {
                title: '报表导出',
                type: 'rangeCheck',
                visible: true
            }
        });
        window.setTimeout(() => {
            expect(wrapper.element).toMatchSnapshot();
        }, 10);
    });
});

describe('export-file methods', () => {
    it('method[export] has correct behavior', (done) => {
        const wrapper = customMount({
            propsData: {
                visible: true
            },
            listeners: {
                export: (e) => {
                    expect(e.range).toBe(1);
                },
                close: () => {
                    done();
                }
            }
        });
        const buttons = wrapper.findAll('button').filter(b => b.text() === '确认导出');
        buttons.at(0).trigger('click');
        expect(wrapper.element).toMatchSnapshot();
    });
});
