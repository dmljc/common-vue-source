<template>
    <left-tree :source="source" v-model="selected" :init="true">
        <p class="f-mb20">{{desc[selected]}}</p>
        <img v-if="selected === 'cake'" src="./imgs/cake.jpeg" alt="黄金糕">
        <img v-if="selected === 'milk'" src="./imgs/milk.jpeg" alt="双皮奶">
        <img v-if="selected === 'oyster'" src="./imgs/oyster.jpeg" alt="蚵仔煎">
        <img v-if="selected === 'noodle'" src="./imgs/noodle.jpeg" alt="龙须面">
        <img v-if="selected === 'duck'" src="./imgs/duck.jpeg" alt="北京烤鸭">
    </left-tree>
</template>

<script>
export default {
    data() {
        return {
            source: [
                { id: 'cake', name: '黄金糕' },
                { id: 'milk', name: '双皮奶' },
                { id: 'oyster', name: '蚵仔煎' },
                { id: 'noodle', name: '龙须面' },
                { id: 'duck', name: '北京烤鸭' }
            ],
            selected: '',
            desc: {
                'cake': '黄金糕本名叫蜂窝糕，发源于南洋，是南洋娘惹糕的一种，黄金糕是该糕流传至广东之后的别名。',
                'milk': '双皮奶，是一种粤式甜品。清朝时起源自顺德，用水牛奶做原料。现遍布于广东、澳门、香港等地。',
                'oyster': '蚵仔煎，（闽南语读做ǒu-ā-jiān，普通话译作“海蛎煎”），是一道常见的家常菜，起源于福建泉州，是福建沿海，台湾，潮汕等地区经典的传统小吃之一。',
                'noodle': '龙须面为传统面食，流行于北方广大地区，是一种又细又长、形似龙须的面条，由山东抻面演变而来，至今已有300多年的历史。',
                'duck': '烤鸭是具有世界声誉的北京著名菜式，起源于中国南北朝时期，《食珍录》中已记有炙鸭，在当时是宫廷食品。用料为优质肉食鸭北京鸭，果木炭火烤制，色泽红润，肉质肥而不腻，外脆里嫩。北京烤鸭分为两大流派，而北京最著名的烤鸭店也即是两派的代表。它以色泽红艳，肉质细嫩，味道醇厚，肥而不腻的特色，被誉为“天下美味”。'
            }
        };
    }
};
</script>

<style>
</style>