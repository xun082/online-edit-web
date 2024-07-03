# Contributing Guide

Thank you very much for your interest in contributing to this project! To make the contribution process as smooth as possible, please follow the guidelines below.

## Getting Started

### 1. Fork the Repository

First, fork the repository to your GitHub account. This will create your own copy of the repository.

### 2. Clone the Repository

Clone the repository you just forked to your local machine:

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name
```

### 3. Add Upstream Remote

To keep your repository in sync with the original repository, add the upstream remote:

```bash
git remote add upstream https://github.com/xun082/create-ai-toolkit.git
```

### 4. Create a New Branch

Before you start working, make sure to create a new branch:

```bash
git checkout -b feature/your-branch-name
```

## Development Workflow

### 1. Install Dependencies

Before you start developing, install all dependencies:

```bash
pnpm install
```

### 2. Run the Project

To ensure you are developing in a properly running environment, start the project:

```bash
pnpm dev
```

### 3. Globally Link the Project

To conveniently use and test your scaffold commands during development, you can globally link your project using `pnpm link --global`:

```bash
pnpm link --global
```

If using `npm link`, the command is:

```bash
npm link
```

This way, you can use your scaffold commands anywhere without having to run them from the project directory each time.

### 4. Development Guidelines

Please follow these development guidelines:

- Ensure code is clear and concise.
- Follow the project's code style and standards (you can use ESLint and Prettier).
- If you add new features, please write corresponding tests.
- If you fix bugs, please add tests to prevent them from reoccurring.

### 5. Commit Changes

Before committing your changes, make sure you have properly formatted and linted the code:

```bash
pnpm lint
pnpm format
```

Then commit your changes:

```bash
git add .
git commit -m "Clear and descriptive commit message"
```

### 6. Sync Your Branch

Before you submit your changes, make sure your branch is up to date:

```bash
git fetch upstream
git rebase upstream/main
```

### 7. Push Your Branch

Push your branch to your own repository:

```bash
git push origin feature/your-branch-name
```

### 8. Create a Pull Request

On GitHub, navigate to your forked repository and click the "Compare & pull request" button. Make sure to describe your changes in detail.

## Code Review

All Pull Requests will be reviewed. Please keep the following points in mind:

- Is your code clear and easy to understand?
- Have you followed the project's code style and standards?
- Have you added appropriate tests?
- Are your changes compatible with the existing code?

## Frequently Asked Questions

### How to Report a Bug?

If you find a bug, please create an issue on GitHub and describe the bug and the steps to reproduce it as detailed as possible.

### How to Request a New Feature?

If you have a suggestion for a new feature, please create an issue on GitHub and describe your suggestion and its potential use in detail.

## Contact Us

If you have any questions or need help, please feel free to contact us via email at `2042204285@qq.com` or WeChat `yunmz777`, or ask on GitHub.
