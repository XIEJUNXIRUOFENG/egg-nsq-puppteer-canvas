# egg-nsq-puppteer-canvas

node（eggjs）下使用nsq 实现puppteer生成pdf服务

# 注意事项
1. 需要用保证服务器gcc版本版本大于4.8.1
2. 由于npm安转canvas会不成功，需要依赖用cnpm安装

# 安装步骤
1. cnpm i
2. 线网打开服务：npm run start,测网打开服务：npm run start:test
3. 线网关闭服务: npm run stop,测网关闭服务：npm run stop:test

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
```

由router.js可知通过http://0.0.0.0:8080/nodeapi/pdf/create发送post请求带入url即可开始项目访问。

### Deploy

项目详细介绍请查看博客地址：https://segmentfault.com/a/1190000022967483

[egg]: https://eggjs.org