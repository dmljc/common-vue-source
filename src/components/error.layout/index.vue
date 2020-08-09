<template>
    <div class="error-page">
        <div class="error-ctn">
            <div class="error-img" :class="{'error-img--notfind': code === 404}" :style="{ backgroundImage: `url(${error.imgSrc})` }"></div>
            <div class="error-notice">
                <p class="error-notice__title">{{ error.msg }}</p>
                <p class="error-notice__desc">{{ error.subMsg }}</p>
                <el-button v-btnTrack 
                    v-if="code !== 402" 
                    type="primary" 
                    @click="handleGotoIndex">返回首页</el-button>
                <el-button v-btnTrack 
                    v-else 
                    type="primary" 
                    @click="createNew">新建内容</el-button>
            </div>
        </div>
    </div>
</template>
<script>
const resourceMap = {
    401: {
        msg: '无权限访问',
        subMsg: '抱歉，你无权访问该页面',
        imgSrc: '//haitao.nos.netease.com/fefb55b9-4b26-4354-9a1e-39d586570297.jpeg'
    },
    402: {
        msg: '空页面',
        subMsg: '当前页面是空的',
        imgSrc: '//haitao.nos.netease.com/43d679d6-d4ff-4bae-be2d-5a14f6745045_389_388.png'
    },
    404: {
        msg: '404！出错了',
        subMsg: '抱歉，您访问的页面不存在',
        imgSrc: '//haitao.nos.netease.com/1858af16-d826-4903-a408-1232d2859119.jpeg'
    },

    500: {
        msg: '服务器出错',
        subMsg: '抱歉，服务器出错了',
        imgSrc: '//haitao.nos.netease.com/23e5b723-0325-4962-9e21-cf08048b0bb7.jpeg'
    }
};
export default {
    name: 'ErrorLayout',
    props: {
        indexPath: {
            type: String,
            default: '/'
        },
        code: {
            type: Number,
            default: 401,
            validator(errorCode) {
                return Object.keys(resourceMap).indexOf(parseInt(errorCode)) === -1;
            }
        }
    },
    data() {
        return {
            error: resourceMap[this.code]
        };
    },
    methods: {
        handleGotoIndex() {
            this.$router.push('/');
        },
        createNew() {
            // do something
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(error-page) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
}
@include b(error-img) {
    width: 205px;
    height: 205px;
    background-position: -7px -31px;
    background-size: cover;
    background-repeat: no-repeat;

    @include m(notfind) {
        background-position: -7px -17px;
    }
}
@include b(error-ctn) {
    display: flex;
    flex-direction: row;
    text-align: left;
}
@include b(error-notice) {
    margin-left: 20px;
    @include e(title) {
        margin: 0;
        font-size: 36px;
        font-weight: 700;
        color: #5a5a5a;
    }
    @include e(desc) {
        margin: 27px 0 19px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 400;
        color: #929292;
    }
}
</style>
