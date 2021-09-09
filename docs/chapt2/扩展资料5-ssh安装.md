# 扩展资料5：ssh与xterm

## 1.ssh

给ubuntu安装ssh-server

```shell
sudo apt-get install openssh-server 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
```

查看ubuntu的ip地址

```shell
ros2@ubuntu:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:f5:f4:82 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.47.128/24 brd 192.168.47.255 scope global dynamic noprefixroute ens33
       valid_lft 1765sec preferred_lft 1765sec
    inet6 fe80::b7fe:7bf9:a134:bdb9/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
```

打开Windows的终端：powershell或者terminal，输入

注意，其中ros2替换成大家自己的用户名

192.168.47.128替换成自己的IP

```shell
scp code_1.58.0-1625728071_amd64.deb ros2@192.168.47.128:/home/ros2/
```

![image-20210720112841461](扩展资料5：ssh安装/imgs/image-20210720112841461.png)













还有其他需要扩展的，小伙伴们可以联系小鱼反馈，小鱼会根据遇到问题的多少进行讲解。

