/* eslint-disable arrow-body-style */
import moment from 'moment';
import Util from '@/widget/util';

const date = (timestamp, format='YYYY-MM-DD') => Util.datetimeFormat(timestamp, format);

const datetime = (timestamp, format='YYYY-MM-DD HH:mm:ss') => Util.datetimeFormat(timestamp, format);

const number = (value, keep) => Util.numberFormat(value, keep);

const selectionName = (value, selection) => Util.getNameById(value, selection);

/**托盘尺寸展示
 * 
 * @param {Array} traySizeList
 * @returns {String}
 * 
 */
const lsTraySizeStr = (traySizeList) => {
    if (!traySizeList || !traySizeList.length) {
        return '--';
    }
    let str = traySizeList.reduce((total, item, index) => {
        return total += `${index === 0 ? '' : ','} ${item.length}cm * ${item.width}cm * ${item.height}cm * ${item.count}`;
    }, '');
    return str || '';
};

/**柜型展示
 * 
 * @param {Array} containerTypeList 
 * @returns {String}
 * 
 */
const lsContainerTypeStr = (containerTypeList) => {
    if (!containerTypeList) {
        return '';
    }
    let str = containerTypeList.reduce((cal, cur, index) => {
        return cal += `${index === 0 ? '' : ', '}${cur.value}*${cur.name}`;
    }, '');
    return str || '';
};

/**多个id转str
 * 
 * @param {Array | String} idList 
 * @returns {String}
 * 
 */
const lsSelectionNames = (idList, source) => {
    if(typeof idList === 'string') {
        idList = Util.str2arr(idList, ',', true);
    }
    if (!idList || !idList.length) {
        return '--';
    }
    return idList.map(item => Util.getNameById(item, source)).join(', ');
};

/**毫秒值转时间格式
 * 
 * @param {Number} second 
 * @returns {String}
 * 
 */
const lsSecondStr = (second) => {
    const result = moment.duration(second, 'seconds');
    return `${Util.prefixInteger(result.hours())}:${Util.prefixInteger(result.minutes())}:${Util.prefixInteger(result.seconds())}`;
};

/** 把 级联 的 id 过滤为相应地 name
 * 
 * @param {Array} ids 
 * @returns {String}
 * 
 */
const lsCascaderNames = (ids, source, deepEqual) => Util.getCascaderNames(ids, source, deepEqual);

export default {
    install(Vue) {
        // 通用的过滤器
        Vue.filter('date', date);
        Vue.filter('datetime', datetime);
        Vue.filter('number', number);
        Vue.filter('selectionName', selectionName);
        
        // 物流过滤器全部以ls开头，防止全局注册冲突
        Vue.filter('lsTraySizeStr', lsTraySizeStr);
        Vue.filter('lsContainerTypeStr', lsContainerTypeStr);
        Vue.filter('lsSelectionNames', lsSelectionNames);
        Vue.filter('lsSecondStr', lsSecondStr);
        Vue.filter('lsCascaderNames', lsCascaderNames);
    }
};