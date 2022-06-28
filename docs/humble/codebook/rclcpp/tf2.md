# Rclcpp：TF2

TF2 库提供了对转换的轻松访问。以下所有示例都需要对 _tf2_ros_ 的依赖关系。

## 发布TF


```cpp
#include <tf2_ros/transform_broadcaster.h>
std::unique_ptr<tf2_ros::TransformBroadcaster> broadcaster;

broadcaster = std::make_unique<tf2_ros::TransformBroadcaster>(nodePtr);

geometry_msgs::msg::TransformStamped transform;
transform.header.stamp = node->now();
transform.header.frame_id = "odom";
transform.child_frame_id = "base_link";

// Fill in transform.transform.translation
// Fill in transform.transform.rotation

broadcaster->sendTransform(transform);
```

## 监听TF


```cpp
#include "tf2_ros/transform_listener.h"

std::shared_ptr<tf2_ros::Buffer> tf_buffer;
std::shared_ptr<tf2_ros::TransformListener> tf_listener;

rclcpp::Node node("name_of_node");

tf_buffer.reset(new tf2_ros::Buffer(node.get_clock()));
tf_listener.reset(new tf2_ros::TransformListener(*tf_buffer_));
```

## TF变换

TF2 可以通过提供实现的包进行扩展。GEOMETRY_msgs 程序包为 msgs_ 提供这些。下面的示例使用 msgs：：msg：：PointStamed_，但这应该适用于 msgs_ 中的任何数据类型：


```cpp
#include <tf2_geometry_msgs/tf2_geometry_msgs.h>

geometry_msg::msgs::PointStamped in, out;
in.header.frame_id = "source_frame";

try
{
  tf_buffer->transform(in, out, "target_frame");
}
catch (const tf2::TransformException& ex)
{
  RCLCPP_ERROR(rclcpp::get_logger("logger_name"), "Could not transform point.");
}
```

_transform_ 函数还可以接受超时。然后它将等待转换可用的时间达到这个时间量:

```cpp
tf_buffer->transform(in, out, "target_frame", tf2::durationFromSec(1.0));
```

## 获取最新TF

常见的工作方式是获得“最新”转换。在 ros2中，这可以使用 tf2::TimePointZero 来实现，但是需要使用 lookupTransform 然后调用 doTransform (基本上就是在内部进行转换) :

```cpp
geometry_msgs::msg::PointStamped in, out;

geometry_msgs::msg::TransformStamped transform =
   tf_buffer->lookupTransform("target_frame",
                              in.header.frame_id,
                              tf2::TimePointZero);

tf2::doTransform(in, out, transform);
```
