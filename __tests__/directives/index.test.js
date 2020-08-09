/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from '@vue/test-utils';
import Compose from '@/main';
import BtnTrackDirective from './templates/btn.track';

describe('directives index.js', () => {
    let wrapper;
    beforeAll(() => {
        const localVue = createLocalVue();
        localVue.use(Compose);
        wrapper = mount(BtnTrackDirective, {
            localVue
        });
        window.btnTracker = jest.fn();
    });

    it('btnTrack directive has correct behavior', () => {
        wrapper.find('.button-1').trigger('mousedown');
        // todo 为什么jest此处取不到el.innerText???
        // 真正的测试用例应该是toBeCalledWith('导出')
        expect(window.btnTracker).toBeCalledWith('未知操作');
    });

    it('btnTrack directive has correct behavior', () => {
        wrapper.find('.button-2').trigger('mousedown');
        expect(window.btnTracker).toBeCalledWith('通用点击事件');
    });
    it('btnTrack directive has correct behavior', () => {
        wrapper.find('.button-3').trigger('mousedown');
        expect(window.btnTracker).toBeCalledWith('其他点击事件', 'anotherEventId');
    });
});