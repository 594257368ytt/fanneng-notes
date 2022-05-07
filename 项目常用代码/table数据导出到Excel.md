是有些牛人已经把这个功能封装成组件了，但每个人的封装逻辑五花八门，组件的功能也很有限，不一定真能完全符合自己的业务需求，找相应的API也很麻烦，存在不太敢用，不会用等问题，那么本文将教你**如何自己封装，如何自己自定义相关功能，如何自定义Excel的样式** ，尤其是导出excel后自定义样式，这在一些现存封装好的组件是不好实现的，本文可以实现！
**本文导出Excel方法的优点：** 网页上的数据与导出Excel之后的数据完全独立，也就是说你导出Excel之后的内容与网页没有直接联系，这意味着数据导出到Excel后有非常强的**1定制性** ，实在不理解这句话也没关系，本文看完你自然就明白了。**2能跨浏览器兼容，甚至是某E浏览器。3导出非常快，不卡顿！**
**一、使用脚手架创建一个Vue项目，在生成的src目录下创建exportToExcel.js文件(名称自取), 并且到App.vue里面快速模拟生成一份表格数据**
1、我这里简单模拟网页上一份表格数据，使用的是iview的table组件，网页上展示的表格的组件你可以用你自己喜欢的组件，我这里做演示用，你完全可以不跟我一样；

```html
<style lang="less">
</style>
<template>
  <div>
    <h2>这是一个使用iview的table组件，做展示用，你当然可以在自己的项目里用自己想要的任何table组件</h2>
    <Table :columns="column" :data="tableData"></Table>   //iview的Table组件
    <Button @click="toExcel">导出表格数据到Excel</Button>  //导出excel的按钮
  </div>
</template>
<script>
import  transform  from './exportToExcel.js'     //这个方法来源于二步骤封装的方法，往下看
export default {
  name:'App',               //这是一个父组件，名称为App.vue
  data(){
    return {
      tableData:[],        //表格数据
      column:[]			   //表格的列
    }		
  },
  methods:{
    toExcel(){
 //调用我们封装好的方法，传3个参数过去，分别为：数据，文件名，回到函数(可根据自己需求决定回调是否需要)
      transform(this.tableData, '我是文件名', this.callback)  
    },
    callback(info){
      console.log(info)
    }
  },
  created(){
    //模拟网络请求
    this.tableData = [
      {index:1,name:'我是1号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:2,name:'我是2号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:3,name:'我是3号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:4,name:'我是4号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:5,name:'我是5号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:6,name:'我是6号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:7,name:'我是7号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:8,name:'我是8号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:9,name:'我是9号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:10,name:'我是10号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:11,name:'我是11号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:12,name:'我是12号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:13,name:'我是13号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:14,name:'我是14号',age:18,sex:'女',hobby:'web',hair:'thick',salaried:'99999999'},
      {index:15,name:'我是15号',age:18,sex:'男',hobby:'web',hair:'thick',salaried:'99999999'}
    ]
    this.column = [
        {key:'index',title:'序号',width:120},
        {key:'name',title:'姓名',width:120},
        {key:'age',title:'年龄',width:120},
        {key:'sex',title:'性别',width:120},
        {key:'hobby',title:'爱好',width:120},
        {key:'hair',title:'发量',width:120},
        {key:'salaried',title:'薪水',width:120}
      ]
  }
}
</script>
```

**二、进入exportToExcel.js文件，写导出业务逻辑代码，也就是上面对应的transform这个方法**
书写思路：采用HTML字符串拼接的方法，拼接出一个table，即可显示到Excel；**换句话来说使用HTML的语法写出来的table能展示到excel上面，还能携带样式！

