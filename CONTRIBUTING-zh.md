# 贡献指南

非常感谢你有兴趣为本项目贡献代码！为了使贡献过程尽可能顺利，请遵循以下指南。

## 如何开始

### 1. Fork 仓库

首先，fork 仓库到你的 GitHub 账户中。这会创建一个你自己的仓库副本。

### 2. 克隆仓库

在你的本地机器上克隆你刚刚 fork 的仓库：

```bash
git clone https://github.com/你的用户名/项目名.git
cd 项目名
```

### 3. 添加上游远程仓库

为了保持你的仓库与原始仓库同步，请添加上游远程仓库：

```bash
git remote add upstream https://github.com/xun082/create-ai-toolkit.git
```

### 4. 创建新分支

在开始工作之前，请确保你创建了一个新的分支：

```bash
git checkout -b feature/你的分支名
```

## 开发流程

### 1. 安装依赖

在你开始开发之前，请安装所有的依赖：

```bash
pnpm install
```

### 2. 运行项目

为了确保你在一个正常运行的环境下进行开发，启动项目：

```bash
pnpm dev
```

### 3. 全局链接项目

为了在开发过程中方便地使用和测试你的脚手架命令，可以使用 pnpm link --global 将你的项目全局链接：

```bash
pnpm link --global
```

使用 npm link 的话，命令如下：

```bash
npm link
```

这样，你就可以在任何地方使用你的脚手架命令，而不必每次都从项目目录中运行。

### 4. 进行开发

请遵循以下开发准则：

- 确保代码清晰、简洁。
- 遵循项目的代码风格和规范（可以使用 ESLint 和 Prettier）。
- 如果你添加了新功能，请编写相应的测试。
- 如果你修复了 bug，请添加测试来防止将来再次出现。

### 4. 提交更改

在提交你的更改之前，请确保你进行了适当的代码格式化和 lint：

```bash
pnpm lint
pnpm format
```

然后提交你的更改：

```bash
git add .
git commit -m "描述清晰的提交信息"
```

### 5. 同步你的分支

在你准备好提交你的更改之前，请确保你的分支是最新的：

```bash
git fetch upstream
git rebase upstream/main
```

### 6. 推送分支

将你的分支推送到你自己的仓库：

```bash
git push origin feature/你的分支名
```

### 7. 创建 Pull Request

在 GitHub 上，导航到你 fork 的仓库，点击 "Compare & pull request" 按钮。请确保你详细描述了你所做的更改。

## 代码审查

所有的 Pull Request 都会被审查。请注意以下几点：

- 你的代码是否清晰且易于理解。
- 你是否遵循了项目的代码风格和规范。
- 你是否添加了适当的测试。
- 你的更改是否与现有的代码兼容。

## 常见问题

### 如何报告 Bug？

如果你发现了 Bug，请在 GitHub 上创建一个 Issue，并尽可能详细地描述 Bug 及其复现步骤。

### 如何请求新功能？

如果你有新功能的建议，请在 GitHub 上创建一个 Issue，详细描述你的建议及其潜在的用途。

## 联系我们

如果你有任何问题或需要帮助，请随时通过邮件 `2042204285@qq.com` 或者微信 `yunmz777` 联系我们，或者在 GitHub 上提问。
