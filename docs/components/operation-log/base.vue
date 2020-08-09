<template>
    <el-card header="操作日志">
        <operation-log :list="list"></operation-log>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
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
};
</script>
