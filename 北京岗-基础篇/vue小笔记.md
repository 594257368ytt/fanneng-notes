# DAY 1

## 环境配置

- 安装`vscode`

- 安装`npm `        

   https://blog.csdn.net/stopcpp/article/details/53909558
   https://blog.csdn.net/YHjmonkey/article/details/110921515

- 安装`node  `     

  http://nodejs.cn/learn/how-to-install-nodejs

- 安装`git`

## vscode 如何新建一个项目？

先新建一个文件夹在`vscode`中打开
在进入文件，用`cd`文件名
然后在该文件下安装`vue`项目`terminal`->`new terminal`

## 运行项目

### 创建项目

Vue create project_name / Vue init webpack ProjectName

### 安装依赖：

cd my-project

npm install / npm i

### 启动

npm run dev

### 打包

npm run build

### npm i安装失败清除缓存

npm cache clean -f

### 额外依赖

## 增加新的依赖

去package.json文件中，“devDependencies”里面加项目开发要用的依赖，“dependencies”中加项目上线后的依赖。有两种方法添加依赖。

### 知道版本自己加

选定`devDependencies`还是`dependencies`，加入`less`版本，然后`npm-i`或者`npm install`，`npm`的主要作用是安装`json`里写的依赖，再`npm run dev`

```json
"less": "^3.0.4",
"less-loader": "^5.0.0",
```

### 不知道版本用命令行安装

```json
npm install less less-loader --save-dev
```

同时安装`less`和`less-loader`，如果想加在`devDependencies`后面跟`-D`，如果想加在`dependencies`后面加`-S`。

### 路由操作顺序：

见day10

### axios配置

两种方法：jianshu.com/p/0da733d7a8df?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

#### 安装依赖后的vue项目

先安装依赖

```
npm install axios --save
```

`main.js`

```js
import axios from 'axios' 
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
```

`main.js`另一种写法：`axios`改写为`Vue`的原型属性

```js
import axios from 'axios'
Vue.prototype.axios = axios
```

#### 普通项目

从网上下载`axios.js`，粘贴到项目，h5项目这样导入

````html
<script type="text/javascript" src="lib/axios.js"></script>
````

# DAY 2

## 元素.$组件，组件.属性

vm.$data
data.site

## 父子组件传值：

https://baijiahao.baidu.com/s?id=1623258793504616613&wfr=spider&for=pc

## demo1

实现两个按钮的加减数字并显示

实现后，实现吧显示的数字改成`input`，可用户输入

实现后把项目放进HelloWorld.vue以及app.vue中互相传值

## 涉及知识点

- 工程项目的目录结构 

  https://www.runoob.com/vue2/vue-tutorial.html

- 了解HelloWorld.vue和app.vue的关系（父子组件）

- js事件`v-model`双向数据绑定

  实现`input`输入文本内容，同时获取到<h1>中显示

- 子组件存在的意义

  - 父子需要传值的时候：子组件对于多个父组件标签进行选择某一标签绑定事件，像3*3表格，事件绑定第一排第二列的标签，第二行也是绑定第二个，就可以通过子组件，多次重复使用某一事件。
  - 父子无需传值，子组件内容一样且多次使用，也可以选择写成子组件。

- 自定义组件`components,`然后将子组件import进来
- 组件绑定监听`v-on`，父亲监听孩子调用`v-on:listenToChild="add"`，孩子与父亲约定相同的约定，同意监听`this.$emit("listenToChild")`;并绑定事件`click`以供监听，当孩子发生点击事件，父亲立马调用`add`方法
- 绑定点击事件的两种写法
  - `@click`
  - `onclick`

# DAY 3

## demo2

实现`table`的分页、增、删功能

![image-20210407202918936](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210407202918936.png)

## 难点

#### 分页goPage()方法

设置显示功能，每页显示5行，判断当前页，从而知道要显示的是哪五行，table页面中判断如果是第一页首页和上一页不可点击，最后一页的下一页和尾页不可点击。

设置上一页、下一页点击触发的功能，当前页+1，

#### add()方法

总条数加1，判断总页数要不要加1，当前页跳转到最后一页，将新的内容添加到元素中。

- 获取文本框中的内容

```js
document.getElementById("addtext").value
```

- 创建新的节点元素

```js
createElement("tr")
```

