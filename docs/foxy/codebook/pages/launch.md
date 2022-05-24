# roslaunch2

## 基于 Python 的启动文件

基于 python 的启动文件几乎都遵循相同的结构。注意，在 Foxy 之前，参数名称、名称空间和可执行文件的[前缀](https://index.ros.org/doc/ros2/Releases/Release-Foxy-Fitzroy/#launch-ros):


```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            name='node_runtime_name',
            package='ros2_package_name',
            executable='name_of_executable',
            parameters=[{'name_of_int_param': 1,
                         'name_of_str_param': 'value'}],
            remappings=[('from', 'to')],
            output='screen',
        ),
        # More Nodes!
    ])
```

## 使启动文件成为可执行文件

正常情况下，启动文件的运行方式为：


```
ros2 launch pkg launch.py
```

但是，有时你需要一个可执行的启动文件(例如放入一个系统作业)。假设你遵循上面所示的默认模式，则只需添加以下内容：


```python
#!/usr/bin/env python3

import sys
from launch import LaunchService

# define generate_launch_description() as above

if __name__ == '__main__':
    desc = generate_launch_description()
    service = LaunchService(argv=sys.argv[1:])
    service.include_launch_description(desc)
    return service.run()
```

## 从文件加载参数

有些节点有很多参数，将它们放在 YAML 文件中会更容易：


```yaml
node_name:
  ros__parameters:
      some_int_param: 1
      some_str_param: "the_value"
```

要加载此文件，请执行以下操作：


```python
from ament_index_python.packages import get_package_share_directory

# Assuming you have a file called package_name/config/params.yaml
node_params = os.path.join(
    get_package_share_directory('package_name'),
    'config',
    'params.yaml'
)

# Add this to your LaunchDescription
Node(
    name='node_runtime_name',
    package='ros2_package_name',
    executable='name_of_executable',
    parameters=[{'another_param': 42.0},
                 node_params]
)
```


## 包括 Python 启动文件


```python
import os
from ament_index_python.packages import get_package_share_directory
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource

# Assuming you have a file called package_name/launch/my_launch.launch.py
my_launch_file = os.path.join(
    get_package_share_directory('package_name'),
    'launch',
    'my_launch.launch.py'
)

# Add this to your LaunchDescription
IncludeLaunchDescription(
    PythonLaunchDescriptionSource([my_launch_file])
),
```

## 加载 URDF

大多数机器人需要将其 URDF 加载到 ROBTO_STATE_PUBLISHER 中，也可能需要加载到其他节点中：


```python
import os
from ament_index_python.packages import get_package_share_directory
from launch_ros.actions import Node

# Load the URDF into a parameter
desc_dir = get_package_share_directory('robot_description_pkg')
urdf_path = os.path.join(desc_dir, 'robots', 'my_urdf.urdf')
urdf = open(urdf_path).read()

# Add this to your LaunchDescription
Node(
    name='robot_state_publisher',
    package='robot_state_publisher',
    executable='robot_state_publisher',
    parameters=[{'robot_description': urdf}],
)
```

## 安装启动文件

 * [Python](https://index.ros.org/doc/ros2/Tutorials/Launch-system/#python-packages)
 * [C++/CMake](https://index.ros.org/doc/ros2/Tutorials/Launch-system/#c-packages)
