# 说明

这是一个中地数码针对JavaScript的整体的包管理器，用于维护所有的js依赖。

---
## 安装

> 安装只需一次即可

### Windows
下载对应的代码，打开`cmd控制台`，进入对应的文件`根路径`。

``` shell
cd WebClient-CDN
npm install
```

### Linux
下载对应的代码，打开`terminal终端`，进入对应的文件`根路径`。

``` shell
cd WebClient-CDN
npm install
```

---
## 使用
``` shell
npm start
```

> 只需一台机器启动后，服务端口为8800，其他人在使用这个包管理器的时候就只需下面的简单的语法了

### 内网使用

~~~ html
//这里是引入基本的三方库如jquery，bootstrap等
<script ip="xx.xx.xx.xx" sockent="8800" include="jquery,moment" src="../../libs/zondyclient/include-lib.js"></script>

//这里是引入常见的地图脚本以及插件
<script ip="xx.xx.xx.xx" sockent="8800" include="elasticsearch,geojson,turf" src="../../libs/zondyclient/include-leaflet.js"></script>
~~~

*注意：xx.xxx.xx就是你使用npm start命令的那台机器的ip*

### 外网使用
> 去掉ip和socket即可. 实际上是走的www.smaryun.com的外网ip地址

~~~ html
//这里是引入基本的三方库如jquery，bootstrap等
<script include="jquery,moment" src="../../libs/zondyclient/include-lib.js"></script>

//这里是引入常见的地图脚本以及插件
<script include="elasticsearch,geojson,turf" src="../../libs/zondyclient/include-leaflet.js"></script>
~~~

## 帮助
**如果还有不明白的地方，请咨询基础平台、创新中心的潘卓然.**
+ qq: 398809724
+ 微信：18064124285
+ mail: panzhuoran.parndeedlit@mapgis.com