- 将新创建的节点内容复赋值：
  - 单引号从头括到尾，把变量单拎出来`${ }`

  ```js
  tr.innerHTML+=`<td>${addtext}</td>
  
  <td>${addtext2}</td>
  
  <td>${addtext3}</td>
  
  <td>${addtext4}</td>'
  ```

  - 或者用字符串拼接

  ```js
  tr.innerHTML+="<td>"+addtext+"</td>"+
  
  "<td>"+addtext2+"</td>"+
  
  "<td>"+addtext3+"</td>"+
  
  "<td>"+addtext4+"</td>";
  ```
  
- 将赋值后的新建元素附加到原来的`table`中

```js
t.appendChild(tr);
```

#### choose()方法确认点击的是修改还是删除

- 监听函数`addEventListener()`

  由于添加的整行元素不会立马加载到`DOM`中，属于未来元素，所以不可以使用`Onclick`获取,而是使用`addEventListener()`方法。为了方便记忆以后监听都使用`addEventListener()`函数。

  该方法有三个参数：

  ```js
  element.addEventListener(event, function, useCapture)
  ```

  第一个是监听的事件，第二个是事件触发后进入的函数，第三个是可选。布尔值，指定事件是否在捕获或冒泡阶段执行。可能值:

  - `true` - 事件句柄在捕获阶段执行
  - `false`- 默认。事件句柄在冒泡阶段执行

  本demo是监听整个table元素的点击事件（此处choose没有括号！！！）

  ```js
  iii.addEventListener("click", choose ,true);
  ```

  被调用的`choose`函数定义为，其中e表示点击事件获取到的所有信息。

  ```js
  function choose(e){
  }
  ```

  通过调用`e.target`可以获得点击的的按钮标签。

- 判断获取到的标签的`class`属性名是什么

  ```js
  if(e.target.getAttribute("class")=="myBtn"){//删除按钮的class是myBtn
  }else if(e.target.getAttribute("class")=="myBtn2"){//修改按钮的class是myBtn2
  ```

#### deleterow(e)删除功能

首先`e.target`是获取到按钮标签元素，我们要获取到父级元素`td`再获取到tr整行删除，总行数-1，判断总页数是否变化。

```js
e.target.parentNode.parentNode.remove();
```

#### 修改功能

直接写在`choose()`的`else if`里

首先获取到tr中所有的`td`的内容，点击修改后将已有内容展示在新页面的`input`上

![image-20210408143627606](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210408143627606.png)

- 数组的使用！！！

  - 首先，获取标签名为td的元素，可以用`document.getElementsByTagName('td')`，也可以用 `tr.getElementsByTagName('td')`，因为`document`是指整个`body`元素中寻找，在指定tr中寻找会更有针对性，如果一个项目中有多个table可以使用`tr`来查找，tr是通过`e.target.parentNode.parentNode`获取的。

  - 其次，`getElements`加了s的都是获取到数组，不止一个值，即便只有一个值也必须写索引取值，由于`tr`又4个td所以数组长度是4。下面的代码主要作用是点击修改按钮后获取到要修改的哪一行所有数据。

    ```js
    let td1 = tr.getElementsByTagName('td')[0].innerText;
    let td2 = tr.getElementsByTagName('td')[1].innerText;
    let td3 = tr.getElementsByTagName('td')[2].innerText;
    let td4 = tr.getElementsByTagName('td')[3].innerText;
    ```

  - 之后将获取到的数据显示在新页面的四个`Input`上，这里虽然定义的每个`class`都是唯一，但是`class`都是可以多个标签使用的所以一定要去数组的第0个元素，不然会报错。

    ```js
    document.getElementsByClassName("changetext1")[0].value = td1;
    document.getElementsByClassName("changetext2")[0].value = td2;
    document.getElementsByClassName("changetext3")[0].value = td3;
    document.getElementsByClassName("changetext4")[0].value = td4;
    ```

- 监听提交按钮

  在这里，如果使用监听函数`addEventListener`就必须要跳转到另一个函数，而跳转到另一个函数，`e.target`就会改变，即便当作参数传过去也不是原来的e，所以这里需要使用匿名函数让新函数变成他的子函数，就可以随意调用。

  ```js
  change.addEventListener("click", ()=>{
  } ,true);
  ```

  先获取一遍改过之后的值

  ```js
  var changetext1 = document.getElementsByClassName("changetext1")[0].value;
  var changetext2 = document.getElementsByClassName("changetext2")[0].value;
  var changetext3 = document.getElementsByClassName("changetext3")[0].value;
  var changetext4 = document.getElementsByClassName("changetext4")[0].value;
  ```

  再把值传给原来的表当中，此处完成修改。

  ```js
  tr.getElementsByTagName('td')[0].innerText = changetext1;
  tr.getElementsByTagName('td')[1].innerText = changetext2;
  tr.getElementsByTagName('td')[2].innerText = changetext3;
  tr.getElementsByTagName('td')[3].innerText = changetext4;
  ```

  `value`是`input`特有属性用来读取输入的内容，其他标签如`tr`就是用`innerText`获取文本内容，使用`innerHTML`获取内部所有`HTML`代码。

- 点击显示、隐藏div

  取一个类名方便之后调用元素操作显示隐藏的方法

  设置两个div，外面那个半透明，里面你那个不透明，放内容。`opacity:1`；该方法是0-1之间的值，1为不透明，但是父标签透明会连带子标签透明，所以这里使用rgba(199, 111, 162, 0.76)，前三个是rgb的值，后一个是透明度。

  刚开始style中设置`display: none`；

  显示是     

  ```js
  hide[0].style.display="block";
  hide[1].style.display="block";
  ```

  隐藏是

  ```js
  hide[0].style.display="none";
  hide[1].style.display="none";
  ```

# DAY 4

## demo3

做轮播图

### 涉及知识点

#### 父元素高度塌陷

在文档流中，父元素的高度默认是被子元素撑开的，也就是子元素多高，父元素就多高。但是当子元素设置浮动之后，子元素会完全脱离文档流，此时将会导致子元素无法撑起父元素的高度，导致父元素的高度塌陷。所以要清除浮动。

当父元素`relative`，子元素`absolute`，子元素就可以使用`left`，`top`布局，但此时子元素脱离父元素文档流布局，素以父元素高度为0，父元素不再被子元素撑开，要给父元素设置高度，并添加如下CSS

给父元素加

```css
overflow:hidden;    //超出部分隐藏
clear:both;         
```

#### 不显示div边框的原因

`border-style`没添加：

`border` 简写属性在一个声明设置所有的边框属性。

可以按顺序设置如下属性：`border-width`  `border-style`   `border-color`

`border-style` 必须添加，不然显示不出来。

最后用一条写出来

```css
border:5px solid red;
```

`border-style`需要给四个参数，四个参数分别是**上右下左**的边框样式，如果只给了三个就定义前三个，如果只定义了一个参数，那么所有边框都是这个样式，样式也有四种：

`dotted` 点状

`solid` 实线

`double` 双线

`dashed` 虚线

#### 让中间的border边框重合

给每个border盒子加一个

```css
margin-right: -3px;
```

给div边框变成圆形

```css
border-radius: 100%;
```

#### 圣杯布局

方法一：最外层一个`container`，中间`center`撑满100%，左边`margin-left`: -100%，右边`margin-left`: -200px

涉及知识点：

##### 相对布局relative，决对布局absolute

相对布局要相对于其他元素的位置做出改变，相对父容器的时候：

![img](https://www.runoob.com/wp-content/uploads/2015/07/44967125.jpg)

right，left，top，button是相对父容器的偏移量。

##### 相对兄弟组件的定位：

![img](https://www.runoob.com/wp-content/uploads/2015/07/23853521.jpg)

另外定义绝对布局`absolute`的元素，父容器要相对定位`relative`不然就会继续向上搜寻具有相对定位的容器，相对定位的容器父容器要有固定大小不然会出错。

##### box-sizing

盒子模型的`padding`，当盒子模型设定1200，`padding`是200时，盒子`context`是1200，整个盒子大小是1600，当只想让`context`等于800又懒得自己算的时候就使用`box-sizing: border-box`，这样的内容就是800。

##### 水平居中：

父级对子集，让子级居中，在父级添加

```css
text-align：center;
```

让自身居中

```css
margin: 0 auto;
```

该布局代码及解释

https://blog.csdn.net/weixin_40902181/article/details/103924285

#### 让元素变成一排

##### 内联元素会自动变成一排

##### 块级元素设置浮动，但是父级需要留下足够的空位

##### flex布局

1、设置可以让元素变成横排或纵向布局（默认横向）

主轴水平（`main axis`) 垂直交叉轴(`cross axis`)，主轴的方向可以设置

https://www.runoob.com/w3cnote/flex-grammar.html

![img](https://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png)

```css
display:flex;
```

水平居中

```css
justify-content: center;
```

垂直居中

```css
align-items: center;
```

#### li去点

```css
list-style: none;
```

#### 定时器

设置一个函数执行隔多久执行一次

```css
timel=setInterval(fn_left,25);
```

已经设置隔25秒div移动一段距离后，中间还要停顿几面再展示下一张。所以可以设置一个time变量，当让函数隔25ms执行一次单步执行后面的操作，当Time>0时，一直`return`；这样每个25ms进入一次函数并什么都不操作，一共80次，共停顿2s，继续后续操作。

```js
function fn_right(){
	if(time>0){
		time--;
		return;
}
```

设置定时器开始跑的时候及的定义变量并给变量赋值，不然无法清除

设置定时器

```js
timel=setInterval(fn_left,25);
```

清除定时器

```js
clearInterval(timel);
```

#### 伪类

https://www.jianshu.com/p/8b610fdf0d48

# DAY 5

## demo4 todolist

用vue实现待办事项的增删改查

### @click 点击事件

### @input 输入框事件

### @input="function()"  @input="function"

function(e){}               function(e){}

这两种方式的区别就是加上括号就认为e是自己传的参数，而不加括号的调用就是获取自身事件。可以输出e看看获取的是什么，用`e.target.value`可以获取输入值。

### splice

```js
list.splice(start,num,“要替换为什么值”);
```

### v-for

```vue
<p v-for="(item,i) in list">
```

- 如果迭代的是对象

  则第一个键值，第二个是键名，第三个是索引。

- 如果迭代的是数组

  则第一个是值，第二个是索引

- 也可以遍历整数

  索引从1开始！！！上面都是从0开始

```vue
<li v-for="n in 10"></li>
```

of和in区别

- **V-for循环遍历数组时推荐使用of**，语法格式为`(item，index)`
  - `item`：迭代时不同的数组元素的值
  - `index`：当前元素的索引
- **V-for循环遍历对象时推荐使用in**，语法格式为`(item,name,index)`
  - `item`：迭代时对象的键名键值
  - `name`：迭代时对象的键名
  - `index`：当前元素的索引
- 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

### v-html

定义一个变量：js

```js
myhtml = "<a>不许哭</a>"
```

直接放在div中无法解析，但是可以给`idv`绑定`v-html`就可以了

```vue
<div v-html="myhtml"></div>
```

# DAY 6

demo4

## 动态切换class

`:`的作用是动态绑定，证明绑定的值是变化的，不加，用循环则会出错

```vue
<div id="box">
    <div :class="classobj">动态切换class写法</div>
</div>
<script>
var vm =  new vue({
        el:"#box",
        data:{
            classobj:{
                aa:true,
                bb:true,
                cc:true//不显示谁就给谁写false
            }
        }
    })
    //vue.set(vm.classobj,"dd",true)可以设置再增加一个class
</script>
```

class前的冒号

1、表明`class`名是名称+时间戳，`class`具有唯一性，可转为`id`

```vue
<div :class="_module"></div>
<script>
data(){
	return this.arr.m_class="module_"+(new Date().getTime())       
}
</script>

```

2 、以三元表达式来表示class 

如果存在`titleSrc`就添加`bgImgSet`，如果不存在就没有这个`class`

```html
<div :class="ind.titleSrc?'bgImgSet':''"></div>
```

3、如果存在两个动态`class`可以如下这样写 注意标签上不能写两个`:class`

## 动态切换style

### 对象写法

```vue
<div :style="styleobj">
    对象写法
</div>
<script>
data:{
    styleobj:{
        backgroundColor:"red"//把-改为c大写，red变成字符串
    }
}
//vue.set(vm.styleobj,"fontSize","40px")可以设置再增加一个style
//增加后就可以更改fontsize属性
//vm.styleobj.fontSize="16px"
</script>
```

### 数组写法

```vue
<script>
stylearr[{
background:"red"
}]
//vm.stylearr.push({fontSize:"40px"})
//vm.stylearr.pop()移除效果
</script>
```

## 点击变色

```vue
<div v-if="datalist.length===0">购物车空空</div>
<ul v-else>
	<li v-for="(item,index) in datalist" :class=" current===index?'active':'' " @click="handleclick(index)"> 
        {{item}}
	</li>
</ul>
<script>
 data() {
    return {
      datalist:["首页","列表","购物车"],
      current:2
    }
 },
 methods: {
     handleclick(index){
        this.current = index;
     }
},
</script>
```

### template包装标签

增加外层for循环或if嵌套，不会真正创建在页面

```vue
<template v-if="isshow">       
        <div v-if="item.state===0">未支付</div>
        <div v-if="item.state===1">待发货</div>
        <div v-if="item.state===2">已完成</div>
</template>
```

要显示一起显示，要不显示一起不显示

### 对象和数组的区别

数组有序对象无序

数组数据没名称，对象数据有名称

```js
var o = {  //对象
    x :1,  //该值命名为x
    y : true  //该值命名为y
}
var a = [  //数组
    1,  //该值隐含编码为0
    true  //该值隐含编码为1
]
```

## 列表渲染

### 不设key：

数组被创建后——先创建一个虚拟dom——根据虚拟`dom`在页面中真是的节点插入`dom`——修改——真的虚拟`dom`——映射新的`DOM`，基于老的把相同的`key`摘出，不同的标记并更新——把222成成333，并删除333

![image-20210419153429108](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210419153429108.png)

### 设置key值：跟踪节点身份，重用和重新排序现有节点

设置唯一`id`，合理设置`key`，虚拟`dom`是为了模拟真实`dom`，真实`dom`下很多孩子不只ke所以真实dom

`key`值改成`item`内容，创建虚拟`dom`——111没变化留着，222变化的标记，333继续留着，同步对比

![image-20210419153519911](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210419153519911.png)

**字符串要加冒号**

```vue
<li v-for="(data,index) of datalist":key="data.id"></li>
```

### 数组更新检测

- 检测变动，但不影响原数组，返回值是一个数

  `push()` `pop()`，`shift()`，`unshift() `

  `splice()` `start`，`num `，"替换"

  `sort()`返回对排序后数组的引用

  `reverse()`颠倒数组中元素的顺序，会创新新数组不会改变原数组

- 新数组替换旧数组,因为返回值是新数组

  `filter() `

  `concat()`连接连个数组，返回的是

  `slice()`两个参数`start`，`end`，返回新数组

  `map()`

  ```js
  vm.datalist = vm.datalist.concat(["111111","222222"]);
  ```

- 替换某一元素

  ```js
  vm.datalist.splice(0,1,"替换");
  ```

  或

  ```js
  Vue.set(vm.datalist,0,"替换");
  ```


## 模糊查询

demo5

两种方法都写在了`demo5`中的模糊查询中，一个是过滤器方法，一个是

### 过滤器基础知识

- 注册方式，先注册后使用

  - 全局注册

    可在`new Vue`实例前注册全局

    ```vue
    Vue.filter('过滤器名',function(value){
    return value+"!!!"
    })
    ```

  - 局部注册

    也可以在组件上写局部

    ```vue
    filters:{
    	过滤器名:function(value){
    	return value+"!!!"
    	}
    }
    ```

- 用法     { { 数据 | 过滤器名 } }

  - 在双花括号插值

    ```vue
    {{message | 过滤器名}}
    ```

  - 在`v-bind`中

    ```vue
    <div v-bind:id="id | 过滤器名称"></div>
    ```

- 注意：
  - 过滤器有时同`methods`、`computed`、`watch`一样可以达到处理数据的目的，但又不能替代它们，因为它不能改变原始值。如果一个过滤器的内部特别复杂，可以考虑把它写成一个计算属性，因为计算属性本身带有缓存，可复用性强，而过滤器一般用来做一些简单的操作。
  - 注意：全局注册没有s，组件过滤器有s。

- 参数写法

  - { { message | filterA | filterB } }

    message左侧为参数传给filetrA，filetrA的返回值作为参数传给filetrB，最终结果是filetrB的返回值。

  - { { message | filterA ( ' arg1 ' , arg2 ) } }

    filterA传三个参数，其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

    ![img](https://upload-images.jianshu.io/upload_images/13172338-f2738df4bed6df51.png?imageMogr2/auto-orient/strip|imageView2/2/w/548/format/webp)

  - { { ' a ' , ' b ' | filterB } }

    ' a ' 和 ' b ' 分别作为参数传给filterB

    ![img](https://upload-images.jianshu.io/upload_images/13172338-978a8a5f8d5d5ad3.png?imageMogr2/auto-orient/strip|imageView2/2/w/541/format/webp)

### 箭头函数

当一个箭头函数体只有`return`，则省略大括号和`return`

### js数组 includes()

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似

```js
[1, 2, 3].includes(2); // true
 
[1, 2, 3].includes(4); // false
 
[1, 2, NaN].includes(NaN); // true
```

### 函数写法的基础知识

可以用 { { 函数名 } } 把函数返回值显示在页面，所以可以双向绑定一个全局变量，把函数写在{{}}里，并且在函数体处理变量，返回结果。函数会随着变量改变重新执行。函数返回结果也能用v-for遍历

```vue
<div class="box">
   <input type="text" v-model="mytext">
   <br>
   {{mymethod()}}
</div>
<script>
 data () {
    return {
      datalist : ["aaa","bbb","ccc","dddd","cee","eff","aei"],
      mytext:"",
    }
  },
 methods:{
    mymethod(){
      return this.datalist.filter(item=>item.includes(this.mytext));
    },
  }
</script>
```

## 事件处理器

### 事件函数的参数

当点击事件既想传事件对象有相传其他参数，只需写一个`$event`

```vue
<button @click="handleAdd2($event,2)">add+2</button>
<script>
methods:{
    handleAdd2(event,data){
      this.count += data;
      console.log(event.target);
    }
  }
</script>
```

### 阻止事件冒泡

当一个元素接收到事件的时候 会把他接收到的事件传给自己的父级，一直到`window `。

- #### 在子事件方法中加入e.stopPropagation()

  ```vue
  <script>
   handleLI(e){
        //阻止冒泡
        e.stopPropagation();
        console.log("LI LI LI");
      },
  </script>
  ```

- 在li的`click`后加`stop`

  ```vue
  <ul @click="handleUL">
       <li @click.stop="handleLI">
          11111
       </li>
  </ul>
  ```

- 阻止链接跳转

  ```vue
  <a href="www.baidu.com" @click.prevent>跳转</a>
  ```

### 事件修饰符

`stop` 防止事件冒泡

`prevent` 防止执行预设的行为

`capture` 与事件冒泡的方向相反，事件捕获由外到内

`self` 只会触发自己范围内的事件，不包含子元素

`once` 只会触发一次，如抽奖，只抽一次点击事件失效

`.passive`每次事件产生，就查询是否有`preventDefault`阻止该事件，一般监听`@scroll`，`@touchmove`滚动事件，让浏览器放心，在滚动期间一定不会有事件的，阻止后能防止监听使滑动卡顿。

### 按键修饰符

@keyup="fun" input一输入就能拿到值，不用button了

@keyup.enter="fun" 一会车就能触发。

@keyup.enter.ctrl ="fun" 一会车就能触发。两个键同时按触发。

## 模态框

### v-show

`v-show`指令通过改变元素的`css`属性（`display`）来决定元素是显示还是隐藏。

```vue
<div class="box1">
    <button @click="isShow=true">show</button>
    <div id="overlay" v-show="isShow"></div>
</div>
```

上述就是点击按钮，下面的div蒙版出现

点击`center`蒙版消失，点击蒙版子`div`也会消失，子元素用`stop`阻止冒泡。

```vue
<div id="overlay" v-show="isShow" @click="isShow=false">
      <div id="center" @click.stop="">
      </div>
</div>
```

 或者给父元素加`.self`阻止冒泡

```vue
<div id="overlay" v-show="isShow" @click="isShow=false">
      <div id="center" @click.stop="">
      </div>
</div>
```

## 表单绑定

input text, password, textarea的绑定可以让输入框得值和变量实时改变

input checkbox的值在用户选择复选框时，把复选框的`value`传给绑定的数组。

input radio可以绑定一个字符串变量，获取`value`值

# DAY 7

## DAMO6 购物车

### 知识点

- #### require用法

  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <script type="text/javascript" src="a.js"></script>
      </head>
      <body>
        <span>body</span>
      </body>
  </html>
  ```

  ```js
  function fun1(){
    alert("it works");
  }
  fun1();
  ```

  ```js
  (function(){
      function fun1(){
        alert("it works");
      }
      fun1();
  })()
  ```

  第二种方法使用了块作用域来申明`function`防止污染全局变量，本质还是一样的，当运行上面两种例子时不知道你是否注意到，`alert`执行的时候，`html`内容是一片空白的，即`<span>body</span>`并未被显示，当点击确定后，才出现，这就是**JS阻塞浏览器渲染**导致的结果。

  ```html
  <html>
      <head>
          <script type="text/javascript" src="require.js">			</script>
          <script type="text/javascript">
              require(["a"]);
          </script>
      </head>
      <body>
        <span>body</span>
      </body>
  </html>
  ```

  ```js
  define(function(){
      function fun1(){
        alert("it works");
      }
      fun1();
  })
  ```

  作用：

  防止js加载阻塞页面渲染

  使用程序调用的方式加载js
  
- `disable`

  disabled="布尔值"，当布尔值为真，该标签变成灰色没有作用。当number数=1该按钮变灰锁死。

  ```vue
  <button @click="item.number--" :disabled="item.number==1">-</button>
  ```

- `@change`

  `input`框发生改变触发

# DAY 8

一些知识点

## 修饰符



demo6

### v-model.lazy

`input`失去焦点的时候才更改`mytext`的值。

```vue
<input type="text" v-model.lazy="mytext">
```

### v-model.number

拿到的类型变成数字

### v-model.trim

去首尾空格

## 计算属性

不加括号，先检索`data`，`data`中没有直接检索计算属性。而加了括号反而会去找定义的方法，没找到会报错。

```vue
{{mycomputed}}
<script>
    computed:{
        //首字母大写转换
        mycomputed(){
          return this.myname.substring(0,1).toUpperCase()+this.myname.substring(1)
        }
    }
</script>
```

把函数的返回结果显示在页面

### 区别：

- `methods`

  函数不必需要return

  逻辑处理，没有缓存，执行很多遍

- `computed`

  必须有`return`

  有缓存，下次再用使用缓存结果，所以只执行一次

所以当结果难计算要耗费大量内存的时候，需要多个地方显示的，以及需要调用函数显示爱页面或data in fun()遍历的。使用`computed`。

### 赋值

计算属性不能直接给`v-model`赋值

需要写成

```vue
<script>
computed:{
    isAllcheckedCom:{
      set(data){
        if(data){
          this.arr = this.list;
        }else{
          this.arr=[];
        }
      },
      get(){
        return this.arr.length===this.list.length;
      }
    },
}
</script>
```

## watch

监听状态的改变，可以监听`v-model`绑定的同名变量以及函数，在`watch`中写同名方法就行。

监听，观察，注重过程，不用`return`调用

## mixins 混入

demo6

外面的js也可以写在别的文件中引入，两个页面共用一些事件。并且如果自己的methods里写了同名，会优先使用自己的。

## axios

demo7

实现`ajax`相关操作，vue1.0用`vue-resource`，不在维护，vue2.0以后都用`axios`。

### get方法

![image-20210507171502392](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210507171502392.png)

```js
handleFetch(){
    
   axios.get("../../static/test.json").then(res=>{
   console.log(res.data)
 })
}
```

demo7 axios.vue从猫眼读取`json`数据显示，还有图片怎么显示，直接用链接不行，还要加上一个图片截取接口的字符串

### post方法



## fetch

`w3c`标准，代替`XMLHttpRequest`设计的API太粗糙。

查兼容性网站：can i use

### 基本用法

#### fetch第一个参数

fetch("加载的json文件路径"),

`then`获取到的时`promise`流，要再then一层才能获取到`body`。

获取一层的结果：

```js
<script>
function handleFetch(){
  console.log("fetch",fetch);
        console.log("fetch",fetch);
        fetch("./json/test.json")
        .then(res=>{res.json();console.log('222',res);})   
}
</script>
```

![image-20210507153321605](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210507153321605.png)

用`vue`项目的写法

```js
handleFetch(){

  fetch("../../static/test.json")
  .then(res=>res.text())         //把可读流转换成新的json对象)
  .then(res=>{
    console.log('222',res);
  })
}
```

两层的结果：

```html
<button onclick="handleFetch()">ajax-fetch</button>
<script>
function handleFetch(){
  console.log("fetch",fetch);
        console.log("fetch",fetch);
        fetch("./json/test.json")
        .then(res=>res.json())         //把可读流转换成新的json对象)
        .then(res=>{
          console.log('222',res);
        })
}
</script>
```

![image-20210507153414094](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210507153414094.png)

`json()`返回的是`json`对象，用`text`返回的是字符串.

#### fetch第二个参数method

可以选择`get`还是`post`。默认是`get`，选择`post`时

# DAY 9 

demo9:

## 需求

安装`element-ui`实现蓝湖界面

![image-20210425133737387](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210425133737387.png)

![image-20210425133744383](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210425133744383.png)

![image-20210425133753067](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210425133753067.png)

https://lanhuapp.com/web/#/item/project/stage?pid=7af1d635-5304-492c-b237-009f19f8c130&see=all

帐号：769297539@qq.com

密码：769297539@qq.com

![1](C:\Users\yaotingtinga\Desktop\1.png)

路由，看课程73-83

https://router.vuejs.org/zh/guide/#javascript 理论

理解`router-link`、`router-view`区别

## 路由相关知识点：

### 配置路由

https://www.cnblogs.com/dengyao-blogs/p/11562257.html 路由配置 

### router-link 和router-view对应

<router-link>可以用to来进行跳转，也可以用命名路由的形式进行跳转，命名路由跳转也可以传递参数。

- `to`后面跳转的值为一层（如 /child）则对应`app.vue`中的`router-view`，值为两层，如 /second/child，则对应的是/second组件中的`router-view`。
- `router-link`映射的结果为其对应组件的整个页面内容，如 to='/second/child'，则其对应的`view`会显示`app.vue`**和**/second**和**/second/child等父子组件的整个页面内容。
- 若to='/child'，则得到的页面结果为`app.vue`**和**/child父子组件的整个页面

## width: 100%

### 前提条件：

- 子元素必须是块级元素才能实现宽度的继承
- 父级元素设置了宽度

### 继承谁：

- 当父级元素和子元素只是一般嵌套关系的时候，子元素继承父元素的宽。
- 当子元素浮动时，也可以完整的继承父元素的宽。
- 当子元素为`position: absolute;`的时候，这个时候子元素会逐级向上寻找是否有`position: relative;`的元素。如果有，则继承该元素；如果没有则宽度是相对于body而言。
- 当子元素为`position: relative;`时，`width:100%`是基于父级元素，而不是找`position: relative;`的元素
- --------**特殊**--------当元素被设置了`postion: fixed`的时候，是一直基于body的，其宽度就是body的宽度

## input聚焦

input做了样式后，点击聚焦会有黑色边框，取消用：

```css
input{ outline: none }
```

使输入框直接没用，连字都输入不了：

```html
<input type="text" onfocus="this.blur();">
```

## Element UI样式无法修改

看看是不是优先级不够或类型写错，嵌套出错

```css
/deep/ .el-table{
}
```

## span

<span> 用于对文档中的行内元素进行组合。

<span> 标签没有固定的格式表现。当对它应用样式时，它才会产生视觉上的变化。如果不对 <span> 应用样式，那么 <span> 元素中的文本与其他文本不会任何视觉上的差异。

<span> 标签提供了一种将文本的一部分或者文档的一部分独立出来的方式。

# DAY 10

demo10

https://router.vuejs.org/zh/installation.html 理论

## 使用路由的原因

使用`v-show`也可以实现点击某链接显示连接下的内容，但是路径不会改变，当要把这一页面分享给别人，复制路径就没用了所以要使用路由，路径也会改变。

## 路由配置

安装 npm install vue-router -g

新建子文件夹，随便取名

`index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'
import page1 from '../components/page1'
import page2 from '../components/page2'
import page3 from '../components/page3'

Vue.use(Router) //注册模块,已经创建了全局组件

const routeshhh = [
  {
    path:"/page1",//联动app.vue中的router-link，如果to路径出现"/page1"就会跳转
    component:page1
  },
  {
    path:"/page2",
    component:page2
  },
  {
    path:"/page3",
    component:page3
  }
]

const router = new Router({
  routes: routeshhh, //routes:routes可简写为routes
});

export default router
```

`main.js`中加上

```js
import router from './router
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
```

然后`app.vue`中就可以

```vue
<template>
  <div id="app">
    <!-- 这里的路径随便写，只是起个路径名,但要与index.js中的path一致 -->
    <router-link to="/page1">111</router-link>
    <router-link to="/page2">222</router-link>
    <router-link to="/page3">333</router-link>
    <!-- 组件容器，有几个就显示几次 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
```

## 导航

### 声明式导航（demo10-tabar）

用`router`实现，点击的地方显示高亮

`tag`可以把`router-link`渲染成想要的标签

`active-class`会给被点击被选中路由跳转的元素

### 编程式导航（demo10-nowplaying）

实现跳转到新页面

```js
methods:{
    handleclick(id){
      console.log(id);
      // location.href = '#/page3'
      this.$router.push('/page3');
    }
}
```

### 重定向

当用户打网址http://localhost:8083/，重定向到首页http://localhost:8083/#/page1

index.js

```js
const routeshhh = [
  {
    path:'*',//乱敲网址也返回首页，path:'/'的意思是，只有http://localhost:8083/到首页，与是数组的第一个元素无关，通配符的优先级最低。
    redirect:'/page1'
  }
]
```

## 路由跳转的三种方式

当要在导航栏后面根据点击的id不同出现不同的地址栏和数据。可以使用下面三种方法：

### 动态路由——实现路由跳转

点击不同的详情组件，地址栏显示不同的详情页id。

父页nowplaying.vue

```js
handleclick(id){
  console.log(id);
  // location.href = '#/page3'
  this.$router.push(`/detail/${id}`);
}
```

index.js里配置路由

```js
{
    path:"/detail/:myid",//动态路由,myid只是个变量名，随便。
    component:detail
},
```

### this.$router和this.$route

this.$router是包含整的所有的路由信息

this.$route是当前匹配到的路由信息

### 命名路由

提供跳转的另一方式

index.js

```js
{
    path:"/detail/:id",//动态路由
    component:detail,
    name:"ytt"
},
```

nowplaying

```js
handleclick(id){
  console.log(id);
  // location.href = '#/page3'
  //1 - 路径
  // this.$router.push(`/detail/${id}`);
  //1 - 路由名字
  this.$router.push({
    name:"ytt",
    params:{
      id:id
    }
  })
}
```

### query方式

不用使用动态路由

index.js

```js
{
    path:'/detail',
    component:detail,
}
```

nowplaying

```js
//1 - 路径
// this.$router.push(`/detail/${id}`);
//2 - 路由名字
// this.$router.push({
//   name:"ytt",
//   params:{
//     id:id
//   }
// })
//3 - query方式跳转详情
this.$router.push(`/detail?id=${id}`)
```

## 路由模式

### hash模式(（默认）

#/home

- #### 路由原理：

  location.hash切换

  window.onhashchange监听路径改变

### history模式

/home

- #### 路由原理：

  history.pushState切换

  window.onpopstate监听路径改变



index.js

```js
const router = new Router({
  mode:"history",
  routes: routeshhh, //routes:routes可简写为routes
});
```

## 路由拦截

### 组件守卫

当只需要少数几个组件拦截用这种方法：

实现当用户没有授权，就跳转登陆页面才能使用功能

index.js

```js
{
    path:"/login",
    component:login
},
```

page3

```js
mounted(){
    //检查是否有token，如果没有，重定向到login
    if(!localStorage.getItem('token')){
      this.$router.push('/login')
    }
}
```

### 全局守卫

当很多组件都要靠拦截，就给他们设计全局守卫

index.js

```js
router.beforeEach((to,from,next) =>{
    next; //写上这句，所有都放行,里面什么都不写就所有拒绝
})  //全部路由拒绝，from是从哪来，to是到哪去，next是否放行
```

全局拦截index.js

```js
router.beforeEach((to,from,next) =>{
  let auth = ['/page3','/order','/money','/card']; 
  if(auth.includes(to.fullPath)){
    console.log("验证token");
    if(!localStorage.getItem('token')){
        next('/login')
    }else{
      next()
    }
  }else{
    next();
  }
})
```

### 局部拦截

page3

```js
beforeRouteEnter(to,from,next){
    if(!localStorage.getItem('token')){
        next('/login')
    }else{
      next()
    }
},
```

## 路由懒加载

`vue`会把所有的组件压缩到一个`js`里所以导致首`ping`加载过慢。

首先`index.js`不要写`import`，删除`import`，然后写

```js
{
    path:"/login",
    component:() => import('../components/login.vue')
},
```

一个页面如果有多个组件就把这几个组件分成一组一起下载，不用一个一个切割下载。

例如吧`login`和`page3`组件分成一组组名为`groupytt`，这个的写法，可以去`vue.js`去看，网址在最前面。

```js
{
    path:"/page3",
    // component:page3
    component:()=>import(/* webpackChunkName: "group-ytt" */ '../components/page3.vue')
},
{
    path:"/login",
    // component:() => import('../components/login.vue')
    component:()=>import(/* webpackChunkName: "group-ytt" */ '../components/login.vue')
}
```

# DAY 11

## setTimeout() 

用于在指定的毫秒数后调用函数或计算表达式。

```js
setTimeout(function(){ alert("Hello"); }, 3000);
```

## 匿名函数

匿名函数要想不报错要给函数体外面加一个小括号

```js
(function (){

    //由于没有执行该匿名函数，所以不会执行匿名函数体内的语句。

    console.log("ytt");

})
```

如果要执行匿名函数，则在函数后面加括号或赋值给变量

```js
(function (){

    //此时会输出ytt

    console.log("ytt");

})()
var do = function(){
    //函数体
}
do();
```

如果要传值可以将参数写在括号内

```js
(function (str){

    //此时会输出ytt好帅！

    console.log("ytt"+str);

})("好帅！")
```

## 箭头函数

适用于需要匿名函数的地方

### 基础语法

- 函数有多行语句，加大括号

  ```js
  (param1, param2, …, paramN) => { statements }
  ```

- 函数只有返回值

  ```js
  (param1, param2, …, paramN) => expression
  //相当于：(param1, param2, …, paramN) =>{ return expression; }
  ```

- 只有一个参数时圆括号可有可无

  ````js
  (singleParam) => { statements }
  singleParam => { statements }
  ````

- 没有参数时

  ```js
  () => { statements }
  ```

### 高级语法

- 更短的函数

  当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号

  ```js
  elements.map(element => element.length); 
  ```

- 没有单独的this

  - this的指向

    - 构造函数，this指针指向一个新的对象

    - 严格模式下的函数调用下，`this`指向`undefined`

      严格模式指在函数中添加`use strict`语句，消除`js`代码不安全指出，增加编译效率运行速度。

    - 该函数是一个对象的方法，则它的this指针指向这个对象
    - 箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this`。

  - 箭头函数没有`prototype`属性。

  -  `yield` 关键字通常不能在箭头函数中使用

  - 和 `new`一起用会抛出错误

  - 加大括号必须要写`return`

    ```js
    var func = x => x * x;
    // 简写函数 省略return
    var func = (x, y) => { return x + y; };
    //常规编写 明确的返回值
    ```

  - 返回变量的值要用大括号

    ```js
    var func = () => ({foo: 1});
    ```


## promiss

### 三种状态

- `pending`: 初始状态，不是成功或失败状态。
- `fulfilled`: 意味着操作成功完成。
- `rejected`: 意味着操作失败。

### 基本用法

```js
var promiss = new Promise(function(resolve,reject){
	 resolve('abcd');   //设置成成功状态并给成功后的函数传参
});
    var a = promiss.then(function(res){
    console.log("res",res);     //当成功把值传给res
}).catch(err=>{
    console.log("err",err);     
});
```

```js
    var promiss = new Promise(function(resolve,reject){
        reject('abcd');   //设置成失败状态并给失败后的函数传参
    });
    var a = promiss.then(function(res){
        console.log("res",res);
    }).catch(err=>{
        console.log("err",err);//把值传给了err
    });
```

### promiss.all

将多个`promiss`包装成一个，成功返回一个结果数组，失败返回最先被`reject`的状态。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
//output: Array [3, 42, "foo"]
```

### promiss.race

谁快返回谁的接收或拒绝，返回的是`promiss`

### async

自动包装成`promiss`对象

```js
async function fn(){
    return "abc";
}
console.log(fn())
```

没加输出`abc`，加了输出的是`promiss`

```js
Promise {<fulfilled>: "abc"}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "abc"
```

### await

注意

- `await`必须要写在函数里
- 写`await`的函数必须用`async`标识

```js
function aaa(){
    console.log("1111");
    return new Promise((resolve,reject)=>{    //写成匿名函数传两个参数
        setTimeout(()=>{resolve("abd")},2000)
    })
}

async function f5(){
    var a = await aaa();
    console.log(a);
}
f5();
```

作用：阻塞卸载await后面的所有代码，当`then`返回时，才会执行下面代码。

```js
async function f3(){
    return new Promise((resolve,reject)=>{    //写成匿名函数传两个参数
        setTimeout(()=>{resolve("abd")},2000) //匿名函数体是setTimeout函数，里面又有一层匿名函数，延时两秒执行内部函数并设置成功时的参数
    })
}

function f4(){
    return "f4"
}

async function f5(){
    var c = await f3();
    console.log("qqq");
    console.log(c);
}
f5();
```

结果：（2s后）

qqq
abd

如果是`reject`要用`try catch`，注释部分运行会报错，`reject`后面的代码不执行

````js
function f4(){
    return Promise.reject('sss');
}

async function f5(){
    // var c = await f4();
    // console.log(c);
    // console.log("qqq");
    try{
        var c = await f4();
        console.log("111");
    }catch(e){
        console.log(e);
    }
}
f5();
````

# DAY 12

## 组件注册方式

### 注意事项

组件名不能用驼峰写法，只能用`-`

`template`包含一个根节点

组件是孤岛，无法直接访问外面的组件和方法，可以通信

子组件data必须写成函数写法

```js
data(){
	return{
		myname:"ytt-child"
	}
}
```

父组件可以写成

```
data:{
	myname:"ytt-parent"
}
```

### 全局组件

全局的组件，每一个组件都可以用全局的组件,如`demo11`定义一个全局父组件`navbar`，一个全局父组件`tabbar`，一个全局孩子组件`child`，两个父组件都可以引用。

```vue
<navbar></navbar>
<tabbar></tabbar>
//全局navbar
Vue.component("navbar",{
  template:`
      <div style="background:yellow;">
        <button @click="handleBack">返回</button>
        <span>导航栏</span>
        <button @click="handleHome">首页</button>
        <child></child>  <!--引用处-->
      </div>
    `,
    methods:{
      handleBack(){
        console.log("返回");
      },
      handleHome(){
        console.log("首页");
      }
    }
})
//tabbar
Vue.component("tabbar",{
    template:`
      <div style="background:red">
      tabbar
      <child></child>   <!--引用处-->
      </div>
    `
})
//child
Vue.component("child",{
    template:`
      <div>child</div>
    `
})
```

### 局部组件

局部组件只有他的直系父级能用，`tabbar`下定义的组件，只有`tabbar`可以用。

```js
 Vue.component("tabbar",{
    template:`
      <div style="background:red">
      tabbar
      <child></child>
      <tabbarchild></tabbarchild>
      </div>
    `,
    components:{
      "tabbarchild":{
        template:`<div>tabbarchild</div>`
      }
    }
  })
  Vue.component("child",{
    template:`
      <div>child</div>
    `
  })
```

## 父传子

父亲通过属性把参数传给孩子，孩子通过props接收父亲传来的参数。props有如下三种用法：

### 只声明要传递哪些属性

```js
props:["mytitle","myshow"]
```

### 声明属性的类型

不符合会警告，myshow必须是布尔类型，直接`myshow="true"`传的是字符串类型。`:`是指令`v-bind`的缩写。

```js
 props:{
   mytitle:String,
   myshow:Boolean   //属性验证，如果不是这个类型就
 }
```

### 声明属性的默认名字

如果没有定义名字就，设定默认名字

```js
props:{
    mytitle:{
      type:String,
      default:"默认名字"
    },
    myshow:{
      type:Boolean,
      default:true
    }
}
```

整体代码：

```js
<template>
  <div class="hello">
    <navbar mytitle="返回" :myshow="false"></navbar>
    <navbar :myshow="true"></navbar>
    <navbar mytitle="首页"></navbar>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component("navbar",{
  template:`<div style="background:pink">
    <button v-show="myshow">返回</button>
    <span>导航-----{{mytitle}}</span>
    <button v-show="myshow">登录</button>
  </div>
  `,
  props:{
    mytitle:{
      type:String,
      default:"默认名字"
    },
    myshow:{
      type:Boolean,
      default:true
    }
  }                 
})
```

## 子传父

```js
vm.$emit(event, data)
```

触发当前实例上的事件,并把`data`传给事件，`emit`事件要和自定义事件匹配上。被监听事件函数会自动传一个data参数给父级函数中获取到值。

```vue
<div class="hello">
  <!-- 父组件的监听事件，是自定义的 -->
  <child2 @myevent="handleEvent"></child2>  
</div>
<script>
    Vue.component("child2",{
      data(){
        return{
          money:100000000
        }
      },
      template:`
        <div style="background:#c9c0d3">
      	  // 点击自组件触发点击事件
          child-<button @click="handleclick">click-child</button>
        </div>
      `,
      methods:{
        handleclick(){
          //子事件里触myevent事件传子参数money
          this.$emit("myevent",this.money) 
        },
      }
    })
	export default {
    	methods:{
      		handleEvent(data){
        	console.log(this.myevent);
        	console.log(data);
    	}
 	 }
	}
</script>
```



# DAY 13

接口相关配置

## 从后端获取数据

首先在接口网站，从后端获取数据

这里采用的是淘宝的接口网站，新建一个仓库，填写仓库名，进入仓库，新建接口

<img src="C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210510152507587.png" alt="image-20210510152507587" style="zoom: 67%;" />



点击提交后点开刚刚新建的接口，在接口中点击编辑

![image-20210510153647334](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210510153647334.png)

在响应模板中点击导入

![image-20210510153918019](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210510153918019.png)

导入`json`文件，正常项目中都是先请求参数然后，从后端返回数据。保存后点击链接，复制链接。

```json
{
  "list": [
    {
      "name": "商品1",
      "price": 10,
      "number": 1,
      "id": 1,
      "limit": 5,
      "pic": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505-smallskin-3.jpg"
    },
    {
      "name": "商品2",
      "price": 11,
      "number": 2,
      "id": 2,
      "limit": 6,
      "pic": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184-smallskin-5.jpg"
    },
    {
      "name": "商品3",
      "price": 12,
      "number": 3,
      "id": 3,
      "limit": 7,
      "pic": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157-smallskin-2.jpg"
    }
  ]
}
```

![image-20210510154153274](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210510154153274.png)

![image-20210510154338162](C:\Users\yaotingtinga\AppData\Roaming\Typora\typora-user-images\image-20210510154338162.png)

## 项目导入

在项目中，我们安装`axios`，在`axios.js`文件中导入`axios`依赖，配置`axios`。具体见`day 8`中的配置。

在项目中新建文件夹api，里面添加`index.js`。导入`axios`依赖。把上面复制的连接放上去，后端设置的是`get`还是`post`。

```js
import service from '../../axios'
export function getList() {
    return service({
        url: 'http://rap2api.taobao.org/app/mock/data/1960874',
        method: 'get',
        headers: {
            'ticket': sessionStorage.getItem('ticket') ? sessionStorage.getItem('ticket') : ''
        }
    })
}
```

在需要导入的vue文件引入index文件,在methods中添加，在create中运行method函数。

```js
import {getList} from './api/index'
methods: {
    getListInfo(){
      console.log("fffffff")
      getList()
        .then(res=>{
          console.log('res', res)
        })
        .catch(err=>{
          console.log('err',err)
        })
    }
}
created(){
    this.getAllComListInfo();
    this.getListInfo();
},
```

# DAY 14

一些小知识点：

## 事件冒泡和事件捕获

### 事件冒泡

从事件目标到父级，只要绑定了事件就执行

```js
var dv1 = document.getElementById('dv1');
var dv2 = document.getElementById('dv2');
var dv3 = document.getElementById('dv3');

dv1.onclick = function () {
    console.log(this.id);

};
dv2.onclick = function () {
    console.log(this.id);

};
dv3.onclick = function () {
    console.log(this.id);
    window.event.cancelBubble = true;
};
```

### 事件捕获

从事件目标到子级，只要绑定了事件就执行

```js
var dv1 = document.getElementById('dv1');
var dv2 = document.getElementById('dv2');
var dv3 = document.getElementById('dv3');

div1.addEventLister('click',f1,true);
div2.addEventLister('click',f1,true);
div3.addEventLister('click',f1,true);

function f1(){
    console.log(this.id);
}
```

`addEventListener`方法用来为一个特定的元素绑定一个事件处理函数.三个参数，分别是‘没有on的事件类型’，‘事件处理函数’，‘控制事件阶段’，第三个参数是`boolean`类型，默认是`false`，表示在事件冒泡的阶段调用事件处理函数，像上图中传入`true`，就表示在事件捕获的阶段调用事件处理函数。

## 文本水平垂直居中:

![img](https://img-blog.csdn.net/20140329182925796?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveWFuZ3poaWhlbGxv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

水平居中要在父元素

```css
text-align:center;
```

垂直居中要在父元素设置行高等于line-height

```css
.test{
    line-height: 50px;
    flost:left;
    height: 50px;
}
```

