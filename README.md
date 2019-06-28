# create-file-arv / 创建文件

    根据输入创建React/Vue文件，当前版本1.0.10。

>v1.0.10 修复bug

>v1.0.9 新增文件名配置项，修复bug

>v1.0.8 新增模版注释，可配置文件创建人

## 选项说明

选项|参数|说明
-|-|-
-r,--react|[@c/path/]name[.ext]|创建一个react文档,@c为路径别名
-v,--vue|[@c/path/]name[.ext]|创建一个vue文档
--set|key=value / list|设置用户选项 / 打印配置列表
n,--anName|string|注释里的文件名
-V,--version||版本信息
-h,--help||帮助信息

## 默认设置
配置名|默认值|说明
-|-|-
jsext|js|js文件默认后缀
csext|css|css文件默认后缀
@c|components|预置路径
@v|views|预置路径
@p|pages|预置路径

## --set命令可以配置的选项

可配置项|说明
-|-
jsext|js文件默认后缀
csext|css文件默认后缀
author|用户名，放在注释里面
@xx|以@开头的路径
cssPrefix|css的class名的前缀

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