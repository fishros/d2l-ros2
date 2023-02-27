#  文档编写流沉

### 常用工具

MP4转GIF

```
ffmpeg -i 正反转控制.mp4 -s 320*180 -filter:v fps=fps=8  -compression_level 3  a.gif 
```