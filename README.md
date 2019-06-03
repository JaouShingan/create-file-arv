# create-file / 创建文件

根据输入创建React的js和css文件。


## 选项说明

选项|参数|说明
-|-|-
-r,--react|[@c|path/]name[.ext]|创建一个react文档,@c为路径别名
-v,--vue|[@c|path/]name[.ext]|创建一个react文档
--set|key=value|设置用户选项


## 默认设置
配置名|默认值|说明
-|-|-
jsext|js|js文件默认后缀
csext|css|css文件默认后缀
@c|components|预置路径
@v|views|预置路径
@p|pages|预置路径

## 使用范例

``
    cf -r @c/abc/example
``

 执行命令后，将在components/abc/example文件夹下创建index.js和index.css文件

``
    cf -r @c/abc/example.js
``

 执行命令后，将在components/abc文件夹下创建example.js和example.css文件

``
    cf --set @abc=abc
``

 执行命令后，可以配置用户自己的预置路径