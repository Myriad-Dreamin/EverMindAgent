# Contributing Guide

Thank you for your interest in the EverMindAgent project! We welcome contributions of all forms.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an Issue and include the following information:

- **Problem Description**: A clear description of the problem.
- **Steps to Reproduce**: Detailed steps to reproduce the issue.
- **Expected Behavior**: What you expected to happen.
- **Actual Behavior**: What actually happened.
- **Environment Information**:
  - Operating system
  - Browser and version

### Suggesting New Features

If you have an idea for a new feature, please create an Issue first to discuss it:

- Describe the purpose and value of the feature.
- Explain the intended use case.
- Provide a design proposal if possible.

### Submitting Code

#### Getting Started

1. Fork this repository.
2. Clone your fork:

   ```bash
   git clone https://github.com/EmaFanClub/EverMindAgent
   cd EverMindAgent
   ```

3. Create a new branch:

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

   This is optional but you could see and follow the [Conventional Branch](https://conventional-branch.github.io/) for branch name format.

4. Install development dependencies:
   ```bash
   pnpm install
   ```

#### Development Process

1. **Write Code**
   - Follow the project's code style (see the [Development Guide](docs/DEVELOPMENT_GUIDE.md#code-style-guide)).
   - Add necessary comments and docstrings.
   - Keep your code clean and concise.

2. **Add Tests**
   - Add test cases for new features.
   - Ensure all tests pass:
     ```bash
     pnpm test
     ```

3. **Update Documentation**
   - If you add a new feature, update the README or relevant documentation.
   - Keep documentation in sync with your code.

4. **Commit Changes**
   - Use clear commit messages:
     ```bash
     git commit -m "feat(tools): add new file search tool"
     # or
     git commit -m "fix(agent): fix error handling for tool calls"
     ```
   - Commit message format:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation updates
     - `style`: Code style adjustments
     - `refactor`: Code refactoring
     - `test`: Test-related changes
     - `chore`: Build or auxiliary tools

     See and follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) for commit message format.

5. **Push to Your Fork**

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request**
   - Create a Pull Request on GitHub.
   - Clearly describe your changes.
   - Reference any related Issues if applicable.

#### Pull Request Checklist

Before submitting a PR, please ensure:

- [ ] The code follows the project's style guide.
- [ ] All tests pass.
- [ ] Necessary tests have been added.
- [ ] Relevant documentation has been updated.
- [ ] The commit message is clear and concise.
- [ ] There are no unrelated changes.

### Code Review

All Pull Requests will be reviewed:

- We will review your code as soon as possible.
- We may request some changes.
- Please be patient and responsive to feedback.
- Once approved, your PR will be merged into the main branch.

## Code Style Guide

### Code Style

Run format and linter using `pnpm format`.

TODO: setup linter in IDEs and editors.

### Testing

TODO: tests.

## Community Guidelines

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and be friendly and respectful.

## Questions and Help

If you have any questions:

- Check the [README](README.md) and [documentation](docs/).
- Search existing Issues.
- Create a new Issue to ask a question.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).

---

Thank you again for your contribution! 🎉
