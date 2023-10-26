### Webpack基础(学习笔记)
#### 一、为什么要构建工具
**开发与生产的矛盾**  
开发：  
1、需要模块化，帮助我们更好的开发；  
2、会用一些新语法和框架特殊写法（ts,es6,vue）。   

生产：  
1、浏览器自身无法解析模块化  
2、浏览器只认识js，有的老浏览器对于es6支持不全

**构建工具帮我们做了什么**  
![Image from alias](~@/img/webpack-p1.png)
构建工具（比如webpack）本身做的只有一件就是把我们这些import编译掉，本身做的只有打包这一件事情，对于es6、ts、.vue的编译都是通过添加额外的插件和loader完成的，webpack自身的功能仅仅是把我们引入的那些模块打包成一个文件。 
代替一些人工操作也是通过插件和loaderd
#### 二、Webpack的基础配置
**webpack到底做了什么**
就是打包    webpack分析引入树 根据引入树打包成一个文件
![Image from alias](~@/img/webpack-p2.png)

entry：  必须项，以哪个文件为开始  
output：   必须项，最终产出js配置  
mode：   开发模式还是生产模式 webpack4以后必填  webpack4以前没有  
devServer：  非必须，开发模式配置  
module：  非必须，loader编写的地方  
plugins：  非必须，插件  
optimization： 非必须，优化相关   
resolve： 非必须，提供一些简化功能，比如别名，文件后缀名的省略  
 
webpack安装  
webpack3   npm install webpack@3.0.2   
webpack4以后   npm install webpack webpacl-cli -g  
#### 三、Webpack的基础配置
1、ES6转化 babel-loader
2、代码规范 eslint
3、代码的分割和打包  webpack的自身核心动能

**babel-loader的配置**
babel-loader写入webpack配置 ------》 定义编译配置（options或者.babelrc）
npm install babel-loader @babel/core --save-dev
npm install @babel/preset-env --save-dev

babel-loader只提供接口 实际进行转化的是babel/core

**eslint的工作**

Eslint-loader(5后废弃)
                        ------》  定义配置 ------》 定义规范
Eslint-webpack-plugin

代码规范配置可以写到.eslintrc.js文件
npm install eslint eslint-webpack-plugin --save-dev
npm install eslint-config-standard --save-dev
npm install eslint-plugin-vue --save-dev
#### 四、css 与资源文件的处理
**css的处理方式**
![Image from alias](~@/img/webpack-p3.png)
npm install css-loader style-loader mini-css-extract-plugin --save-dev
npm install less less-loader --save-dev
npm install css-minimizer-webpack-plugin --save-dev (压缩css)
**资源如何处理**
![Image from alias](~@/img/webpack-p4.png)
#### 五、从loader的本质看各种语言处理
loader本质
Loader本质是一个方法，该方法接受到要处理的资源的内容，处理完后给出内容，作为打包结果
简单手写一个css处理loader

所以基本上各种语言处理都可以看成 为该语言编写loader ------》 编写loader配置
npm install typescript typescript-loader --save-dev

#### 六、Html处理
一个项目的三个基本要素
![Image from alias](~@/img/webpack-p5.png)
我们一般需要htlm做什么
1、提供一个HTML模板，复用固定内容
2、打包的时候生成一个html
3、打包出来的html自动引入js

html处理用plugin不用loader
html是作为载体承接打包后的内容
loader是处理一些我们引入的内容，为了避免webpack不认识；而插件是做一些事情
npm install html-webpack-plugin --save-dev

