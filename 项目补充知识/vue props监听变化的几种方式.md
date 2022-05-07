## computed 计算属性

使用场景：当pros传递过来的值不能直接使用的时候，就可以使用计算属性了。

比如：需要将字符串拼接后展示。

计算属性会对计算的数据进行缓存，多次访问计算属性，会立即返回结果，而不必再次执行计算。

## methods 方法

上面计算属性，通过methods也可以实现，但methods不会进行缓存，而且methods通常用来处理业务逻辑。

## watch 侦听器

使用场景：改变props的初始值

##### 单向数据流

父级 prop 的更新会向下流动到子组件中。

当我们需要在子组件中修改父组件传递过来的props时，如果直接更改，vue会报错。

##### 解决方案

为了不直接修改props的值，可以在data中，用props初始化一个data属性，以后更改这个data属性即可。

但是这会导致，父组件变化时，该data属性不会更新(`注意`：只针对基本类型，如果是引用类型，仍旧是变化的。)

此时为了更新这个data属性，就需要使用侦听器来监听props的变化。

## 深度监听

使用场景：当监听到某个值变化后，执行异步请求。

- 基本类型

```cpp
watch: {
   msg(newV,oldV) {
     // do something
     console.log(newV,oldV)
   } 
}
```

引用类型

1. 计算属性(推荐)
    先通过计算属性得到引用类型的内部某个字段，再使用侦听器监听该字段的变化

```js
computed: {
    isShow() { 
        return this.config.role.isShow
    }
},
watch: {
    isShow(newV,oldV) {
        // do something
        console.log(newV,oldV)
    }
}
```

2. deep

```js
 watch: {
  isShow:{ //深度监听，可监听到对象、数组的变化
      handler (newV, oldV) {
        // do something, 可使用this
        console.log(newV,oldV)
      },
      deep:true
     }
},
```

