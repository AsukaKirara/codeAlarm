# Testing Guide - Smart AI Generation Alert Extension

This guide provides comprehensive instructions for testing the VSCode extension functionality.

## 🧪 Test Infrastructure Overview

The extension uses the official VSCode testing framework with the following structure:

```
test/
├── runTest.ts              # Test runner configuration
├── suite/
│   ├── index.ts           # Test suite index and Mocha configuration
│   ├── extension.test.ts   # Extension activation and command tests
│   ├── configManager.test.ts  # Configuration management tests
│   ├── alarmManager.test.ts    # Alarm logic tests
│   └── eventHandlers.test.ts   # Event handling tests
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies including test dependencies
npm install
```

### 2. Compile TypeScript

```bash
# Compile all TypeScript files including tests
npm run compile
```

### 3. Run Tests

```bash
# Run all automated tests
npm test
```

## 📋 Test Categories

### **Unit Tests** ✅ *Currently Available*

Tests individual components in isolation:

- **Extension Tests**: Activation, command registration, configuration
- **ConfigManager Tests**: Configuration loading and validation
- **AlarmManager Tests**: Core alarm logic (placeholder tests)
- **EventHandlers Tests**: Event listener setup and disposal

### **Integration Tests** ⏳ *Planned for Future*

End-to-end workflow testing when core functionality is implemented.

### **Manual Tests** 📖 *Instructions Below*

Interactive testing in VSCode development environment.

## 🔧 Manual Testing Instructions

### Step 1: Open Extension in Development Mode

1. **Open the project in VSCode**:
   ```bash
   code .
   ```

2. **Start the development build**:
   ```bash
   npm run watch
   ```

3. **Launch Extension Development Host**:
   - Press `F5` or go to `Run and Debug` view
   - Select "Run Extension" configuration
   - This opens a new VSCode window with your extension loaded

### Step 2: Test Extension Activation

1. **Verify Extension is Active**:
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type "AI Alert" - you should see the extension commands

2. **Check Extension Status**:
   - Go to Extensions view (`Ctrl+Shift+X`)
   - Search for "Smart AI Generation Alert"
   - Should show as "Development" and enabled

### Step 3: Test Commands

1. **Test Sound Command**:
   - Command Palette → "AI Alert: Test Alert Sound"
   - Should show info message (functionality placeholder)

2. **Test Toggle Command**:
   - Command Palette → "AI Alert: Toggle Extension On/Off"
   - Should show status message and toggle the enabled setting

### Step 4: Test Configuration

1. **Open Settings**:
   - `File > Preferences > Settings` (or `Ctrl+,`)
   - Search for "AI Alert"

2. **Verify Configuration Options**:
   - ✅ Enable/disable extension
   - ✅ Countdown seconds (5-60)
   - ✅ Terminal use threshold (1-30 seconds)
   - ✅ Recent terminal threshold (0.5-10 minutes)

3. **Test Configuration Changes**:
   - Modify settings and verify they save correctly
   - Use toggle command to verify enabled/disabled state

## 📊 Current Test Coverage

| Component | Test Status | Coverage |
|:----------|:------------|:---------|
| **Extension Activation** | ✅ Complete | 100% |
| **Command Registration** | ✅ Complete | 100% |
| **Configuration Loading** | ✅ Complete | 100% |
| **AlarmManager** | ⚠️ Placeholder | Basic |
| **EventHandlers** | ⚠️ Placeholder | Basic |
| **Core Alarm Logic** | ⏳ Pending | 0% |
| **Sound Management** | ⏳ Not Implemented | 0% |

## 🐛 Debugging Tests

### Running Tests with Debug Output

```bash
# Run tests with verbose output
npm run compile && node ./out/test/runTest.js
```

### Debugging in VSCode

1. Set breakpoints in test files
2. Go to Run and Debug view
3. Select "Extension Tests" configuration
4. Press `F5` to start debugging

### Common Issues

1. **Tests fail to run**: Ensure `npm run compile` completed successfully
2. **Extension not found**: Check package.json `name` and `publisher` fields
3. **Configuration tests fail**: Verify default values in package.json match types.ts

## 📈 Future Testing Roadmap

### Phase 1: Core Functionality Tests ⏳
- Timer logic validation
- Event filtering tests
- Alarm triggering tests
- Terminal focus detection

### Phase 2: Integration Tests ⏳
- End-to-end alarm workflows
- Configuration change handling
- Cross-platform compatibility

### Phase 3: Performance Tests ⏳
- Memory usage monitoring
- Event handling performance
- Timer accuracy validation

## 🔍 Test Development Guidelines

### Adding New Tests

1. **Create test file** in `test/suite/` directory
2. **Follow naming convention**: `*.test.ts`
3. **Use Mocha syntax**: `suite()`, `test()`, `setup()`, `teardown()`
4. **Import assertions**: `import * as assert from 'assert';`

### Test Structure Example

```typescript
import * as assert from 'assert';
import { YourComponent } from '../../src/yourComponent';

suite('YourComponent Test Suite', () => {
    let component: YourComponent;

    setup(() => {
        component = new YourComponent();
    });

    teardown(() => {
        component.dispose();
    });

    test('Should do something', () => {
        // Test implementation
        assert.ok(component, 'Component should exist');
    });
});
```

## 📞 Support

If you encounter issues with testing:

1. Check the [Development Guide](development-guide.md)
2. Review the [Technical Specification](technical-specification.md)
3. Examine test output for specific error messages
4. Verify all dependencies are installed correctly
