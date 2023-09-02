# 简介

为了满足开发人员随时编写不同语言代码并实时查看效果的需求，我们开发了这个在线代码编辑器。它可以在浏览器中实时编辑、运行和调试代码。未来我们还计划结合 WebRTC 技术，实现在线协同编辑功能，让用户可以共享代码，并支持在线面试等应用场景。此外，该代码编辑器也适用于在线教育平台和远程面试等需要的场景。

[在线预览](https://online-edit.wangblogs.top/)

# 安装

- Clone:

```bash
# GitHub
git clone https://github.com/xun082/online-cooperative-edit.git
```

- Install:

```bash
pnpm install
```

- Run:

```bash
pnpm start
```

- Build:

```bash
pnpm build:dev
```

- Commit:

```bash
// 选择你要提交的代码
git add .

pnpm run commit
```

# 贡献指南

> 加入我们， 一起做有趣的事

你好！我们很高兴你有兴趣为 online-cooperative-edit 做出贡献。在提交你的贡献之前，请花点时间阅读以下指南：

### 项目介绍/细节

这是发表在掘金社区关于项目的技术笔记，会有项目的大概介绍以及更多的细节：
[我开源了一个能在浏览器上执行 npm 命令的在线代码编辑器🚩🚩🚩](https://juejin.cn/post/7272869799960281151)

### 第一次贡献

#### Fork 项目

如果你还不清楚怎么在 GitHub 上提 Pull Request ，可以阅读下面内容来学习：

- 首先需要fork这个项目, 进入项目页面, 点击右上角的Fork按钮
- 你的 github 帐号中会出现 user/online-cooperative-edit 这个项目
- 在本地电脑(Linux)上使用以下命令: 得到一个 online-cooperative-edit 文件夹

```bash
git clone git@github.com:xun082/online-cooperative-edit.git
```

#### 获取原项目代码

- 进入fork的项目文件夹，添加远程地址
```bash
git remote add upstream git@github.com:xun082/online-cooperative-edit.git
```

- 获取项目最新代码
```bash
git pull upstream master
```

现在我们在 fork 来的 master 分支上, 这个 master 留作跟踪 upstream 的远程代码...

#### 创建分支
- 好了, 现在可以开始贡献我们的代码了
按照国际惯例, 我们一般不在 master 上提交新代码, 而需要为新增的功能或者fixbug建立新分支, 再合并到 master 上, 使用以下代码创建分支

```bash
git checkout -b branch1
```

- 现在我们可以在分支上更改代码了, 假设我们已经添加了一些代码, 提交到代码库
```bash
git commit -a -m "new commit"
```

#### 合并修改
- 一个常见的问题是远程的项目 upstream 有了新的更新, 从而会导致我们提交的 Pull Request 时会导致冲突, 因此我们可以在提交前先把远程其他开发者的commit和我们的commit合并

- 先切换到master分支
```bash
git checkout master
```

- 使用以下代码拉出远程的最新代码
```bash
git pull upstream master
```

- 切换回 branch1:
```bash
git checkout branch1
```

- 把 master 的 commit 合并到 branch1:
```bash
git rebase master
```

- 把更新代码提交到自己的 branch1 中:
```bash
git push origin branch1
```

#### Pull Request
提交 Pull Request
你可以在你的 github 代码仓库页面切换到 branches 页面点击 branch1 分支后点击 New pull request 按钮, 添加相关注释后提交. OR 切换到 branch1 分支的代码仓库点击 Compare & pull request 按钮, 添加相关注释后提交.

需求点，解决bug。这些需要详细说明（一般关联 issue 或者注释都算）。

我们会 review 以及合并你的代码，也有可能要求你做一些修改或者告诉你为什么不能接受这样的修改。

#### commit 规范
提交 commit 的类型，包括以下几种

- feat 🚀: 新功能
- fix 🧩: 修复问题
- docs 📚: 修改文档
- style 🎨: 修改代码格式，不影响代码逻辑
- refactor ♻️: 重构代码，理论上不影响现有功能
- perf ⚡️: 提升性能
- test ✅: 增加修改测试用例
- chore 🔨: 修改工具相关（包括但不限于文档、代码生成等）
- build 📦️: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）

# License

MIT © [xun082](https://github.com/xun082)

# 捐赠 🍵

> 如果你正在使用这个项目或者喜欢这个项目的，可以通过以下方式支持我

Star、Fork、Watch 一键三连 🚀🚀
