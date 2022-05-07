```js
// 上传文件
export function UploadImg(params) {
  return service({
    url: apiUrlNew + '/v1/file',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      ticket: sessionStorage.getItem('ticket') ? sessionStorage.getItem('ticket') : 'MTM4NDA3MTM1MjUyOTU1NTQ1OCNERkE5MjM2Mi1GOTFBLTQwQzMtODBEQy1GNzE4NjlDMTFGNzAPC'
    }
  })
}
```

```js
    afterRead(file) {
      console.log(file.file, typeof file.file)
      let formData = new FormData()
      formData.append('file', file.file)
      UploadImg(formData).then(res => {
        if (res.data && res.data.code === '0' && res.data.success && res.data.success === true) {
          if (res.data.data) {
            console.log('this.fileList :>> ', this.fileList)
          }
        }
      })
    },
```

