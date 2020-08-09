---
sidebar: auto
---

## 介绍

common-vue 由多个物流相关的工程抽离出来的通用函数、过滤器、指令、以及复合业务组件构成，方便日常业务开发。

## 特性

> 内置了element-ui, 工程无需再引入  
> 复合组件全局注册，工程直接使用  
> 过滤器、指令全局注册，工程直接使用  
> Vue原型扩展，复杂业务代码简单化  
> 通用函数抽离，避免多工程分化以及多工程维护  
> 通用css抽离，避免多工程分化以及多工程维护  


## 使用方法

##### 添加依赖 （仅支持内部源下载）

```
npm install common-vue --save
```

##### 工程引入

```
import Vue from 'vue';
import '@kaola/common-vue/dist/compose.css';
import Compose from '@kaola/common-vue';

Vue.ues(Compose);
```

## 文档维护

### 通用说明 

文件夹和文件命名规则为小写，中划线分割；

### 文档维护步骤

1. docs/components下建立文件夹和文件，每个组件有自己的归属文件夹，文件夹下必须包含一个以组件名命名的.md文件，组件的各个使用场景分别建立对应的.vue文件，详细请参考已有的文档。

以detail-header为例说明：  

 - .vue文件中正常使用组件，组件已全局注册  
 - .md文件中使用component-wrap包裹组件，使用::: code <<< filepath :::语法引入代码示例。

**Note:**/docs/components文件夹下的所有.vue文件会被自动全局注册为可用组件，组件名为文件夹名+文件名，并会被slugify为规范格式【小写，中划线分割】

 ```
 // base.vue  基础用法
 <template>
    <detail-header header="报价单编号：HQG09900-1" />
</template>
 ```

 ```
 // detail-header.md 
 # Detail Header

<component-wrap title="基本用法">
<detail-header-base />
</component-wrap>

::: code
<<< docs/components/detail-header/base.vue
:::
 ```

2. /docs/.vuepress/config.js中配置导航和菜单  
 - 配置 themeConfig.nav 和 themeConfig.sidebar, 具体可参考已有的路由

**Note:**如果是添加组件，则只需要配置sidebar就可以
