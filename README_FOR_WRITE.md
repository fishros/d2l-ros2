#  文档编写流沉

### 常用工具

MP4转GIF

```
ffmpeg -i 正反转控制.mp4 -s 320*180 -filter:v fps=fps=8  -compression_level 3  a.gif 
```


### PDF

```
xhost + && docker run --rm -it   --cap-add=SYS_ADMIN  -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY  --user $(id -u):$(id -g)  -v /usr/share/fonts/:/usr/share/fonts/ -v $(pwd)/docs:/home/node/docs:ro   -v $(pwd)/pdf:/home/node/pdf:rw  -v $(pwd)/pdf/cover.pdf:/home/node/resources/cover.pdf:ro   -e "PDF_OUTPUT_NAME=动手学ROS2`date +%y%m%d`.pdf"  --net=host  docsify:latest && mv $(pwd)/pdf/动手学ROS2`date +%y%m%d`.pdf $(pwd)/pdf/动手学ROS2.pdf
```

test

```
xhost + && docker run --rm -it   --cap-add=SYS_ADMIN  -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY  --user $(id -u):$(id -g)  -v /usr/share/fonts/:/usr/share/fonts/ -v $(pwd)/docs:/home/node/docs:ro   -v $(pwd)/pdf:/home/node/pdf:rw  -v $(pwd)/pdf/cover.pdf:/home/node/resources/cover.pdf:ro   -e "PDF_OUTPUT_NAME=动手学ROS2`date +%y%m%d`.pdf"  --net=host  docsify:latest /bin/
npm run dev
```