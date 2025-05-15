
# 什么是 Docker
Docker 解决了软件跨环境（在不同主机上运行）效果不一的问题。这里的软件指的不是系统软件（Windows、Linux），而是应用软件（如网站、服务、数据库）。


![alt text](/images/docker-1.jpg)


- 虚拟机、Docker 容器的区别：
虚拟机有独立的 OS、也就有独立的内核，Docker 只打包应用和依赖，每个容器都有一个独立文件系统，共享的是主机内核。

- 当我们访问云服务器上的 Docker 应用，访问的 IP 地址是什么：
访问的是云服务器的公网 IP，但是端口是映射的端口。比如 Docker 中可以通过 -p 8080:80 实现从服务器的8080端口到容器的80端口的转发


# 为什么需要 Docker

当我们在本地将程序开发好了，想要让它在别人的主机，或者云服务器上也能运行时，手动安装依赖？手动修改默认配置？这些我们都不想做，甚至可能做完了还发现操作系统不匹配——你是 CentOS我是 Ubuntu，那就都白干了。所以我们需要 Docker 来简化我们的环境配置流程。而且因为 Docker 容器创建和销毁非常方便，很适合用来动态扩容和缩容，可以直接用在云计算当中的弹性服务当中。

# Docker 安装
下载 [Docker Desktop](https://www.docker.com/)

如果下载的是 Docker Desktop，请使用 `docker desktop start` 开启 Docker 服务。
启动服务后，输入 `docker images` 检查所有镜像（iamges），初始时应该没有任何镜像。

# Docker 学习与使用
推荐在 Docker Desktop 的 Learning Center 学习
![Learning Center](/images//docker-2.jpg)

## 镜像 image
D ocker 镜像（iamge）相当于一个初始化的文件，任何容器都需要基于镜像创建，并且一个镜像可以创建个容器，容器之间是隔离的独立环境，这使得一台主机可以同时启动多个服务，使得它非常适合微服务架构。可以根据自己创建的镜像或者是基于 [Docker Hub](https://hub.docker.com/) 上拉取（pull）的镜像来创建实例。

一个镜像可以继承自另一个镜像，比如当前这个 Dockerfile 文件（可以用来创建一个镜像），就是基于 Node.js 14 镜像，alpine 是指基于轻量级的 Alpine Linux 系统
```js
// Dockerfile
FROM node:14-alpine
...
```

使用 `docker pull [image]` 可以拉取 Docker Hub 上的镜像
使用 `docker image rm [image]` 删除镜像

## Dockerfile 配置
什么是 Dockerfile ？Dockerfile 是一个文本文件，用来构建我们应用的镜像，Dockerfile 包含了一系列指令

```js
// 指定当前要构建的镜像的基础镜像
FROM node:14-alpine
// 复制文件到镜像
COPY . /app
// 容器的工作目录，COPY、RUN、CMD会在此目录下执行
WORKDIR /app
// 执行命令
RUN npm install
// 声明容器运行时监听的端口
EXPOSE 3000
// 容器启动时执行的默认命令
CMD [ "node", "app.js" ]
```

配置好了 Dockerfile 文件后，我们就可以 docker build 来构建我们自己的镜像了，通过 `docker build -t [name] .` 命令创建一个新镜像，-t 代表它的后面是一个镜像名标签（tag），而 . 代表当前的目录就是 Dockerfile 所在的位置。

> 在使用 `docker build` 命令时，我们可能发现 ERROR: failed to solve: xxx: failed to resolve source metadata for docker.io/library... 的错误提示，这是由于一些众所周知的限制，我们无法获取Docker Hub官方的镜像。这时我们可以配置一下其他的镜像源。
> - 如果是Docker Desktop，可以打开右上角的 Setting，在 Docker Engine 编辑 daemon.json 配置。
> - 如果是Linux系统，可以在/etc/docker/daemon.json找到
>
> 然后加入你找到的可以使用的 Docker Hub 镜像源到"registry-mirrors"，如图

![alt text](/images/docker-3.jpg)
镜像创建成功后，我们可以再通过 `docker images` 查看镜像

## 容器 container
创建或者拉取镜像了之后，我们就可以根据镜像创建容器（container）了，下面是一些命令

`docker create [container]` 创建一个容器
`docker start [container]` 启动容器
`docker run -d [container]` 一般使用这个命令，而不是上面两个命令创建并一个容器并后台运行
`docker stop [container]` 停止容器
`docker rm -f [container]` 停止并删除容器
`docker ps` 查看所有在运行的容器
`docker ps -a` 查看所有的容器

# 实战教程
今天我要创建三个镜像和容器，分别是前端的 Vue 项目的容器、后端的 Koa 项目的容器，以及数据库的 MongoDB 容器，也就是相当于把我的项目整体搬到 Docker 上。

## 前端容器化
我使用的是 Vite 脚手架，所以运行 `npm run build` 之后，把打包好的 dist 文件夹拿过来，并且在同一级添加 Dockerfile

![alt text](/images/docker-4.jpg)

Dockerfile 配置

```js
FROM nginx:1.28.0-alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
```
配置的含义如下

> - FROM nginx：继承自官方的 nginx image，选择了1.28.0的稳定版本，基于 Alpine Linux
> - COPY ./dist /usr/share/nginx/html：将./dist目录下的所有文件拷贝到 image 文件的/usr/share/nginx/html目录，这是Nginx官方Docker镜像的静态资源目录
> - EXPOSE 80：将容器80端口暴露出来， 允许外部连接这个端口



接着在当前 frontend 目录执行以下命令构建 Docker 镜像和容器
```js
docker build -t blog-frontend .
docker run -d -p 8080:80 --name blog-frontend blog-frontend
```
> -p 8080:80 指定将宿主机的 8080 端口映射到容器的 80 端口
> --name blog-frontend​​ 指定容器名称
> 后一个 ​​blog-frontend​​ 指定镜像名称


然后我们就可以在 localhost:8080 访问我们的前端页面了，当然是静态的，现在还没有后台数据提供给前端。

![alt text](/images/docker-5.jpg)


## 后端容器化
后端服务使用 Koa 写的，基于 Node.js。直接在 app.js 的在同一级添加 Dockerfile

![alt text](/images/docker-6.jpg)

Dockerfile 配置

```js
FROM node:22.15.0-alpine
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]
```
配置的含义如下
> - FROM node:22.15.0-alpine：基础镜像为 Node.js 22.15.0 + Alpine Linux
> - COPY . /app：复制当前目录所有文件到镜像的 /app 目录
> - WORKDIR /app：设置工作目录为 /app（后续命令在此目录执行）
> - RUN npm install：在/app目录下，运行npm install命令安装依赖
> - EXPOSE 3000：将容器3000端口暴露出来， 允许外部连接这个端口
> - CMD [ "node", "app.js" ]：容器启动命令（运行 app.js）


接着在 backend 目录执行以下命令
```js
docker build -t blog-backend .
docker run -d -p 3000:3000 --name blog-backend blog-backend
```

这样我们的后端服务就在 3000 端口启动了

记得后端代码中，与数据库连接的地址要填写你的主机地址，或者你是在云服务器上运行的，那就是你的云服务器主机 IP，而不是 localhost，我就是因为这个问题试了一下午的错误。

![alt text](/images/docker-7.jpg)

## 数据库容器化
数据库基于 MongoDB，可以直接拉取 MongoDB 官方镜像
```js
docker pull mongo

docker run -d -p 27017:27017 --name blog-mongodb -v E:\mydata:/data/db mongo
```
拉取之后创建 MongoDB 容器并在后台运行，端口27017，`-v E:\mydata:/data/db` 将宿主机的 `E:\mydata` 目录挂载到容器的 `/data/db`，这样即使容器被删除，数据也不会消失，而是将数据保存在宿主机 `E:\mydata`

我们创建一个数据库数据试试：
```js
docker exec -it blog-mongodb bash // 进入数据库容器
mongosh // 连接MongoDB数据库
use testdb // 切换到/新建名为testdb的数据库 
db.test.insertOne({ msg: "hello", createdAt: new Date() }) // 新建test集合并且插入一条数据
```

我们可以通过 Navicate 连接一下数据库，这样更加方便我们的数据库操作。
选择新建连接，数据库选择 MongoDB，主机就填写你主机的 IP，端口选择27017。测试连接通过即可。如果你本机也启动了数据库，记得把本机的数据库服务先关闭，不然会占用同一个端口。

![alt text](/images/docker-8.jpg)


现在我们可以方便地通过 Navicate 导入本地的数据

![alt text](/images/docker-9.jpg)

## 同时运行
当我们数据库的容器也成功创建并且运行后，使用 `docker ps` 查看所有在运行的容器：

![alt text](/images/docker-10.jpg)


我们测试一下后端接口

![alt text](/images/docker-11.jpg)

测试成功，有数据响应，这时前端也能看到数据了

![alt text](/images/docker-12.jpg)

测试成功！最后，我们可以把自己的镜像发布到网上或者进行其它操作了。

