rettier3.7以上会优先读取项目根目录下的editorconfig or prettier config，如果有，就不会使用vscode setting中的设置，所以最好每个项目都配置一个单独的 prettier 配置 文件。 并且在.editorconfig 中没法配置行末不加分号，所有，只能配置一个 prettier文件了。 我最终在项目下新建了一个 .prettierrc 文件，内容如下： { "printWidth": 300, "tabWidth": 2, "singleQuote": true, "semi": false }

文件在外面文件夹