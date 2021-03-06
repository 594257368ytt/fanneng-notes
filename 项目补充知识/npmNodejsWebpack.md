# webpack、npm、nodejs关系

## webpack

webpack就是将你从npm中安装的包，打包成更小的浏览器可读的静态资源。

### 浏览器在解析js时的盲点

就是浏览器在解析js的时候，没有做js文件的模块化。比如一个文件要想给另外一个文件暴露出去一部分数据或者一个变量，那只能将它定义在全局的作用域下，没有其他的办法。

### 新的隐患和解决方案

定义全局变量，虽然可以暂时解决依赖的问题，这会带来一个新的隐患。我不知道在什么时候，用什么样的方式会把一个全局变量给覆盖掉，如果引入的是外部的库，全局变量随时可能更新，所以无论用任何方式来定义全局变量，总有一定的可能性发生冲突。

node，nodejs可以直接跑在操作系统上。在node的眼里，所有的文件都是一个模块，任何一个模块都可以有两个口，一个是入水口、一个是出水口。这个就是node里面有个module，其中module.exports表示出水口，module.require表示依赖，表示入水口。

```js
//b.js出水口
var msg ="asd";
module.exports ={mes:mes}
//a.js入水口
var msg = require(./b.js).msg;//可以省略.js   如：require(./b).msg
```

require(./b.js).msg明确指明我要用b文件里面的msg，exports 指明了我要导出去的变量。再也不需要全局变量。

### 代码格式

```js
webpack a.js bundle.js
```

## nodejs

Node.js 就是运行在服务端的 JavaScript。
Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

## npm和node

npm是产生于node社区，node中也是通过npm来加载模块的

## npm和nodejs

npm 是 Node.js 官方提供的包管理工具，他已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制.

npm是于Node社区中产生的，是nodejs的官方包管理工具，当你下载安装好node的时候，npm cli就自动安装好了

## node和nodejs

其实node和nodejs两个概念没有太大差别，我个人认为唯一的区别就是，人们说起node的时候语境更多的是再说node环境，而说nodejs时更多的是在说node是一门可以提供后端能力的技术。本质上来说，node就是nodejs

## webpack和npm

**webpack是npm生态中的一个模块**，我们可以通过全局安装webpack来使用webpack对项目进行打包

## webpack和node

webpack的运行依赖于node的环境，没有node是不能打包的，但是webpack打包后的项目本身只是前端静态资源和后台没有关系，也就是说不依赖与node，只要有后台能力的都可以部署项目

## 总结

正是因为npm的包管理，使得项目可以模块化的开发，而模块化的开发带来的这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别，而手动处理又是非常繁琐的，这就是webpack工具存在的意义。

