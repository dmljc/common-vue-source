<template>
    <operation-card header="操作类卡片" sub-header="带有操作或可折叠的卡片" :collapse="true">
        <template slot="operation">
            <el-button type="text">编辑</el-button>
        </template>
        <div v-for="o in 4" :key="o">
            {{'列表内容 ' + o }}
        </div>
    </operation-card>
</template>
