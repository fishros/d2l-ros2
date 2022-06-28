# rclcpp: Time

_rclcpp::Time_ 和  _rclcpp::Duration_ 和ROS1中的用法偏差较大，但与[std::chrono](https://en.cppreference.com/w/cpp/chrono) 的关系更为密切。[ROS Discourse](https://discourse.ros.org/t/ros-2-time-vs-std-chrono/6293) 可以看到与其有关的比较深入的讨论。

在移植某些ros1库时，时间戳可能会被大量用作浮点秒。从 rclcpp 获取浮点秒 _rclcpp::Time_:


```cpp
// node is instance of rclcpp::Node
rclcpp::Time t = node.now();
double seconds = t.seconds();
```

没有用于从浮点表示的秒开始的时间的构造函数，因此你首先需要转换为纳秒：


```cpp
rclcpp::Time t(static_cast<uin64_t>(seconds * 1e9));
```

确实具有双向功能：


```cpp
rclcpp::Duration d = rclcpp::Duration::from_seconds(1.0);
double seconds = d.seconds();
```
