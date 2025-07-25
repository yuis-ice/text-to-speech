# 🤝 Contributing to VoiceFlow

Thank you for your interest in contributing to VoiceFlow! We welcome contributions from developers of all skill levels. This guide will help you get started with contributing to our text-to-speech application.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Process](#-development-process)
- [Pull Request Process](#-pull-request-process)
- [Coding Standards](#-coding-standards)
- [Testing](#-testing)
- [Issue Reporting](#-issue-reporting)
- [Feature Requests](#-feature-requests)
- [Contributor License Agreement](#️-contributor-license-agreement-cla)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help create a positive environment
- **Be collaborative**: Work together constructively and share knowledge
- **Be professional**: Keep discussions focused and productive
- **Be patient**: Remember that everyone is learning and growing

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git
- A modern web browser

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/text-to-speech.git
   cd text-to-speech
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/yuis-ice/text-to-speech.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open `http://localhost:5173` in your browser
   - Ensure all features work as expected

## 🔄 Development Process

### Creating a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Write clean, readable code** following our [coding standards](#-coding-standards)
2. **Test your changes** thoroughly in multiple browsers
3. **Update documentation** if needed
4. **Add/update tests** for new functionality

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add voice selection dropdown to settings panel"
git commit -m "Fix: Resolve audio playback issue on Safari"
git commit -m "Docs: Update README with new feature information"

# Use conventional commit format when possible
git commit -m "feat: add keyboard shortcuts for playback controls"
git commit -m "fix: resolve memory leak in speech synthesis"
git commit -m "docs: improve installation instructions"
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated if necessary
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Mobile compatibility verified

### Submitting Your PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use our [PR template](.github/PULL_REQUEST_TEMPLATE.md)
   - Provide clear description of changes
   - Link related issues
   - Add screenshots/videos if applicable

3. **Respond to feedback**
   - Address reviewer comments promptly
   - Push additional commits as needed
   - Keep discussions constructive

## 💻 Coding Standards

### TypeScript/JavaScript

- **Use TypeScript** for all new code
- **Prefer functional components** with hooks
- **Use descriptive variable names**
- **Add proper type annotations**
- **Avoid `any` types** when possible

```typescript
// Good
interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

// Avoid
const settings: any = { /* ... */ };
```

### React Components

- **Use functional components** with hooks
- **Extract custom hooks** for reusable logic
- **Memoize expensive computations** with `useMemo`
- **Use proper prop types**

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### CSS/Styling

- **Use Tailwind CSS** for styling
- **Follow responsive design** principles
- **Maintain consistent spacing** using Tailwind's spacing scale
- **Use semantic class names** for custom CSS

### File Organization

```
src/
  ├── components/          # Reusable components
  ├── hooks/              # Custom hooks
  ├── types/              # TypeScript type definitions
  ├── utils/              # Utility functions
  └── App.tsx             # Main application component
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Guidelines

- **Write tests for new features**
- **Update tests for modified code**
- **Test edge cases and error conditions**
- **Use descriptive test names**

```typescript
// Good test example
describe('VoiceSettings', () => {
  it('should update speech rate when slider value changes', () => {
    // Test implementation
  });
  
  it('should handle invalid voice selection gracefully', () => {
    // Test implementation
  });
});
```

## 🐛 Issue Reporting

### Bug Reports

Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) and include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Browser and OS information**
- **Screenshots or videos** if helpful

### Performance Issues

For performance-related issues, please include:

- **Browser developer tools** performance profiling data
- **Specific actions** that trigger the performance issue
- **Device specifications** (especially for mobile issues)

## ✨ Feature Requests

Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml) and provide:

- **Clear use case** for the feature
- **Detailed description** of the proposed solution
- **Mockups or examples** if applicable
- **Priority level** and reasoning

## 🛡️ Contributor License Agreement (CLA)

By submitting a pull request or contribution, you agree to the following:

> You grant the project founder a **non-exclusive, irrevocable, worldwide, royalty-free license** to use, modify, sublicense, and relicense your contribution, including the right to incorporate it into dual-licensed or commercial versions of the project.

This ensures that the project can grow sustainably while preserving creator rights.  
If you are contributing on behalf of a company or organization, please contact us in advance.

### Why We Need a CLA

- **Legal clarity**: Ensures we have the right to use and distribute contributions
- **Project sustainability**: Allows for future licensing flexibility
- **Protection**: Protects both contributors and the project
- **Commercial use**: Enables potential commercial applications while keeping the project open source

### What This Means for You

- ✅ Your contributions remain attributed to you
- ✅ The project stays open source under MIT license
- ✅ You can still use your contributions in other projects
- ✅ You help ensure the project's long-term viability

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### 🔧 Code Contributions
- **New features**: Voice effects, export functionality, themes
- **Bug fixes**: Cross-browser compatibility, performance issues
- **Accessibility**: Screen reader support, keyboard navigation
- **Mobile optimization**: Touch gestures, responsive design

### 📚 Documentation
- **API documentation**: Code comments, function documentation
- **User guides**: How-to articles, best practices
- **Developer docs**: Architecture decisions, contributing guides
- **Translations**: Internationalization support

### 🎨 Design
- **UI/UX improvements**: Better user interface, user experience
- **Icons and graphics**: Custom icons, illustrations
- **Themes**: Dark mode enhancements, color schemes
- **Animations**: Smooth transitions, loading states

### 🧪 Testing
- **Unit tests**: Component testing, utility function tests
- **Integration tests**: Feature testing, user workflow tests
- **Browser testing**: Cross-browser compatibility
- **Accessibility testing**: Screen reader compatibility, keyboard navigation

## 🏆 Recognition

Contributors who make significant contributions will be:

- **Listed in our README** contributors section
- **Mentioned in release notes** for their contributions
- **Invited to join** our core contributor team (for regular contributors)
- **Given special recognition** in our community discussions

## 📞 Getting Help

Need help with contributing? Reach out through:

- **GitHub Discussions**: [Ask questions](https://github.com/yuis-ice/text-to-speech/discussions)
- **Issues**: [Create an issue](https://github.com/yuis-ice/text-to-speech/issues/new/choose) for bugs or features
- **Direct contact**: Check the repository for maintainer contact information

## 🙏 Thank You

Thank you for considering contributing to VoiceFlow! Every contribution, no matter how small, helps make this project better for everyone. We're excited to see what you'll build with us!

---

<div align="center">

**Happy Coding!** 🎉

*Made with ❤️ by the VoiceFlow community*

</div>