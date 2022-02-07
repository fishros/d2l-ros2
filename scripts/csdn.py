# encoding:utf-8
import os
import sys
from urllib.parse import quote

def find_replace(file):
  is_file = True
  for root, dirs, files in os.walk(file):
      for f in files:
          is_file = False
          file_path = os.path.join(root, f)
          if file_path.endswith(".md"):
            print("markdown",file_path)
            file_name = file_path.replace(".md","")[file_path.rfind("\\")+1:]
            chapt_name = file_path[file_path.find("/")+1:file_path.rfind("\\")]
            print(file_name)
            # print("文件名字",file_name,"章节名字",chapt_name)
            old = "]("+file_name
            new = "]("+"http://fishros.com/d2lros2foxy/"+chapt_name[4:]+"/"+quote(file_name)
            print(old,new)
            with open(file_path,encoding='utf-8') as f:
                data = f.read()
                if data.find(old) > -1:
                    # print("发现，准备替换：%s" % file_path)
                    data = data.replace(old,new)
                data = "《动手学ROS2》"+file_name+\
                """
> 本系列教程作者：小鱼
> 公众号：鱼香ROS
>  QQ交流群：139707339
>  教学视频地址：[小鱼的B站](https://space.bilibili.com/1940177928)
>  完整文档地址：[鱼香ROS官网](https://fishros.com/)
>  版权声明：如非允许禁止转载与商业用途。
> ![公众号](https://img-blog.csdnimg.cn/0c9e6d24fa68477aaa67b0fe964cc2f5.png)
""" \
                        +data \
                            + """
### 作者介绍：

**我是小鱼，机器人领域资深玩家，现深圳某独脚兽机器人算法工程师一枚**
**初中学习编程，高中开始接触机器人，大学期间打机器人相关比赛实现月入2W+（比赛奖金）**
**目前在输出机器人学习指南、论文注解、工作经验，欢迎大家关注小鱼，一起交流技术，学习机器人**
                            """
                # print(data)
                with open(file_path,"w",encoding='utf-8') as f:
                    f.write(data)
                        
      # 遍历所有的文件夹
      for d in dirs:
          os.path.join(root, d)


#   if is_file:
#     with open(file) as f:
#       data = f.read()
#     if data.find(old) > 0:
#       print("替换%s" % file)
#       data = data.replace(old,new)
#       with open(file,"w") as f:
#         f.write(data)


find_replace("../docs/chapt8")
