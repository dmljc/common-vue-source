<template>
    <div>
        <!-- 测试各种idList -->
        <span>{{'' | lsSelectionNames(source4)}}</span>
        <span>{{'1,2' | lsSelectionNames(source4)}}</span>
        <span>{{[] | lsSelectionNames(source4)}}</span>
        <span>{{[1, 2] | lsSelectionNames(source4)}}</span>

        <!-- 测试各种数据源 -->
        <span>{{'1,2' | lsSelectionNames(source1)}}</span>
        <span>{{'1,2' | lsSelectionNames(source2)}}</span>
        <span>{{'1,2' | lsSelectionNames(source3)}}</span>

        <!-- 测试id在数据源中不存在 -->
        <span>{{'1,4,5,2' | lsSelectionNames(source4)}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            source1: undefined,
            source2: null,
            source3: [],
            source4: [
                {id: 1, name: '中国'},
                {id: 2, name: '美国'},
                {id: 3, name: '巴西'}
            ]
        };
    },
};
</script>