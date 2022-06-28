# Rclcpp：参数

需要声明参数。同时，如果你不打算稍后再次更新值，则可以获得该值：


```cpp
// node is an instance of rclcpp::Node
// 42 is a great default for a parameter
int param = node.declare_parameter<int>("my_param_name", 42);
```

要获取值，请执行以下操作：


```cpp
int param;
node.get_parameter("my_param_name", param);
```

## 动态参数

在 ROS2 中，所有参数都可以通过 ROS2 服务动态更新(不需要像动态重新配置那样定义重复内容)。

下面的例子适用于 eloquent 或更高版本(较早的 ROS2 版本只支持单个回调，并且有一个略有不同的 API)。有关有效类型的信息，请参阅的文档。


```cpp
#include <vector>
#include <rclcpp/rclcpp.hpp>

class MyNode : public rclcpp::Node
{
public:
  MyNode()
  {
    // Declare parameters first

    // Then create callback
    param_cb_ = this->add_on_set_parameters_callback(
      std::bind(&MyNode::updateCallback, this, std::placeholders::_1));
  }

private:
  // This will get called whenever a parameter gets updated
  rcl_interfaces::msg::SetParametersResult updateCallback(
    const std::vector<rclcpp::Parameter> & parameters)
  {
    rcl_interfaces::msg::SetParametersResult result;
    result.successful = true;

    for (const rclcpp::Parameter & param : parameters)
    {
      if (param.get_name() == "my_param_name")
      {
        if (param.get_type() != rclcpp::ParameterType::PARAMETER_STRING)
        {
          result.successful = false;
          result.reason = "my_param_name must be a string";
          break;
        }

        // Optionally do something with parameter
      }
    }

    return result;
  }

  // Need to hold a pointer to the callback
  rclcpp::node_interfaces::OnSetParametersCallbackHandle::SharedPtr param_cb_;
};

```