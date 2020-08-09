/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from '@vue/test-utils';
import Compose from '@/main';
import ControlButton from '@/components/control.button';

let customMount;
beforeAll(() => {
    const localVue = createLocalVue();
    localVue.use(Compose);
    customMount = options => mount(ControlButton, Object.assign({localVue}, options));
});

describe('control-button base usage', () => {
    it('control-button matchs snapshot case1', () => {
        const wrapper = customMount({
            slots: {
                default: '导出'
            }
        });
        expect(wrapper.props('type')).toBe('default');
        expect(wrapper.props('size')).toBe(undefined);
        expect(wrapper.props('icon')).toBe('');
        expect(wrapper.props('nativeType')).toBe('button');
        expect(wrapper.props('disabled')).toBe(false);
        expect(wrapper.props('plain')).toBe(false);
        expect(wrapper.props('autofocus')).toBe(false);
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
    });
});

describe('control-button advanced usage', () => {
    it('control-button matchs snapshot case2', () => {
        const wrapper = customMount({
            slots: {
                default: '导出'
            },
            propsData: {
                type: 'text',
                size: 'small',
                icon: 'el-icon-info',
                plain: true,
                autofocus: true,
                nativeType: 'submit'
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});

describe('control-button loading function', () => {
    it('control-button loading function', (done) => {
        const wrapper = customMount({
            slots: {
                default: '导出'
            },
            listeners: {
                click: (e) => {
                    expect(wrapper.vm.loading).toBe(true);
                    e.resolve();
                    expect(wrapper.vm.loading).toBe(false);
                    done();
                }
            }
        });
        wrapper.trigger('click');
    });
});
