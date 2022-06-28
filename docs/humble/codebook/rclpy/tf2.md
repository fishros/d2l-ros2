# RCLPY：TF2

TF2 库提供了对转换的轻松访问。以下所有示例都需要对 ros_Package 的依赖关系。

## 监听转换


```python
import rclpy
from rclpy.node import Node
from tf2_ros.buffer import Buffer
from tf2_ros.transform_listener import TransformListener

class MyNode(Node):
    def __init__(self):
        super().__init__("my_node")

        self.buffer = Buffer()
        self.listener = TransformListener(self.buffer, self)
```

## 应用变换

TF2 可以通过提供实现的包进行扩展。GEOMETRY_msgs 程序包为 msgs_ 提供这些。下面的示例使用 msgs.msg.PointStamed_，但这应该适用于 msgs_ 中的任何数据类型：


```python
from geometry_msgs.msg import PointStamped
from tf2_ros.buffer import Buffer
from tf2_ros.transform_listener import TransformListener
import tf2_geometry_msgs

# Setup buffer/listener as above

p1 = PointStamped()
p1.header.frame_id = "source_frame"
# fill in p1

p2 = buffer.transform(p1, "target_frame")
```

## 变换

在 ROS1 中，Tf 包括模块。TF2 没有类似的模块。建议使用 Transforms3d Python 包，可通过 pip 获取：


```
sudo pip3 install transforms3d
```

例如，要旋转点：


```python
import numpy as np
from transforms3d.quaternion import quat2mat

# Create rotation matrix from quaternion
R = quat2mat([w, x, y, z])
# Create a vector to rotate
V = np.array([x, y, z]).reshape((3, 1))
# Rotate the vector
M = np.dot(R, V)

p = PointStamped()
p.point.x = M[0, 0]
p.point.y = M[1, 0]
p.point.z = M[2, 0]
```