[JavaScript模板引擎EJS](https://www.jb51.net/javascript/290807z72.htm)
#### 七、代码分割
**1、单入口我们怎么处理**  
单入口意味者所有代码在一个文件里，这样会导致代码过大，所以我们需要把一些不是马上用到的代码拆分出来，这样来加快首屏速度
**2、多入口我们怎么处理** 
多入口得问题主要是重复加载同一段逻辑代码
```javascript
optimization: {
    splitChunks: {
      chunks: 'all', // all ，async initial
      //   minChunks: 2, //一个模块重复引用几次才会进行拆分为独立的文件
      //   minSize: 0,//最小的拆分量 1000byte
      //   name: 'a'
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendor.js',
          chunks: 'all',
          minChunks: 1
        },
        common: {
          filename: 'common.js',
          chunks: 'all',
          minChunks: 2,
          minSize: 0
        }
      }
    },
    runtimeChunk: {
      name: 'runtime.js'
    }
  },
  // 单入口-》runtime+vendor+核心业务+异步模块
  // 多入口-》runtime+vendor+每个入口的核心业务代码——common
  // 第三方库单独打包-vendor runtime
```
#### 八、Webpack技巧性配置
1、**hash值得意义**  浏览器加载了一个资源后回缓存资源，但是如果名字改了呢？
2、resolve
    alias-别名，提供路径的简写\
    Extensions-扩展省略，定义可省略的扩展名
3、require.context 批量引入指定文件夹下的所有文件
```javascript
    /**
    第一份参数：文件夹
    第二个参数是否包含子文件夹
    */
    const r = require.context('./mode', false, /.js/)
    let _all
    r.keys().forEach((item) => {
    _all += r(item).default
    })
```
#### 九、开发模式
安装webpack-dev-server ------》 设置setServer字段 ------》 用webpack-dev-server运行

**1、工作原理**
![Image from alias](~@/img/webpack-p6.png)
npm install express --save-dev
 npm install html-webpack-plugin 
webpack-dev-middleware  --save-dev
npm install webpack-dev-server -g --save-dev
（webpack-dev-server 安装要全局 否则报错）  
**2、热更新与强制更新**  
热更新：在不刷新浏览器的情况下更新页面。可以保持页面的当前状态  
强制更新：自动刷新页面来更新界面，会重置页面状态  
开发模式下，hot: true  更改和js无关的代码用的热更新，更改js用的是强制刷新，如果就是想js这段代码进行热更新可以加这段代码：
```javascript
let a= 50;
setInterval(()=> {
    console.log(a++)
},500)
//更改js代码想进行热更新
if(module.hot){
    module.hot.accept();
}
```
**3、proxy（用于在开发阶段解决跨域问题）**  
说白了就是由我们webpack-dev-server开启的node服务代替我们请求接口，因为如果后端没有开启cors,我们直接从前端请求会跨域。我们可以利用proxy。让请求从node服务发
**4、source-map**  
出现错误，或者输出内容的时候，source-map能够帮助我们定位到它来自哪个代码
#### 九、实战中的配置技巧  
**1、为什么需要区分环境**  
生产模式  
需要：代码压缩，tree-shaking  
不需要： 详细的source-map,开启开发模式   
开发模式  
需要： 详细的source-map,开启开发模式 
不需要：压缩，代码混淆等等 

区分要点  
	1、根据不同的环境进行不同打包，一般在process.env中设置  
	2、有的时候需要在js代码中获取环境，我们可以借助插件完成  
npm install webpack-merge  --save-dev  
npm install -D  cross-env  
cross-env 一个库 可以帮助我们指令/脚本可以跨平台使用,比如process.env 中默认并没有 NODE_ENV，这里配置下我们的 package.json 的 scripts
```javascript
//package.json
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config ./webpack.devconfig.js",
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.proconfig.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
也可以通过webpack自身的指令配置环境
```javascript
//webpack.proconfig.js
const base = require("./webpack.baseconfig.js");
const merge = require("webpack-merge").merge;
module.exports = function(env) {
	return merge(base(base),{
	  mode: "production",
	})
}

//webpack.baseconfig.js
const minicss = require("mini-css-extract-plugin");
const htmlwebpackplugin = require("html-webpack-plugin")
console.log(process.env.NODE_ENV)
module.exports = function(env) {
	console.log(env)
	let pluginArr = [
	    new htmlwebpackplugin({
	        filename: "index.html",
	        template: "./index.html"
	    })
	]
	function hasMinicss(){
	    if(process.env.NODE_ENV == "production") {
	        pluginArr.push(new minicss({
	            filename: "test.bundle.css"
	        }))
	    }
	}
	hasMinicss()
	return {
	    entry: {
	        app: "./app.js"
	    },
	    output: {
	        path: __dirname + "/dist",
	        filename: "[name].[chunkhash:4].bundle.js",
	    },
	    module: {
	        rules: [
	            {
	                test: /\.css$/,
	                use: [
	                    process.env.NODE_ENV == "production"?minicss.loader:"style-loader",
	                    "css-loader"
	                ]
	            }
	        ]
	    },
	    plugins: pluginArr
	}
}
```
[DefinePlugin 作用](https://blog.csdn.net/weixin_44677431/article/details/90345201)
可以创建一个在编译时可以配置的全局常量。主要针对我们在编译时，区分 开发、测试、生产环境。
因为node.js里的环境变量，process.env.NODE_ENV，只能在node的环境里拿到。而webpack.DefinePlugin提供的可以在浏览器环境里拿到。
```javascript
//webpack.devconfig
plugins: [
    new webpack.DefinePlugin({
      baseURL: '"www.xxx.com"'
    })
  ]

//app.js
console.log(baseURL)
```
**2、打包分析**  
1、官方方案： --json输出打包结果分析json  
    webpack.github.io.analyse/  
2、webpack-bundle-analyzer  
    npm install webpack-bundle-analyzer --save-dev  
**3、dll优化**  
  提高打包速度  
  不变的包： vendor包  
**4、压缩-混淆**
webpack的压缩不仅仅仅压成一行 ，还分析了代码的执行结果，以一个最简的表达给你表达出来；还具有混淆的功能，简化名字， 混淆意义，让源码更难阅读；
```javascript
let _a = 123;
function f1(){
    console.log(_a)
};
f1();
//以上代码打包后是   console.log（123）
```
**5、tree-shaking**  
有局限性 ： 原型对象   es-class shaking无效  
可以改用函数式编程  