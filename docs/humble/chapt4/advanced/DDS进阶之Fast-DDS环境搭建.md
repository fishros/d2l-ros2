
大家好，我是小鱼，昨天被群友在群里催了DDS相关的文章里，说好的来源码体验一下DDS来着，小鱼不能再咕咕咕了，所以今天就分享一下，FastDDS的安装和体验。

## 1.论FastDDS的三种打开方式
**FastDDS和普通ROS包一样，有二进制安装、源码编译、Docker三种安装方式。**

因为官方把二进制和Docker放到了官网。。
而且要填写个人信息才能下载。。
而且下载速度超级超级慢。。
而且不方便观摩源码。。
所以小鱼带你一起从源码进行安装。

本来想做成一键安装的，省的大家敲脚本了！！

爱一个人绝对不能惯着他，鱼粉也是，为了让大家多复制粘贴时多思考一下（其实是为了凑文章字数），小鱼就带大家一起一步步安装编译源码

不过源码安装也很简单，大家不要害怕。。

因为DDS和ROS2相关，我们也可以使用colcon来编译，就不用cmake了(有需要cmake的自行到官网找)

## 2.源码编译安装FastDDS

下载编译DDS分为三步，第一步如果你已经安装了ROS2可以跳过。。

#### 1.安装工具和依赖
```
sudo apt install python3-colcon-common-extensions python3-vcstool zip openjdk-8-jdk  -y
sudo apt-get install -y libasio-dev
```
#### 2.创建目录，下载仓库
```
mkdir -p fastdds_ws/src 
cd fastdds_ws
wget https://downloads.gradle-dn.com/distributions/gradle-6.4-bin.zip
unzip gradle-6.4-bin.zip 
wget http://fishros.com/tools/files/fastrtps.repos && vcs import src < fastrtps.repos
```

下载源码
```
git clone https://ghproxy.com/https://github.com/eProsima/foonathan_memory_vendor.git -b v1.2.1 src/foonathan_memory_vendor
```

#### 3.编译

```
colcon build
cd src/fastddsgen/ &&  gradle assemble
```

#### 最后一步:配置环境变量
xxx是你的目录前缀
```
echo 'source xxx/fastdds_ws/install/setup.bash' >> ~/.bashrc
echo 'export PATH=$PATH:xxx/fastdds_ws/gradle-6.4/bin/' >> ~/.bashrc
echo 'export DDSGEN=xxx/fastdds_ws/src/fastddsgen/scripts' >> ~/.bashrc
```

## 3.HelloFish例程

DDS使用的RTPS，就是Real-Time Publish Subscribe协议，其实和ROS与ROS2中的发布订阅的感觉时一样的，所以我们就跑一个例程来收发消息，消息内容就叫`HelloFish`

小鱼写的程序已经准备好了，放到了github上，大家可以直接下载下来编译测试哦~

### 下载代码
```
git clone https://github.com/fishros/dds_tutorial.git
```

### 编译例程

```
cd dds_tutorial/examples/01-hellofishros
mkdir build && cd build
cmake .. 
make
```
### 执行例程
开一个终端
```
./DDSHelloFishRosPublisher  
```
再开一个终端

```
./DDSHelloFishRosSubscribe
```
### 查看结果
正确结果像下面这样子，已经证明一切OK了~
![DDS发布订阅测试](https://img-blog.csdnimg.cn/69d6079ecd16442cb3c6824b742ae705.png)

## 4.总结
看到熟悉的发布订阅是不是很神奇，FASTDDS底层采用了多种协议进行数据的传输，包括不靠谱但真的很快的UDP，靠谱但是不怎么快的TCP，还有感觉不传输的内存交换（SHM)。

为了给大家展示一下什么叫做低产（懒），小鱼决定明天再给大家讲解代码~
