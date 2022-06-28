# 扩展阅读2：ROS2客户端库RCL介绍|API vs CLI vs GUI

大家好，我是一口月饼一口螺狮粉的小鱼，别的不说，就小鱼家楼下10元一份的螺狮粉真是一绝，每次吃完一定拉肚子，哈哈。

## 一、CLI vs GUI vs API
今天别的不说，就结合ROS2的客户端库讲一讲API，说起API想必大家都听过GUI和CLI，所以GUI和CLI是啥呢？

### 1.1 GUI和CLI

- GUI（Graphical User Interface）就是平常我们说的图形用户界面，大家用的Windows是就是可视化的，我们可以通过鼠标点击按钮等图形化交互完成任务。
- CLI（Command-Line Interface）就是命令行界面了，我们所用的终端，黑框框就是命令行界面，没有图形化。

很久之前电脑还是没有图形化界面的，所有的交互都是通过命令行实现，就学习机器人而言，命令行操作相对于图形化优势更加明显。

### 1.2 API是什么
知道了CUI和CLI是根据是否有图形界面划分的，那API又是什么？

API（ Application Programming Interface）应用程序编程接口。比如你写了一个库，里面有很多函数，如果别人要使用你这个库，但是并不知道每个函数内部是怎么实现的。使用的人需要看你的文档或者注释才知道这个函数的入口参数和返回值或者这个函数是用来做什么的。对于使用者来说来说 ，你的这些函数就是API。（摘自知乎）

API在不同语言中的表现形式不同，在C和C++表现为头文件，在Python中表现为Python文件。

### 1.3 RCL是什么?
RCL（ROS Client Library）ROS客户端库，其实就是ROS的一种API，提供了对ROS话题、服务、参数、Action等接口。


## 二、ROS2客户端库
ROS的客户端库就是上面所说的RCL，不同的语言对应着不同的rcl，但基本功能都是相同的。

比如Python语言提供了rclpy来操作ROS2的节点话题服务等，而C++则使用rclcpp提供API操作ROS2的节点话题和服务等。

所以后面我们使用Python和C++来编写ROS2节点实现通讯等功能时，我们就会引入rclpy和rclcpp的库。
![rcl与rmw](扩展阅读ROS2客户端库RCL介绍/imgs/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6bG86aaZUk9T,size_20,color_FFFFFF,t_70,g_se,x_16.png)
上面这张图时ROS2，API的实现层级，最新下面的是第三方的DDS，rmw（中间件接口）层是对各家DDS的抽象层，基于rmw实现了rclc，有了rclc，我们就可以实现各个语言的库，大家都知道C语言是各个语言的鼻祖（汇编除外）所以基于rclc，ROS2官方实现了rclpy和rclcpp.


基于rclpy和rclcpp我们就可以实现上层的应用了，这张ros2的内部api架构图小鱼也算大概说清楚了。

有的同学可能还想着既然基于rclc可以实现多个语言的ROS2的库那rcljava有没有,有的:https://github.com/esteve/ros2_java,还有很多，小用户这里搜集放一下,说不定大家以后会用得到，比如在AndroidAPP上或者在Web上开发可以使用rcljava或rclnodejs。
| 语言                                                         | 地址                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| python-rclpython                                             | https://github.com/ros2/rclpy                  |
| c++ - rclcpp                                                 | https://github.com/ros2/rclcpp                 |
| java-rcljava                                                 | https://github.com/esteve/ros2_java            |
| rust-rclrust                                                 | https://github.com/ros2-rust/ros2_rust         |
| node.js-rclnodejs                                            | https://github.com/RobotWebTools/rclnodejs     |
| go-rclgo                                                     | https://github.com/juaruipav/rclgo             |
| lua-rcllua                                                   | https://github.com/jbbjarnason/rcllua          |
| kotlin-rclkin                                                | https://github.com/ros2java-alfred/ros2_kotlin |
| swift-rclswift                                               | https://github.com/atyshka/ros2_swift          |
| c#-rclcs                                                     | https://github.com/RobotecAI/ros2cs            |

## 三、总结                                           
今天终于算是把整个ROS2的框架给理清楚了，接下来需要探索的主要是上层应用了，至于ROS2的底层实现，以后有机会小鱼再带大家一起学习。                      

