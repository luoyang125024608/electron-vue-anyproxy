# electron-vue-anyproxy

> electron-vue-anyproxy

下载mac或windows [体验版](https://github.com/luoyang125024608/electron-vue-anyproxy/releases/tag/v1.0.3)

与charles等工具的区别在于，用js编写抓包规则，然后Node跑抓包规则，可以调起chrome开发者工具debugger或者console编写在node里的规则。
![roadmap.path](https://github.com/luoyang125024608/electron-vue-anyproxy/blob/master/src/renderer/assets/p1.jpg)

![roadmap.path](https://github.com/luoyang125024608/electron-vue-anyproxy/blob/master/src/renderer/assets/p2.jpg)

![roadmap.path](https://github.com/luoyang125024608/electron-vue-anyproxy/blob/master/src/renderer/assets/p3.jpg)

这个项目用 [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) 和 [vue-cli](https://github.com/vuejs/vue-cli)生成. 文档 [Document](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

这个项目核心逻辑使用阿里巴巴 [anyproxy](https://github.com/alibaba/anyproxy)@4.0. 文档 [Document](http://anyproxy.io/cn/).

```
特点：1、支持同时启用多个抓包规则

     2、可以打开控制台断点抓包规则
     
     3、模块引入anyproxy，无修改源码，支持升级
```
#### Build Setup
    
``` bash
# 安装依赖
npm install

# 开发
npm run dev

# 打包编译生成
npm run build


# 语法检查
npm run lint

```

---
