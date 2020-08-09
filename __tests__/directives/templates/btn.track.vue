<template>
    <div>
        <el-button v-btnTrack class="button-1">导出</el-button>
        <el-button v-btnTrack='通用点击事件' class="button-2">通用点击</el-button>
        <el-button v-btnTrack:anotherEventId='其他点击事件' class="button-3">特殊点击</el-button>
    </div>
</template>

<script>
export default {
}
</script>