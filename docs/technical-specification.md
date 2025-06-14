# Smart AI Generation Alert Extension - Technical Specification

**Document ID:** TECH-SPEC-AI-ALERT-1.0  
**Project Name:** Smart AI Generation Alert Extension  
**Date:** December 2024  
**Version:** 1.0

## 1.0 System Architecture

The system will be a self-contained VS Code extension developed using TypeScript and the official VS Code Extension API. It will be event-driven, activating its logic based on listeners attached to editor and terminal events. No external dependencies are required for the core logic, though a sound-playing library could be considered for advanced audio control.

## 2.0 State Management

The extension must maintain the following state variables in memory to track activity over time:

- `lastCodeChangeTimestamp`: `number | null` - Stores the timestamp of the last text change
- `lastTerminalFocusTimestamp`: `number | null` - Stores the timestamp of the last terminal activation
- `alarmTimerId`: `NodeJS.Timeout | null` - Reference to the 15-second countdown timer
- `isExtensionActive`: `boolean` - Tracks if the extension is currently monitoring

## 3.0 Logic Flow

### 3.1 Initialization (`activate` function)
- Initialize all state variables to appropriate defaults
- Register event listeners for:
  - `vscode.workspace.onDidChangeTextDocument`
  - `vscode.workspace.onDidChangeTextEditorSelection`
  - `vscode.window.onDidChangeActiveTerminal`
- Load user configuration settings

### 3.2 Event Handlers

#### Text Change Event (`onDidChangeTextDocument`)
```typescript
function handleCodeChange() {
    clearExistingTimer();
    lastCodeChangeTimestamp = Date.now();
    startAlarmCountdown();
}
```

#### Cursor Movement Event (`onDidChangeTextEditorSelection`)
```typescript
function handleUserActivityVeto() {
    clearExistingTimer();
}
```

#### Terminal Focus Event (`onDidChangeActiveTerminal`)
```typescript
function handleTerminalFocus() {
    lastTerminalFocusTimestamp = Date.now();
    clearExistingTimer(); // Terminal focus is user activity
}
```

### 3.3 Alarm Logic
```typescript
function runAlarmChecks() {
    if (!shouldTriggerAlarm()) return;
    
    if (isImmediateTerminalUse() || isRecentTerminalUse()) {
        suppressAlarm();
        return;
    }
    
    triggerAlarm();
}
```

## 4.0 VS Code API Mapping

| Functional Requirement | VS Code API / Node.js Module |
|:---|:---|
| FR-01, FR-03 | `vscode.workspace.onDidChangeTextDocument` |
| FR-03 (Veto) | `vscode.workspace.onDidChangeTextEditorSelection` |
| FR-05, FR-06 | `vscode.window.onDidChangeActiveTerminal` |
| FR-02, FR-04 | `setTimeout`, `clearTimeout` |
| FR-07 (Alarm Sound) | `process.stdout.write('\x07')` or audio library |
| NFR-03 (Config) | `vscode.workspace.getConfiguration('aiAlert')` |

## 5.0 Configuration Schema

```json
{
  "aiAlert.countdownSeconds": {
    "type": "number",
    "default": 15,
    "description": "Delay after code change before considering alarm"
  },
  "aiAlert.terminalUseThresholdSeconds": {
    "type": "number", 
    "default": 10,
    "description": "Window after code change where terminal focus suppresses alarm"
  },
  "aiAlert.recentTerminalThresholdMinutes": {
    "type": "number",
    "default": 1,
    "description": "Look-back period for recent terminal activity"
  },
  "aiAlert.enabled": {
    "type": "boolean",
    "default": true,
    "description": "Enable/disable the AI alert extension"
  }
}
```

## 6.0 Error Handling

- Graceful handling of timer cleanup on extension deactivation
- Null checks for all timestamp operations
- Configuration validation with fallback to defaults
- Exception handling around sound playback operations
