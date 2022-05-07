```vue
<van-collapse v-model="energySign">
    <van-collapse-item :title="energySign.length>0 ?'收起':'查看详情'" name="1">
      <div class="energySign"></div>
    </van-collapse-item>
</van-collapse>
```

```js
data:{
    return(){
    	energySign: ['1'],
    }
}
```

