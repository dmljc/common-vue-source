<template>
    <div>
        <!-- 测试各种idList -->
        <span>{{[1, 11] | lsCascaderNames(source4)}}</span>
        <span>{{'1,11' | lsCascaderNames(source4)}}</span>
        <!-- 测试id长度超过数据源 -->
        <span>{{[1, 11, 3, 4, 5] | lsCascaderNames(source4)}}</span>
        <!-- 测试严格相等映射 -->
        <span>{{['1', '11'] | lsCascaderNames(source4)}}</span>
        <!-- 测试非严格相等映射 -->
        <span>{{['1', '11'] | lsCascaderNames(source4, true)}}</span>
        <!-- 测试数据源chuildren=null -->
        <span>{{[0, 9, 10] | lsCascaderNames(source4)}}</span>

        <!-- 测试各种数据源 -->
        <span>{{[1, 11] | lsCascaderNames(source1)}}</span>
        <span>{{[1, 11] | lsCascaderNames(source2)}}</span>
        <span>{{[1, 11] | lsCascaderNames(source3)}}</span>

        <!-- 测试id在数据源中不存在 -->
        <span>{{[5] | lsCascaderNames(source4)}}</span>
        <!-- 测试id跨级别存在 -->
        <span>{{[1, 2, 111] | lsCascaderNames(source4)}}</span>
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
                {   
                    "id": 0,
                    "name":"法国",
                    "children":[
                        {
                            "id": 9,
                            "name":"巴黎",
                            "children": null
                        }
                    ]
                }, {   
                    "id": 1,
                    "name":"中国",
                    "children":[
                        {
                            "id": 11,
                            "name":"杭州",
                             "children":[
                                {
                                    "children": null,
                                    "id": 111,
                                    "name": "滨江"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
};
</script>