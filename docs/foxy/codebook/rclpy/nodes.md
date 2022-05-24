# rclpy：节点基础知识

大多数节点都有发布者和订阅者，它们都是通过调用实例的函数创建的：


```python
import rclpy
from rclpy.node import Node

from std_msgs.msg import String

class MyNode(Node):

    def __init__(self):
        super().__init__('my_node_name')

        self.publisher = self.create_publisher(String, 'output_topic', 10)
        self.subscription = self.create_subscription(
            String,
            'input_topic',
            self.callback,
            10)

    def callback(self, msg):
        self.get_logger().info("Recieved: %s" % msg.data)
        self.publisher.publish(msg)

if __name___ == "__main__":
    rclpy.init()
    my_node = MyNode()
    rclpy.spin(my_node)
    my_node.destroy_node()  # cleans up pub-subs, etc
    rclpy.shutdown()
```

## 关闭Handle

ROS1 有rospy.on_shutdown() - 但是 [不等于ROS2也有](https://github.com/ros2/rclpy/issues/244)，不过，这真的不需要，因为我们手动关闭了一些东西，而不是像 rospy 那样使用了许多全局变量:

```python
try:
    rclpy.spin(my_node)
except KeyboardInterrupt:
    pass
finally:
    my_node.on_shutdown()  # do any custom cleanup
    my_node.destroy_node()
    rclpy.shutdown()
```
