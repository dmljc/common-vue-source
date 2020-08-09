<template>
    <operation-card header="操作类卡片" :collapse="true">
        <div v-for="o in 4" :key="o">
            {{'列表内容 ' + o }}
        </div>
    </operation-card>
</template>