```js
var idTmr;
//自己定义一个函数transform，在里面写我们的业务逻辑
function transform(table, name, callback) {  //table为表格数据,name为导出文件名,
                        //callback为导出完毕回调,方便你知道导出完成了(可根据自己需求决定是否需要)
  let tableInnerHTML = ''
  let headerData = ['序号','姓名','年龄','性别','爱好','发量','薪水']
  let bodyData = table      //这里对应是表格数据，我们只需要传过来即可
    //拼接完全使用thead、tbody、tr、td、th，并且相应的tr、th、td里可以写一些类似colspan(决定占几列)
    //rowspan(决定占几行)的属性、可以用作合并行、合并列等高级操作
    tableInnerHTML += '<thead><tr>';    //头部部分开始拼接！
    tableInnerHTML += `<th colspan=${headerData.length} 
    				style='background:#CCFFFF;border:solid;'>` + "程序员的将来" + "</th></tr>"
    tableInnerHTML += '<tr>'  
    headerData.forEach(item => {           
            tableInnerHTML += "<th rowspan='1' style='background:#FFFFCC;border:solid'>"
            			  + item + "</th>"
        })
   tableInnerHTML += '</tr></thead>';     //头部部分结束
    tableInnerHTML += '<tbody>'           //身体部分开始
    bodyData.forEach(item => {                      
    tableInnerHTML += "<tr>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.index + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.name + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.age + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.sex + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.hobby + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.hair + "</td>"
     tableInnerHTML += "<td align='center' style='border:solid'>" + item.salaried + "</td>"
        tableInnerHTML += "</tr>"
    })
        tableInnerHTML += '</tbody>';    //身体结束
//------------OK，到此为止拼接工作做完，也就是基本的数据已经被拼接成表格了--------------------
//tip开始(下面还有个tip结束的位置)
/*-------从tip开始到tip结束的过程是判断浏览器类型步骤，做兼容性处理！对于你来说你完全可以不用
		 深入理解这里面的逻辑，直接复制到自己的项目里去，不会存在任何浏览器兼容性的问题！*/
    function getExplorer() {
      var explorer = window.navigator.userAgent;
      if (explorer.indexOf('MSIE') >= 0) {
          return 'ie';        // ie
      } else if (explorer.indexOf('Firefox') >= 0) {
          return 'Firefox';   // firefox
      } else if (explorer.indexOf('Chrome') >= 0) {
          return 'Chrome';    // Chrome
      } else if (explorer.indexOf('Opera') >= 0) {
          return 'Opera';     // Opera
      } else if (explorer.indexOf('Safari') >= 0) {
          return 'Safari';    // Safari
      };
    };
 
    if (getExplorer() !== 'Safari' && name.substr(-1, 4) !== '.xls') {
        name += '.xls';
    }
    if (getExplorer() === 'ie') {
        var curTbl = table;
        var oXL = new ActiveXObject('Excel.Application');
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand('Copy');
        xlsheet.Paste();
        oXL.Visible = true;
        try {
var fname=oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls');
        } catch (e) {
            print('Nested catch caught ' + e);
        } finally {
            oWB.SaveAs(fname);
            // oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = setInterval(Cleanup(), 1);
        }
    } else {
        tableToExcel(tableInnerHTML, name, callback);   /*在这调用下面的一个方法，传入拼接完成
                                        	  的表格，文件名，回调函数。该方法是干嘛的请往下看*/
    }
 //tip结束
}   //此括号结束，我们自己封装的transform方法也结束了！90%的逻辑完成了！
 
/*下面的两个函数对于你来说你也完全不用深入理解里面的逻辑，你只要知道，他是在帮助你做转换，帮助你
  将拼接好的HTML字符串模板真正地转换并且输出到Excel里面去，直接当成固定书写方法，直接拿来用即可*/
function Cleanup() {
    window.clearInterval(idTmr);
}
let tableToExcel = (function () {
    let template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>';
    let format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; });
    };
    return function (table, name, callback) {
        let ctx = { worksheet: name || 'Worksheet', table: table };
        let blob = new Blob([format(template, ctx)]);
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;     //这里这个name就是对应的文件名！
        a.click();
        a.remove();
        callback('success');    /*这里调用我们自己传入的回调方法，这样导出Excel完成后你就能
        						 在外面知道导出完毕，并且再往下做自己其他的逻辑*/
    };
})();
export default transform;    //导出自己封装的transform方法
```

