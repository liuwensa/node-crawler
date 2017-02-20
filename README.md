#http://www.toutiao.com头条号文章抓取

## 源码说明
### 项目目录说明
```
.
|-- config                           // 项目开发环境配置，依赖与config包
|   |-- default.js                   // 项目打包部署默认配置
|   |-- development.js
|   |-- production.js
|-- controllers                      // 代码业务逻辑控制层
|   |-- crawlerToutiao.js            // 头条号抓取业务实现
|-- cron                             // 定时函数
|   |-- index.js
|-- logger                           // 日志的配置文件
|   |-- index.js
|   |-- logjsConfig.js
|-- routers                          // 路由
|   |-- index.js
|-- tools                            // 常用工具函数集
|   |-- index.js
|-- app.js                           // 服务配置
|-- cheerio抓取网页数据.md            // 基本抓取知识
|-- global-variable.js               // 常用包的引入，全局变量引入
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
|-- README.md                        // 项目说明
.
```

### 运行程序 
```
npm install
npm run start 或者直接 node app.js
http://127.0.0.1:30008/articles?authorUrl=http://www.toutiao.com/m52309958694/
```
