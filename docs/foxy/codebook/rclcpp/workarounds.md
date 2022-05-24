# rclcpp: Workarounds

## 懒订阅

ROS2 还没有订户连接回叫。此代码创建一个函数，定期调用该函数来检查我们是否需要启动或停止订阅者：


```cpp
#include <rclcpp/rclcpp.hpp>
#include <std_msgs/msg/float64.hpp>

class LazyPublisherEx : rclcpp::Node
{
public:
  LazyPublisherEx(const rclcpp::NodeOptions & options) :
    Node("lazy_ex", options)
  {
    // Setup timer
    timer = this->create_wall_timer(
      std::chrono::seconds(1),
      std::bind(&LazyPublisher::periodic, this));
  }

private:
  void periodic()
  {
    if (pub_.get_subscription_count() > 0)
    {
        // We have a subscriber, do any setup required
    }
    else
    {
        // Subscriber has disconnected, do any shutdown
    }
  }

  rclcpp::Publisher<std_msgs::msg::Float64>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
};
```


在使用图像传输时也可以这样做，你只需要将 _get_subscription_count_ 更改为 _getNumSubscribers_:

```cpp
#include <rclcpp/rclcpp.hpp>
#include <image_transport/image_transport.h>

class LazyPublisherEx : rclcpp::Node
{
public:
  LazyPublisherEx(const rclcpp::NodeOptions & options) :
    Node("lazy_ex", options)
  {
    // Setup timer
    timer = this->create_wall_timer(
      std::chrono::seconds(1),
      std::bind(&LazyPublisher::periodic, this));
  }

private:
  void periodic()
  {
    if (pub_.getNumSubscribers() > 0)
    {
        // We have a subscriber, do any setup required
    }
    else
    {
        // Subscriber has disconnected, do any shutdown
    }
  }

  image_transport::CameraPublisher pub_;
  rclcpp::TimerBase::SharedPtr timer_;
};
```