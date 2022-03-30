<br/>
<br/>

<p align="center"><img style="width: 90%; padding-top:20px;" src="./lb_demo_fe_sm.png"></p>
<p align="center">
  <a href="#"><img src="https://img.shields.io/github/stars/luobozz/demo_frontend?style=for-the-badge"></a>
  <a href="#"><img src="https://img.shields.io/github/search/luobozz/demo_frontend/goto?style=for-the-badge"></a>
  <a href="#"><img src="https://img.shields.io/github/languages/count/luobozz/demo_frontend?style=for-the-badge"></a>
  <a href="#"><img src="https://img.shields.io/badge/Luobo-Shell-brightgreen?style=for-the-badge"></a>
</p>

<br/>

## 代码生成

### 配置generator.config.js(需要生成的模块名称)
| 参数  | 说明   | 类型   | 参考内容   |
|-------------- | -------------- | -------------- | -------------- |
| apiRoots    | api根目录列表     | Array     | ["/auth"]     |
| generatorList    | 需生成的模块列表     | Array     | [{"viewPath":"/view/","name":"demo","chineseName":"模板","restUrl":"/auth/sys/orm/role"}]     |

### 生成

`npm run generator`



## 项目提交

项目使用 [commitizen](https://github.com/commitizen-tools/commitizen) 提交
`npm run git:acp`

## less computed test

`.\node_modules\.bin\lessc .\src\assets\css\computed\index.less .\src\assets\css\computed\test.css
`
## TODO LIST

- [x] 初始化项目
- [x] 添加CZ
- [x] 响应式处理
- [x] 标签页

## 参考&感谢

[soybean-admin](https://github.com/honghuangdc/soybean-admin)

## License

[MIT Copyright (c) 2022 luobo](https://github.com/luobozz/demo_frontend/blob/main/LICENSE)
