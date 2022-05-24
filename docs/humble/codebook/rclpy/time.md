# rclpy: Time

要获得相当于 rospy.Time.now()的内容，你现在需要一个 ROS2 节点：


```python
import rclpy
from rclpy.node import Node

class MyNode(Node):

    def some_func(self):
        t = self.get_clock().now()
        msg.header.stamp = t.to_msg()
```

从持续时间转换为消息很常见：


```python
import rclpy
from rclpy.duration import Duration

msg.duration = Duration(seconds=1).to_msg()
```

计时器是从节点创建的：


```python
import rclpy
from rclpy.node import Node

class MyNode(Node):

    def __init__(self):
        super().__init__("my_node")

        # Create a timer that fires every quarter second
        timer_period = 0.25
        self.timer = self.create_timer(timer_period, self.callback)

    def callback(self):
        self.get_logger().info("timer has fired")
```
