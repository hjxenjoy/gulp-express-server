# 使用指南

> 注意：当你需要进行一个新的项目时，请复制一个该项目，并且重新命名，使用复制后的项目进行操作

## 提前准备工作

* 安装nodejs和[淘宝包管理工具](https://npm.taobao.org/)

**nodejs推荐使用nvm安装管理[https://github.com/creationix/nvm](https://github.com/creationix/nvm)**

```shell
# 安装淘宝包管理工具
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

* 命令行进入文件夹，安装nodejs依赖

```shell
# 克隆代码到本地
git clone https://github.com/hjxenjoy/gulp-express-server.git
# 进入文件夹
cd gulp-express-server
# 使用淘宝镜像源和包管理工具cnpm安装全部依赖
cnpm i
```

**注意** 如果启动项目提示有安装包没有安装成功，可以尝试先删除node_modules文件夹，然后重新运行`cnpm i`

```shell
rm -rf node_modules
cnpm i
```

## 认识目录

* **app.js**
  
express 静态服务器启动文件，下面解释下部分代码含义

```js
// 设置服务端口号，如果提示占用，请修改
var PORT = 3000;
// 设置静态文件访问路径为项目根路径下public文件夹，请勿修改
// 设置完之后，public文件夹下资源就可以用使用绝对路径的方式进行调用，例如：
// <link rel="stylesheet" href="/styles/home.min.css"/>
// <img src="/images/xiaomai.png" alt=""/>
// <script src="/lib/home.js"></script>
app.use(express.static(path.join(__dirname, 'public')));
```

* **gulpfile.js**

使用gulp编译scss和html模板，具体代码含义，见gulpfile.js文件内代码注释

* **public文件夹**

gulp编译后文件存放目录、静态文件(图片、js、favico)存放目录

* **sass文件夹**

该文件夹下分三层：

  1. `*.scss` 每个页面单独引用的css文件
  2. `common/_*.scss` 全站通用scss引用，供`*.scss`使用
  3. `modules/_*.scss` 和sass文件夹根路径下所有文件名称匹配，单独调用

**注意** common和modules下scss文件默认下划线开头，例如：`_layout.scss`，但是引用是不需要添加下划线，添加下划线的目的是为了区分主次。

* **templates**

ejs网页模板存放目录

该文件夹下分两层：

  1. `*.ejs` 各个模块页面
  2. `partials/*.ejs` 公共页面部分存放

下面解释下代码具体含义

```html
<%- include('partials/head', {
  title: '首页',
  css: '/styles/home.min.css'
}) %>
<body>
  这里是你要插入的模块HTML代码
<%- include partials/footer.ejs %>
```

其中传递的参数title和css是为了给不同模块HTML添加不同的标题和css引用，head和footer所使用的include表达式不同，但是都可以，具体ejs语法是访问[官方网站](http://www.embeddedjs.com/)

## 启动项目

```shell
gulp
[18:55:31] Using gulpfile ~/Desktop/gulp-express-server/gulpfile.js
[18:55:31] Starting 'templates'...
[18:55:31] Finished 'templates' after 6.79 ms
[18:55:31] Starting 'styles'...
[18:55:31] Finished 'styles' after 3.28 ms
[18:55:31] Starting 'watch'...
[18:55:31] Finished 'watch' after 14 ms
[18:55:31] Starting 'complie'...
[18:55:31] Finished 'complie' after 2.53 μs
[18:55:31] Starting 'server'...
[18:55:31] Finished 'server' after 7.12 ms
[18:55:31] Starting 'default'...
[18:55:31] Finished 'default' after 2.08 μs
livereload[tiny-lr] listening on 35729 ...
server start at http://127.0.0.1:3000
```

然后通过浏览器访问[http://127.0.0.1:3000](http://127.0.0.1:3000)即可，默认请求public下的index.html

## 注意事项

静态图片和js直接存放在public文件夹下，所有不要随便清空public文件夹

建议使用sublime-text编辑器配置ejs插件开发，可是保证ejs代码高亮

搜索关键字sublime text / package control / ejs

我并没有做browser-sync，因为我不喜欢！