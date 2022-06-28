# Gazebo常用插件

## 1.雷达

详细介绍及文章： [9.5给机器人添加激光传感器](..\..\chapt9\9.5给机器人添加激光传感器.md) 

```xml
  <gazebo reference="laser_link">
      <sensor name="laser_sensor" type="ray">
      <always_on>true</always_on>
      <visualize>true</visualize>
      <update_rate>5</update_rate>
      <pose>0 0 0.075 0 0 0</pose>
      <ray>
          <scan>
            <horizontal>
              <samples>360</samples>
              <resolution>1.000000</resolution>
              <min_angle>0.000000</min_angle>
              <max_angle>6.280000</max_angle>
            </horizontal>
          </scan>
          <range>
            <min>0.120000</min>
            <max>3.5</max>
            <resolution>0.015000</resolution>
          </range>
          <noise>
            <type>gaussian</type>
            <mean>0.0</mean>
            <stddev>0.01</stddev>
          </noise>
      </ray>

      <plugin name="laserscan" filename="libgazebo_ros_ray_sensor.so">
        <ros>
          <remapping>~/out:=scan</remapping>
        </ros>
        <output_type>sensor_msgs/LaserScan</output_type>
        <frame_name>laser_link</frame_name>
      </plugin>
      </sensor>
    </gazebo>
```



## 2.IMU

详细介绍及文章： [9.4为FishBot添加IMU传感器.md](..\..\chapt9\9.4为FishBot添加IMU传感器.md) 

```xml
    <gazebo reference="imu_link">
      <sensor name="imu_sensor" type="imu">
      <plugin filename="libgazebo_ros_imu_sensor.so" name="imu_plugin">
          <ros>
            <namespace>/</namespace>
            <remapping>~/out:=imu</remapping>
          </ros>
          <initial_orientation_as_reference>false</initial_orientation_as_reference>
        </plugin>
        <always_on>true</always_on>
        <update_rate>100</update_rate>
        <visualize>true</visualize>
        <imu>
          <angular_velocity>
            <x>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>2e-4</stddev>
                <bias_mean>0.0000075</bias_mean>
                <bias_stddev>0.0000008</bias_stddev>
              </noise>
            </x>
            <y>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>2e-4</stddev>
                <bias_mean>0.0000075</bias_mean>
                <bias_stddev>0.0000008</bias_stddev>
              </noise>
            </y>
            <z>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>2e-4</stddev>
                <bias_mean>0.0000075</bias_mean>
                <bias_stddev>0.0000008</bias_stddev>
              </noise>
            </z>
          </angular_velocity>
          <linear_acceleration>
            <x>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>1.7e-2</stddev>
                <bias_mean>0.1</bias_mean>
                <bias_stddev>0.001</bias_stddev>
              </noise>
            </x>
            <y>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>1.7e-2</stddev>
                <bias_mean>0.1</bias_mean>
                <bias_stddev>0.001</bias_stddev>
              </noise>
            </y>
            <z>
              <noise type="gaussian">
                <mean>0.0</mean>
                <stddev>1.7e-2</stddev>
                <bias_mean>0.1</bias_mean>
                <bias_stddev>0.001</bias_stddev>
              </noise>
            </z>
          </linear_acceleration>
        </imu>
      </sensor>
    </gazebo>
```
## 3.超声波

详细介绍及文章： [9.6拓展-为Fishbot添加超声波传感器.md](..\..\chapt9\9.6拓展-为Fishbot添加超声波传感器.md) 


```xml
  <gazebo reference="ultrasonic_sensor_link">
    <sensor type="ray" name="ultrasonic_sensor">
      <pose>0 0 0 0 0 0</pose>
      <!-- 是否可视化，gazebo里能不能看到 -->
      <visualize>true</visualize>
      <!-- 扫描速率，也就是数据更新速率 -->
      <update_rate>5</update_rate>
      <ray>
        <scan>
          <!-- 水平扫描的点数 -->
          <horizontal>
            <samples>5</samples>
            <resolution>1</resolution>
            <min_angle>-0.12</min_angle>
            <max_angle>0.12</max_angle>
          </horizontal>
          <!-- 垂直方向扫描的点数 -->
          <vertical>
            <samples>5</samples>
            <resolution>1</resolution>
            <min_angle>-0.01</min_angle>
            <max_angle>0.01</max_angle>
          </vertical>
        </scan>
        <!-- 超声波检测的范围和数据分辨率单位m -->
        <range>
          <min>0.02</min>
          <max>4</max>
          <resolution>0.01</resolution>
        </range>
        <!-- 数据噪声采用高斯噪声 -->
        <noise>
          <type>gaussian</type>
          <mean>0.0</mean>
          <stddev>0.01</stddev>
        </noise>
      </ray>
      <plugin name="ultrasonic_sensor_controller" filename="libgazebo_ros_ray_sensor.so">
        <ros>
          <!-- 重映射输出的话题名称 -->
          <remapping>~/out:=ultrasonic_sensor_1</remapping>
        </ros>
        <!-- 输出消息的类型，注意与雷达区分，这里是sensor_msgs/Range -->
        <output_type>sensor_msgs/Range</output_type>
        <!-- 射线类型，这里要写ultrasound，注意和雷达区分 -->
        <radiation_type>ultrasound</radiation_type>
        <!-- frame名称，填写link名称即可 -->
        <frame_name>ultrasonic_sensor_link</frame_name>
      </plugin>
    </sensor>
  </gazebo>
```

## 4.两轮差速

详细介绍及文章： [9.3为FishBot配置两轮差速控制插件.md](..\..\chapt9\9.3为FishBot配置两轮差速控制插件.md) 

```
  <gazebo>
    <plugin name='diff_drive' filename='libgazebo_ros_diff_drive.so'>
          <ros>
            <namespace>/</namespace>
            <remapping>cmd_vel:=cmd_vel</remapping>
            <remapping>odom:=odom</remapping>
          </ros>
          <update_rate>30</update_rate>
          <!-- wheels -->
          <left_joint>left_wheel_joint</left_joint>
          <right_joint>right_wheel_joint</right_joint>
          <!-- kinematics -->
          <wheel_separation>0.2</wheel_separation>
          <wheel_diameter>0.065</wheel_diameter>
          <!-- limits -->
          <max_wheel_torque>20</max_wheel_torque>
          <max_wheel_acceleration>1.0</max_wheel_acceleration>
          <!-- output -->
          <publish_odom>true</publish_odom>
          <publish_odom_tf>true</publish_odom_tf>
          <publish_wheel_tf>true</publish_wheel_tf>
          <odometry_frame>odom</odometry_frame>
          <robot_base_frame>base_footprint</robot_base_frame>
      </plugin>
```

## 5.JointStatePublisher

