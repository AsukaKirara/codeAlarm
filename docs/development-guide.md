# Development Setup and Extension Launch Guide

**Document ID:** DEV-GUIDE-AI-ALERT-1.0  
**Project Name:** Smart AI Generation Alert Extension  
**Date:** December 2024  
**Version:** 1.0

## 1.0 Prerequisites and Environment Setup

### 1.1 Required Software

| Software | Version | Purpose | Installation |
|:---------|:--------|:--------|:-------------|
| **Node.js** | 16.x or higher | JavaScript runtime | [Download](https://nodejs.org/) |
| **npm** | 8.x or higher | Package manager | Included with Node.js |
| **Visual Studio Code** | 1.74.0 or higher | Development environment | [Download](https://code.visualstudio.com/) |
| **Git** | Latest | Version control | [Download](https://git-scm.com/) |

### 1.2 VSCode Extensions (Recommended)

```bash
# Install recommended extensions
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ms-vscode.vscode-eslint
code --install-extension ms-vscode.test-adapter-converter
code --install-extension ms-vscode.extension-test-runner
```

### 1.3 Environment Verification

```bash
# Verify installations
node --version    # Should be 16.x or higher
npm --version     # Should be 8.x or higher
code --version    # Should be 1.74.0 or higher
git --version     # Any recent version
```

## 2.0 Project Setup

### 2.1 Clone and Initialize

```bash
# Clone the repository
git clone https://github.com/smart-ai-alert/vscode-extension.git
cd vscode-extension

# Install dependencies
npm install

# Verify installation
npm run compile
npm run lint
```

### 2.2 Project Structure Overview

```
codeAlarm/
├── 📁 .vscode/           # VSCode configuration
│   ├── launch.json       # Debug configurations
│   └── tasks.json        # Build tasks
├── 📁 docs/              # Documentation
├── 📁 src/               # Source code
│   ├── extension.ts      # Main entry point
│   ├── types.ts          # Type definitions
│   ├── configManager.ts  # Configuration management
│   ├── alarmManager.ts   # Core alarm logic
│   └── eventHandlers.ts  # Event handling
├── 📁 out/               # Compiled JavaScript
├── 📁 test/              # Test suite
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
└── .eslintrc.json        # ESLint config
```

### 2.3 Development Dependencies

```json
{
  "devDependencies": {
    "@types/vscode": "^1.74.0",
    "@types/node": "16.x",
    "@typescript-eslint/eslint-plugin": "^5.45.0",
    "@typescript-eslint/parser": "^5.45.0",
    "eslint": "^8.28.0",
    "typescript": "^4.9.4",
    "@vscode/test-electron": "^2.2.0",
    "vsce": "^2.15.0"
  }
}
```

## 3.0 Development Workflow

### 3.1 Daily Development Commands

```bash
# Start development with file watching
npm run watch

# Compile TypeScript
npm run compile

# Run linting
npm run lint

# Run tests
npm run test

# Package extension
npm run package
```

### 3.2 Code Quality Checks

```bash
# Full quality check pipeline
npm run pretest  # Compiles and lints
npm run test     # Runs test suite

# Fix common linting issues
npx eslint src --ext ts --fix
```

## 4.0 VSCode Development Host Setup

### 4.1 Launch Extension in Development Host

#### Method 1: Using F5 (Recommended)

1. **Open Project in VSCode**
   ```bash
   code .
   ```

2. **Start Debugging**
   - Press `F5` or go to `Run and Debug` panel
   - Select "Run Extension" configuration
   - New VSCode window opens with extension loaded

3. **Verify Extension Loading**
   - Check Developer Console: `Help > Toggle Developer Tools`
   - Look for: `Smart AI Generation Alert Extension is now active!`

#### Method 2: Using Command Palette

1. **Open Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. **Run Command**: `Developer: Reload Window`
3. **Check Extension**: `Extensions: Show Running Extensions`

### 4.2 Debug Configuration Details

```json
// .vscode/launch.json
{
    "name": "Run Extension",
    "type": "extensionHost",
    "request": "launch",
    "args": [
        "--extensionDevelopmentPath=${workspaceFolder}"
    ],
    "outFiles": [
        "${workspaceFolder}/out/**/*.js"
    ],
    "preLaunchTask": "${workspaceFolder}/npm: compile"
}
```

### 4.3 Debugging Features

- **Breakpoints**: Set in TypeScript source files
- **Console Logging**: View in Debug Console
- **Variable Inspection**: Hover over variables
- **Call Stack**: Navigate execution flow

## 5.0 Configuration Testing Procedures

### 5.1 Testing Extension Settings

#### 5.1.1 Access Settings

1. **Open Settings**: `File > Preferences > Settings`
2. **Search**: "AI Alert" or "Smart AI Generation Alert"
3. **Modify Values**: Test different configurations

#### 5.1.2 Configuration Parameters

| Setting | Default | Range | Test Values |
|:--------|:--------|:------|:------------|
| `aiAlert.enabled` | `true` | boolean | `true`, `false` |
| `aiAlert.countdownSeconds` | `15` | 5-60 | `5`, `15`, `30`, `60` |
| `aiAlert.terminalUseThresholdSeconds` | `10` | 1-30 | `1`, `5`, `10`, `30` |
| `aiAlert.recentTerminalThresholdMinutes` | `1` | 0.5-10 | `0.5`, `1`, `5`, `10` |

#### 5.1.3 Configuration Testing Script

```typescript
// Test configuration changes
async function testConfiguration() {
    const config = vscode.workspace.getConfiguration('aiAlert');
    
    // Test countdown seconds
    await config.update('countdownSeconds', 30);
    console.log('Updated countdown to 30 seconds');
    
    // Test terminal threshold
    await config.update('terminalUseThresholdSeconds', 5);
    console.log('Updated terminal threshold to 5 seconds');
    
    // Verify changes
    const newConfig = config.get('countdownSeconds');
    console.log(`Current countdown: ${newConfig} seconds`);
}
```

### 5.2 Testing Extension Commands

#### 5.2.1 Available Commands

```bash
# Test sound command
> AI Alert: Test Alert Sound

# Toggle extension
> AI Alert: Toggle Extension On/Off
```

#### 5.2.2 Command Testing Procedure

1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Type**: "AI Alert"
3. **Select Command**: Choose from available options
4. **Verify Behavior**: Check console output and notifications

## 6.0 Build and Packaging

### 6.1 Development Build

```bash
# Clean build
rm -rf out/
npm run compile

# Watch mode for development
npm run watch
```

### 6.2 Production Packaging

```bash
# Install VSCE (if not already installed)
npm install -g @vscode/vsce

# Package extension
npm run package

# Output: smart-ai-generation-alert-1.0.0.vsix
```

### 6.3 Package Verification

```bash
# Install packaged extension locally
code --install-extension smart-ai-generation-alert-1.0.0.vsix

# Uninstall for testing
code --uninstall-extension smart-ai-alert.smart-ai-generation-alert
```

## 7.0 Troubleshooting Common Issues

### 7.1 Compilation Errors

#### Issue: TypeScript Compilation Fails

```bash
# Check TypeScript version
npx tsc --version

# Clean and rebuild
rm -rf out/ node_modules/
npm install
npm run compile
```

#### Issue: Missing Type Definitions

```bash
# Install missing types
npm install --save-dev @types/node @types/vscode

# Update tsconfig.json if needed
```

### 7.2 Extension Loading Issues

#### Issue: Extension Not Activating

**Symptoms**: No console message, commands not available

**Solutions**:
1. Check `package.json` activation events
2. Verify `main` entry point path
3. Check for compilation errors
4. Review VSCode Developer Tools console

```json
// Verify package.json
{
  "activationEvents": ["onStartupFinished"],
  "main": "./out/extension.js"
}
```

#### Issue: Commands Not Found

**Symptoms**: Command palette doesn't show extension commands

**Solutions**:
1. Verify command registration in `package.json`
2. Check command implementation in `extension.ts`
3. Ensure extension is activated

### 7.3 Development Environment Issues

#### Issue: F5 Debugging Not Working

**Solutions**:
1. Check `.vscode/launch.json` configuration
2. Ensure TypeScript is compiled
3. Verify workspace folder structure
4. Restart VSCode

#### Issue: Hot Reload Not Working

**Solutions**:
1. Use `npm run watch` for file watching
2. Reload extension host window: `Ctrl+R`
3. Check file permissions and paths

### 7.4 Performance Issues

#### Issue: Slow Extension Activation

**Diagnostic**:
```typescript
// Add timing to extension.ts
const startTime = Date.now();
export function activate(context: vscode.ExtensionContext) {
    // ... activation code ...
    const activationTime = Date.now() - startTime;
    console.log(`Extension activated in ${activationTime}ms`);
}
```

**Solutions**:
1. Minimize synchronous operations in activation
2. Defer heavy initialization
3. Use lazy loading patterns

## 8.0 Testing in Development Host

### 8.1 Manual Testing Scenarios

#### 8.1.1 Basic Functionality Test

```
1. Open development host (F5)
2. Create new file: test.ts
3. Type some code
4. Wait 15 seconds
5. Expected: No alarm (no terminal suppression)
6. Open terminal
7. Type some code again
8. Expected: Alarm suppressed due to recent terminal use
```

#### 8.1.2 Configuration Test

```
1. Open Settings in development host
2. Change "AI Alert: Countdown Seconds" to 5
3. Type code in editor
4. Wait 5 seconds
5. Expected: Alarm triggers after 5 seconds instead of 15
```

### 8.2 Debug Console Monitoring

```typescript
// Monitor extension behavior
console.log('Code change detected');
console.log('Timer started: 15 seconds');
console.log('Terminal focus detected');
console.log('Timer cancelled');
console.log('Alarm triggered');
```

## 9.0 Next Steps for Development

### 9.1 Current Implementation Status

- ✅ **Project Structure**: Complete
- ⏳ **Configuration Management**: Next task
- ⏳ **Event Handling**: Pending
- ⏳ **Core Alarm Logic**: Pending
- ⏳ **Sound Playback**: Pending

### 9.2 Development Priorities

1. **Implement ConfigManager** (Task 2)
2. **Add Event Handling** (Task 3)
3. **Build Core Alarm Logic** (Task 4)
4. **Add Sound Playback** (Task 5)
5. **Complete Testing Suite** (Task 7)

---

**Last Updated:** December 2024  
**Document Version:** 1.0  
**Development Status:** Environment Ready, Core Implementation Pending
