# rclcpp: Point Clouds

`sensor_msgs/PointCloud2`  是一种非常常见的 ROS 消息类型，用于处理 ROS 中的感知数据。这也是实际要解释的最复杂的信息之一。

消息的复杂性源于它在单个巨型数据存储中包含任意字段这一事实。这允许 PointCloud2 消息与任何类型的云(例如，仅 XYZ 点、XYZRGB，甚至 XYZI)一起工作，但在访问云中的数据时增加了一些复杂性。

在 ROS1 中，有一个更简单的 PointCloud 消息，但这已经被删除，并将在 ROS2-G 中删除。

## 使用 PointCloud2 迭代器

sensor_msgs 包提供了一个 C++ PointCloud2Iterator，可用于创建、修改和访问 PointCloud2 消息。

要创建新消息：


```cpp
#include "sensor_msgs/msg/point_cloud2.hpp"
#include "sensor_msgs/point_cloud2_iterator.hpp"

sensor_msgs::msg::PointCloud2 msg;

// Fill in the size of the cloud
msg.height = 480;
msg.width = 640;

// Create the modifier to setup the fields and memory
sensor_msgs::PointCloud2Modifier mod(msg);

// Set the fields that our cloud will have
mod.setPointCloud2FieldsByString(2, "xyz", "rgb");

// Set up memory for our points
mod.resize(msg.height * msg.width);

// Now create iterators for fields
sensor_msgs::PointCloud2Iterator<float> iter_x(cloud_msg, "x");
sensor_msgs::PointCloud2Iterator<float> iter_y(cloud_msg, "y");
sensor_msgs::PointCloud2Iterator<float> iter_z(cloud_msg, "z");
sensor_msgs::PointCloud2Iterator<uint8_t> iter_r(cloud_msg, "r");
sensor_msgs::PointCloud2Iterator<uint8_t> iter_g(cloud_msg, "g");
sensor_msgs::PointCloud2Iterator<uint8_t> iter_b(cloud_msg, "b");

for (; iter_x != iter_x.end(); ++iter_x, ++iter_y, ++iter_z, ++iter_r, ++iter_g, ++iter_b)
{
  *iter_x = 0.0;
  *iter_y = 0.0;
  *iter_z = 0.0;
  *iter_r = 0;
  *iter_g = 255;
  *iter_b = 0;
}
```

## 使用 PCL

对于许多操作，你可能希望转换为 pcl::PointCloud 以便使用的扩展 API [Point Cloud Library](https://pointclouds.org)。

在 ROS1 ，pcl_ros 包允许你编写一个订阅者，它的回调直接接受 pcl::PointCloud，但是这个包还没有被移植到 ROS2. 无论如何，使用 pcl_conversions 包自己进行转换是非常简单的：


```cpp
#include "pcl_conversions/pcl_conversions.h"

void cloud_callback(const sensor_msgs::msg::PointCloud2::SharedPtr msg)
{
  // PCL still uses boost::shared_ptr internally
  pcl::PointCloud<pcl::PointXYZRGB>::Ptr cloud =
    boost::make_shared<pcl::PointCloud<pcl::PointXYZRGB>>();

  // This will convert the message into a pcl::PointCloud
  pcl::fromROSMsg(*msg, *cloud);
}
```

反之，你也可以反方向转换：


```cpp
#include "pcl_conversions/pcl_conversions.h"

pcl::PointCloud<pcl::PointXYZRGB>::Ptr cloud;
sensor_msgs::msg::PointCloud2 msg;

pcl::toROSMsg(*cloud, msg);
cloud_publisher->publish(msg);
```
