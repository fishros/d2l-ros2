# ROS2 代码模板

增加该部分内容主要是为了大家写代码的时候方便复制粘贴，本工程主要代码来自国外大佬开源仓库（mikeferguson/ros2_cookbook），小鱼根据日常使用需求和最新的ROS2特性进行了增改。

该部分工程分为以下几个部分：

 * 客户端库
   * rclcpp [API](http://docs.ros2.org/latest/api/rclcpp/)
     * [节点和组件](codebook/rclcpp/nodes.md)
     * [参数](codebook/rclcpp/parameters.md)
     * [点云处理](codebook/rclcpp/pcl.md)
     * [时间](codebook/rclcpp/time.md)
     * [TF2](codebook/rclcpp/tf2.md)
     * [解决方案](codebook/rclcpp/workarounds.md)
   * rclpy [API](http://docs.ros2.org/latest/api/rclpy/)
     * [节点](codebook/rclpy/nodes.md)
     * [参数](codebook/rclpy/parameters.md)
     * [时间](codebook/rclpy/time.md)
     * [TF2](codebook/rclpy/tf2.md)
 * [Launch](codebook/pages/launch.md)
 * [通信相关 (DDS & CycloneDDS)](codebook/pages/networking.md)
 * 命令行工具
   * ```ros2 run <pkg> <node>```
   * ```ros2 node list```
   * ```ros2 topic list```
   * ```ros2 topic info <topic_name> --verbose``` Qos细节查看.
   * ```ros2 param list```
   * [colcon](codebook/pages/colcon.md) 构建工具.
   * ```ros2 doctor --report``` gives tons of information.
* [CMake](codebook/pages/cmake.md)
* URDF
   * [Gazebo插件配置](codebook/urdf/gazebo_plugins.md) 
   * [Xacro](codebook/urdf/xacro.md) 
   * [URDF](codebook/urdf/urdf.md) 
* 功能包
   * [设置 bloom/git 总是使用 ssh](https://answers.ros.org/question/234494/diagnosing-issues-with-bloom-github-two-factor-authentication/)
   * `rosdep install --from-paths src --ignore-src --rosdistro=foxy -y`
* [Package Documentation](codebook/pages/packages.md)
* 状态页面
  * [Foxy Debian 构建状态](http://repo.ros2.org/status_page/ros_foxy_default.html)
  * [Rolling Debian 构建状态](http://repo.ros2.org/status_page/ros_rolling_default.html)
  * [对比 Foxy/Rolling](http://repo.ros2.org/status_page/compare_foxy_rolling.html)
  * [对比 Foxy/Humble](http://repo.ros2.org/status_page/compare_foxy_humble.html)


