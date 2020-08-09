<template>
    <div>
        <el-button type="primary" @click="visible=true">操作日志</el-button>
        <operation-log-dialog :visible.sync="visible" :list="list"></operation-log-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            list: [
                { author: '张三', date: '昨天 11:23', content: '创建了审批单' },
                { author: '张三', date: '1552982197232', content: '主管审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '供应链审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: 'ok' },
                {
                    author: '张三',
                    date: '15年8月11日 11:23',
                    content: '总裁审批：批准',
                    remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好'
                },
                { author: '张三', date: '昨天 11:23', content: '创建了审批单' },
                { author: '张三', date: '8月11日 11:23', content: '主管审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '供应链审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: 'ok' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: '我觉得很好' },
                { author: '张三', date: '昨天 11:23', content: '创建了审批单' },
                { author: '张三', date: '8月11日 11:23', content: '主管审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '供应链审批：批准' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: 'ok' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: '我觉得很好' },
                { author: '张三', date: '15年8月11日 11:23', content: '总裁审批：批准', remark: '我觉得很好' }
            ]
        };
    }
}
</script>