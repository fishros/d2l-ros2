# 扩展阅读4:Git

## 1.Git是什么？

Git是目前世界上最先进的分布式版本控制系统（没有之一）

简单理解可以帮你存储代码的地方，防止代码丢失

### 2.Git安装

一句话的事情

```
sudo apt-get install git
```

![image-20210720210220100](扩展资料4-Git介绍安装/imgs/image-20210720210220100.png)

## 3.下载别人的代码

国外有github,gitlab国内有gitee，ROS2的源码就在github上，大家可以通过下面的指令下载一份代码到本地，git上的名词叫clone-克隆。

```
git clone 地址
```

比如克隆一个ros2的例程

```
git clone https://github.com/ros2/examples src/examples -b foxy
```

