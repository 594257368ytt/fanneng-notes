预览，pdf可以直接预览，word只能通过添加前缀。

```js
 if (
	res.data.data.fileExtName === "pdf" ||
	res.data.data.fileExtName === "PDF"
) {
	window.open(res.data.data.fileUrl);
} else {
	window.open(
  "https://view.officeapps.live.com/op/view.aspx?src=" +
    res.data.data.fileUrl
	);
}
```

下载，虽然word可通过url直接下载但不带文件名，所以owrd,pdf可以采用同样的方法下载。

```js
downloadFile(url, filename, fileExtName) {
  var x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = "blob";
  x.send();
  x.onload = () => {
    this.downloadByContent(x.response, filename, fileExtName);
  };
},
downloadByContent(content, fileName = "", fileExtName) {
  let url = window.URL.createObjectURL(new Blob([content]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName + "." + fileExtName);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
},
```

