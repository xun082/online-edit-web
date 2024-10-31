从七月份以来我们对这个在线代码编辑器了一次重构，并且在一个月之内完成了一个基础版本，两个月之后我们完成了编辑器的核心功能：协同。

![20241029214810](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029214810.png)

在开始之前，先来贴一下相关的地址，如果对你有帮助，欢迎 star：

1. [前端仓库地址](https://github.com/xun082/online-edit-web)

2. [前端预览地址（能直接运行 React 项目）](https://online-edit-web.vercel.app/)

3. [前端预览地址（能实现协同）](http://116.196.113.241:3000/)

4. [后端仓库地址](https://github.com/xun082/online-edit-server)

因为本项目使用的是 WebContainer，所以部署的必须在 HTTPS 的情况下才能使用，然而 Vercel 提供了 HTTPS 的方式来部署，但是我们的后端服务没有 HTTPS，
如果用 Vercel 部署的话就访问不了我们的后端服务，所以要想体验最好的效果我的建议是直接拉取本仓库代码然后直接启动。

# 技术选型

要编写一个开源项目，首先最重要的肯定少不了技术选项了，前端这边采用的是 NextJs，而后端这边采用的是 NestJs。

首先我比较喜欢 NextJs 的一个点就是它的文件路由（File-based Routing）系统简单直观，能够根据文件夹结构自动生成路由，减少了我们手动配置的工作量，开箱即用了。

Next.js 集成了 React 和 Node.js 环境，开发者可以通过熟悉的 React 语法快速上手，同时无需配置复杂的构建工具。在对后端依赖较小的项目，完全可以使用 NextJs 来实现全栈项目，而不需要额外的后端来编写。

其次就是对远程比较友好，从我接触过的人当中，还是有部分的朋友倾向于找一份远程的工作的，在我面试过和工作的远程岗位当中，基本使用的技术栈都是 NextJS，这首先得益于它提供了服务端渲染的功能，对 SEO 比较友好。另外一个点就是生态也很完善，例如 tailwindcss、shadcn、zustand、swr 等等，他还提供了 vercel 来免费部署，还有 supabase 这些免费的数据库。

至于为什么选择 NestJs，应该就不用解释了吧。

# 功能实现

接下来我就和大家分享一下他的一些功能，以便大家对这个项目有一个全面的了解：

## 首页

![20241029221609](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029221609.png)

![20241029221634](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029221634.png)

首页的话就一个流星的动画，加上后面的内容，整体还算协调。

## 控制面板

点击控制面板之后会进入到 dashboard，如果没有登录的话会跳转到登录页面：

![20241029221905](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029221905.png)

这里不需要额外注册，直接获取验证码，没有账号的话会直接注册一个新的。

![20241029222039](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029222039.png)

进入到控制面板，这里我们可以选择创建项目或者创建一个协同文档：

![20241029222128](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029222128.png)

在这里提供了多种不同的框架来进行初始化，除了使用原有的模板之外，我们也可以直接导入本地的代码来进行开发和编辑：

![20241029222441](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029222441.png)

这里有个头像还挺好看的，我很喜欢：

![20241029222526](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029222526.png)

## 代码编辑

点击创建之后我们会进入到这样的一个页面，首先左边是一个文件栏，整体布局跟 vscode 一样，下面的是控制台，在这里我们可以直接执行 npm 和 pnpm 的一些命令，还有一些 NodeJs 的命令，

![20241029222747](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029222747.png)

现在我们就是给这个项目执行 pnpm 来安装了相关的依赖包，并执行了 `pnpm dev` 来把这些项目启动了起来：

![20241029223422](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029223422.png)

## 文件搜索

除了文件树之外，我们还提供了跟 Vscode 差不多的功能，文件搜索：

![20241029223613](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029223613.png)

还可以分屏编写：

![20241029223745](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029223745.png)

## 切换编辑器主题

在这里我们还可以切换编辑器的主题，在这里提供了多个主题可以选择：

![20241029224822](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029224822.png)

## 协同编辑

这回我们要回到了我们的核心功能：协同编辑上了，首先要到 dashboard 控制面板上创建一个文档：

![20241029225117](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029225117.png)

创建完成之后你会看到这样的效果：

![20241029225214](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029225214.png)

点击分享文档，可以分享该文档给其他的朋友来一起编辑：

![20241029225453](https://raw.githubusercontent.com/xun082/md/main/blogs.images20241029225453.png)

最终协同编辑的效果：

![output.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4d0350c0d6904be481b1f51d39af56bb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTW9tZW50:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzc4Mjc2NDk2NjQ2MDM5OCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1730377731&x-orig-sign=wllLiuHHTzlcUTQcS%2FAs%2FEg7Zk8%3D)

# 协同如何实现的？

关于协同编辑这块，就来分享一下这前后端所涉及到的技术栈吧

1. 前端

   1. y-monaco: 将 Yjs 的实时协作功能与 Monaco Editor 集成,提供了默认的协同编辑数据同步与协同 ui 效果.

   2. y-websocket: Yjs 的 WebSocket 适配器，提供实时数据同步功能，允许多个客户端通过 WebSocket 进行协作编辑。

   3. yjs: 高性能的 CRDT 框架，支持实时协作和离线编辑，通过共享类型自动合并变更处理冲突，适用于大型文档和无限用户的场景。

   4. perfect-cursors: 提供平滑的鼠标移动效果.

2. 后端

   1. y-websocket：yjs 封装了协同逻辑

   2. y-mongodb-provider：持久化存储

# 贡献者

感谢所有为这个项目做出贡献的人！

[![Contributors](https://contrib.rocks/image?repo=xun082/online-edit-web)](https://github.com/xun082/online-edit-web/graphs/contributors)

如果该项目对你有帮助或者对这个项目感兴趣，欢迎 Star⭐️⭐️⭐️

最后再来提一些这两个开源项目，它们都是我们目前正在维护的开源项目：

- [在线代码协同编辑器](https://github.com/xun082/online-edit-web)

- [前端脚手架 create-neat](https://github.com/xun082/create-neat)

如果你想参与进来开发或者想进群学习，可以添加我微信 `yunmz777`，后面还会有很多需求，等这个项目完成之后还会有很多新的并且很有趣的开源项目等着你。
