# CMake

虽然你不需要完全了解 CMake 就能使用 ROS2，但稍微了解一点会很有帮助。你可能会对[CMake tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)感兴趣，它解释了 CMake 的基础知识。

## Ament

Ament 是一组专门为 ROS2 设计的 CMake 模块，目的是使 CMake 更易于使用。另请参阅文档。

Ament 包的基本结构：


```cmake
cmake_minimum_required(VERSION 3.5)
project(my_package_name)

# Default to C++14
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Find packages
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)

# Include our own headers
include_directories(include)

# Create a node
add_executable(my_node src/my_node.cpp)
ament_target_dependencies(my_node
  rclcpp
  # Other ament dependencies
  # This sets up include and linker paths
)

add_library(my_library src/my_library.cpp)
ament_target_dependencies(my_library
  rclcpp
)

# Install our headers
install(
  DIRECTORY include/
  DESTINATION include
)

# Install our node and library
install(TARGETS my_node my_library
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION lib/${PACKAGE_NAME}
)

# Install some Python scripts
install(
  PROGRAMS
    scripts/my_script.py
  DESTINATION
    lib/${PROJECT_NAME}
)

# Tell downstream packages where to find our headers
ament_export_include_directories(include)
# Tell downstream packages our libraries to link against
ament_export_libraries(my_library)
# Help downstream packages to find transitive dependencies
ament_export_dependencies(
  rclcpp
)
ament_package()
```

## Linting 配置

我更喜欢更具 ROS1 风格的代码风格。要允许大括号位于各自的线路上，请执行以下操作：


```cmake
if(BUILD_TESTING)
  find_package(ament_cmake_cpplint)
  ament_cpplint(FILTERS "-whitespace/braces" "-whitespace/newline")
endif()
```

## 安装 Python 脚本


```cmake
install(
  PROGRAMS
    scripts/script1.py
    scripts/script2.py
  DESTINATION lib/${PROJECT_NAME}
)
```

## 取决于同一包中的消息

通常最好的做法是将消息放在不同的包中，但有时，特别是对于驱动程序，你希望将消息放在同一包中。


```cmake
find_package(rosidl_default_generators REQUIRED)

# Generate some messages
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/MyMessage.msg"
)

# Add a node which uses the messages
add_executable(my_node my_node.cpp)
rosidl_target_interfaces(my_node ${PROJECT_NAME} "rosidl_typesupport_cpp")
```

## 从普鲁金利布中去除助推器

默认情况下，Pluginlib 同时支持 Boost：：Shared_PTRS 和 STD：：Shared_PTRS，如果你想避免在闪亮的新 ROS2 库中依赖 Boost，你需要明确告诉 pluginlib 不要包含 Boost 版本：


```cmake
target_compile_definitions(your_library PUBLIC "PLUGINLIB__DISABLE_BOOST_FUNCTIONS")
```

## 使用特征 3

将<>r=“10”/>作为依赖项添加到你的 Package.xml 中，然后：


```cmake
find_package(Eigen3 REQUIRED)
include_directories(${EIGEN3_INCLUDE_DIRS})
```

## 在 C++ 中构建 Python 扩展

下面的示例基于包。


```cmake
find_package(PythonLibs REQUIRED)
find_package(Boost REQUIRED python)
find_package(ament_cmake_python REQUIRED)
find_package(python_cmake_module REQUIRED)

ament_python_install_package(${PROJECT_NAME})

add_library(
  my_python SHARED
  ${SOURCE_FILES}
)
set_target_properties(
  my_python PROPERTIES
  LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}
  PREFIX ""
)
target_link_libraries(my_python
  ${Boost_LIBRARIES}
  ${PYTHON_LIBRARIES}
)

install(
  TARGETS my_python
  DESTINATION "${PYTHON_INSTALL_DIR}/${PROJECT_NAME}"
)
```
