import moment from 'moment';

//表头tooltip
const renderHeader = (content, icon, required) => {
    required = required || false;
    const style = {
        padding: '11px 0',
        lineHeight: '14px'
    };
    const requiredStyle = {
        color: '#f00'
    };
    if(!content) {
        return (h, {column}) => (
            <span style={style}>
                {required && <i style={requiredStyle}>*&nbsp;</i>}
                {column.label}
            </span>
        );
    }
    if(icon) {
        return (h, {column}) => {
            style.display = 'inline';
            style.marginLeft = '5px';
            return (<span>
                {required && <i style={requiredStyle}>*&nbsp;</i>}
                {column.label}
                <el-tooltip content={content} placement="top" effect="dark">
                    <i class={icon} style={style}></i>
                </el-tooltip>
            </span>);
        };
    }
    return (h, {column}) => (<span>
        <el-tooltip content={content} placement="top" effect="dark">
            <span style={style}>
                {required && <i style={requiredStyle}>*&nbsp;</i>}
                {column.label}
            </span>
        </el-tooltip>
    </span>);
};


const prefixInteger = (num, length = 2) => (Array(length).join('0') + num).slice(-length);

const createBelongMonth = (start, prefixMonth = false) => {
    start = start || 2014;
    let year = new Date().getFullYear();
    let source = [];
    for (let index = start; index <= year; index++) {
        let month = [];
        for (let jndex = 1; jndex <= 12; jndex++) {
            month.push({
                id: `${index}-${prefixMonth ? prefixInteger(jndex, 2) : jndex}`,
                name: `${jndex}月`
            });
        }
        source.push({
            id: index,
            name: `${index}年`,
            children: month
        });
    }
    return source;
};

const getNameById = (id, selection) => {
    const result = (selection || []).find(item => item.id === id);
    return (result && result.name) || '';
};

const download = (url, params, isImage = true) => {
    if (!url) {
        return;
    }
    if (params) {
        url += '?';
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                if (Array.isArray(params[param])) {
                    /* eslint-disable no-loop-func */
                    params[param].forEach(el => url += `${param}[]=${el}&`);
                    /* eslint-enable no-loop-func */
                } else if (params[param] != undefined) {
                    url += `${param}=${params[param]}&`;
                }
            }
        }
    }
    if (isImage) {
        const a = document.createElement('a');
        a.href = url;
        a.download = true;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        window.open(url);
    }
};

const datetimeFormat = (timestamp, format='YYYY-MM-DD HH:mm:ss') => {
    const placeholder = '-';
    if (!timestamp) {
        return placeholder;
    }
    const date = new Date(+timestamp);
    const obj = moment(date);
    if (obj.isValid()) {
        return obj.format(format);
    }
    return placeholder;
};

const numberFormat = (_val, _keep) => {
    if (isNaN(_val) || _val == null || _val == undefined) {
        return '';
    }

    if (isNaN(_keep)) {
        _keep = 2;
    }

    _val /= 1;
    _val = `${_val.toFixed(_keep)}`; // 保留两位小数

    _val = _val.replace(/^(\d+)((\.\d+)?)$/, (v1, v2, v3) => v2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (v3 || ''));
    return _val;
};

const str2arr = (str, split=',', parse=false) => {
    const arr = str ? str.split(split) : [];
    if(parse){
        return arr.map(value => parseInt(value, 10));
    }
    return arr;
};
/* 过滤undefined, null等无效值，可选过滤'' */
const filterEmpty = (data) => {
    if (data) {
        if (data instanceof Array) {
            return data;
        }
        const rst = {};
        Object.keys(data).forEach((key) => {
            if(key == '_allowSpace') {
                return;
            }
            if(!data[key] && data[key] !== 0 && data[key] !== false) {
                if(data._allowSpace && data[key] === ''){
                    rst[key] = data[key];
                }
                return;
            }
            rst[key] = data[key];
        });
        return rst;
    }
};

const getCascaderNames = (ids, source, deepEqual) => {
    deepEqual = deepEqual || true;
    if(typeof ids === 'string') {
        ids = str2arr(ids, ',', true);
    }
    if (!ids || !ids.length) {
        return '--';
    }
    if (!source || !source.length) {
        return '--';
    }
    let nameArr = [];
    let target = source;
    ids.reduce((result, id) => {
        const item = target.find((item) => {
            if(deepEqual) {
                return item.id === id;
            }
            return item.id == id;
        });
        if(!item) {
            target = [];
            return result;
        }
        target = item.children || [];
        result.push(item.name);
        return result;
    }, nameArr);

    return nameArr.join('/');
};

const blankToComma = (value) => {
    if(!value && value !== 0){
        return '';
    }
    return value.trim().replace(/[ \n\t]+/g, ',')
        .replace(/[,，]+/g, ',').replace(/^[,，]/g, '').replace(/[,，]$/g, '');
};


export default {
    prefixInteger,
    renderHeader,
    createBelongMonth,
    getNameById,
    download,
    datetimeFormat,
    numberFormat,
    str2arr,
    filterEmpty,
    getCascaderNames,
    blankToComma
};