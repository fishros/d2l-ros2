# 联网

ROS2 使用 DDS 进行消息传输。

设置环境变量 RMW_IMPLICATION 以选择 DDS 实现(RMW= 机器人中间件)。例如：


```
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
```

要检查正在使用的 RMW 实施，请执行以下操作：


```
ros2 doctor --report | grep middleware
```

## DDS 发现

在 ROS1 中没有类似的。节点发现是对等的，节点在启动时宣布它们的主题，并在启动后定期发布主题。默认情况下，如果同一网络上的任何计算机具有相同的 ROS_DOMAIN_ID，则它们将相互查看。

ROS_DOMAIN_ID 可以是 0 到 253 之间的任何数字，但建议使用小于 128 的数字。

除了 ROS_DOMAIN_ID 之外，CycloneDDS 还支持域标签，允许对网络进行几乎无限的分区(见下文)。

如果希望将通信限制在本地主机上，请设置 ROS_LOCALHOST_ONLY，它是。

## CycloneDDS

Cyclone 可以使用 XML 进行配置。它可以存储在文件中，也可以直接传递到环境变量 CYCLONEDDS_URI 中。可以在<>r=“9”/>中找到支持选项的完整列表。另请参阅<>r=“10”/>。

### CycloneDDS：多个接口

气旋目前只能与单一网络接口配合使用。如果你有多个接口，请指定要在 NetworkInterfaceAddress 中使用的接口：


```xml
<CycloneDDS>
  <Domain>
    <General>
      <NetworkInterfaceAddress>wlp2s0</NetworkInterfaceAddress>
    </General>
  </Domain>
</CycloneDDS>
```

### CycloneDDS：禁用组播(发现除外)

某些网络硬件在使用多播时性能不佳(尤其是在使用 WiFi 时)。你可以将多播限制为仅发现：


```xml
<CycloneDDS>
  <Domain>
    <General>
      <AllowMulticast>spdp</AllowMulticast>
    </General>
  </Domain>
</CycloneDDS>
```

### CycloneDDS：域标签

CycloneDDS 还定义了“域标签”，允许使用自定义字符串大幅划分网络：


```xml
<CycloneDDS>
  <Domain>
    <Discovery>
      <Tag>my_robot_name</Tag>
    </Discovery>
  </Domain>
</CycloneDDS>
```

### 示例

以上标签都可以组合在一起：


```xml
<CycloneDDS>
  <Domain>
    <General>
      <!-- Explicitly set network interface -->
      <NetworkInterfaceAddress>wlp2s0</NetworkInterfaceAddress>
      <!-- Use multicast for discovery only -->
      <AllowMulticast>spdp</AllowMulticast>
    </General>
    <Discovery>
      <!-- This tag has to be the same on each machine -->
      <Tag>my_robot_name</Tag>
    </Discovery>
  </Domain>
</CycloneDDS>
```
