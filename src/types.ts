/**
 * Type definitions for Smart AI Generation Alert Extension
 */

import * as vscode from 'vscode';

/**
 * Configuration interface for the extension settings
 */
export interface AlarmConfig {
    enabled: boolean;
    countdownSeconds: number;
    terminalUseThresholdSeconds: number;
    recentTerminalThresholdMinutes: number;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: AlarmConfig = {
    enabled: true,
    countdownSeconds: 60,
    terminalUseThresholdSeconds: 10,
    recentTerminalThresholdMinutes: 1
};

/**
 * State interface for the AlarmManager
 */
export interface AlarmState {
    lastCodeChangeTimestamp: number | null;
    lastTerminalFocusTimestamp: number | null;
    alarmTimerId: NodeJS.Timeout | null;
    isExtensionActive: boolean;
}

/**
 * Event handler disposables interface
 */
export interface EventDisposables {
    textDocumentChange: vscode.Disposable | null;
    editorSelectionChange: vscode.Disposable | null;
    terminalFocusChange: vscode.Disposable | null;
    configurationChange: vscode.Disposable | null;
}

/**
 * Sound playback strategy enum
 */
export enum SoundStrategy {
    SYSTEM_BELL = 'system_bell',
    NOTIFICATION_API = 'notification_api',
    PLATFORM_COMMAND = 'platform_command'
}

/**
 * Platform detection enum
 */
export enum Platform {
    WINDOWS = 'win32',
    MACOS = 'darwin',
    LINUX = 'linux'
}

/**
 * Extension context interface
 */
export interface ExtensionContext {
    configManager: any; // Will be properly typed when implemented
    alarmManager: any; // Will be properly typed when implemented
    eventHandlers: any; // Will be properly typed when implemented
    soundManager: any; // Will be properly typed when implemented
}

/**
 * Logging levels
 */
export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}
