# Command Line: Colcon

## Build

用于在工作区构建 ROS2 包。

生成所有包：


```
colcon build
```

要避免在调整 Python 脚本、配置文件和启动文件时重新构建：


```
colcon build --symlink-install
```

要修复大多数构建问题，特别是在向工作区添加或删除包或安装新的 RMW 实现的情况下，请清除 CMake 缓存。有关详细信息，请参阅<>r=“9”/>帖子。


```
colcon build --cmake-clean-cache
```

## CMake 参数


```
colcon build --cmake-args -DCMAKE_BUILD_TYPE=RelWithDebInfo
```

## 测试

要测试并将结果显示在屏幕上，请执行以下操作：


```
colcon test
colcon test-result --verbose
```

构建/测试单个包：


```
colcon <verb> --packages-select <package-name>
```

## 格式化

将输出显示到屏幕上：


```
colcon <verb> --event-handlers console_direct+
```

## 动作文档

 * [build](https://colcon.readthedocs.io/en/released/reference/verb/build.html)
 * [test](https://colcon.readthedocs.io/en/released/reference/verb/test.html)
