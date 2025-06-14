/**
 * Smart AI Generation Alert Extension
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { ExtensionContext, LogLevel, AlarmConfig, DEFAULT_CONFIG } from './types';
import { ConfigManager } from './configManager';
import { AlarmManager } from './alarmManager';
import { EventHandlers } from './eventHandlers';

let extensionContext: ExtensionContext | null = null;

/**
 * Extension activation function
 * Called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Smart AI Generation Alert Extension is now active!');
    
    try {
        // Initialize components
        const configManager = new ConfigManager();
        const config = configManager.getConfiguration();
        const alarmManager = new AlarmManager(config);
        const eventHandlers = new EventHandlers(alarmManager);

        // Initialize extension context
        extensionContext = {
            configManager,
            alarmManager,
            eventHandlers,
            soundManager: null // Will be implemented later
        };

        // Set up event listeners
        eventHandlers.setupEventListeners();

        // Register configuration change handlers
        configManager.onConfigurationChanged(() => {
            const newConfig = configManager.getConfiguration();
            alarmManager.updateConfiguration(newConfig);
        });

        // Add disposables to context for cleanup
        context.subscriptions.push(
            { dispose: () => eventHandlers.dispose() },
            { dispose: () => alarmManager.dispose() },
            { dispose: () => configManager.dispose() }
        );

        // Register extension commands
        registerCommands(context);

        // Log successful activation
        logMessage(LogLevel.INFO, 'Extension activated successfully');

    } catch (error) {
        logMessage(LogLevel.ERROR, `Failed to activate extension: ${error}`);
        vscode.window.showErrorMessage('Smart AI Generation Alert: Failed to activate extension');
    }
}

/**
 * Extension deactivation function
 * Called when the extension is deactivated
 */
export function deactivate() {
    console.log('Smart AI Generation Alert Extension is being deactivated');
    
    try {
        // TODO: Implement cleanup in subsequent tasks
        // 1. Dispose all event listeners
        // 2. Clear any active timers
        // 3. Cleanup AlarmManager state
        
        extensionContext = null;
        logMessage(LogLevel.INFO, 'Extension deactivated successfully');
        
    } catch (error) {
        logMessage(LogLevel.ERROR, `Error during deactivation: ${error}`);
    }
}

/**
 * Register extension commands
 */
function registerCommands(context: vscode.ExtensionContext) {
    // Test sound command
    const testSoundCommand = vscode.commands.registerCommand('aiAlert.testSound', () => {
        // TODO: Implement sound testing when SoundManager is available
        vscode.window.showInformationMessage('Test sound functionality will be implemented in subsequent tasks');
    });

    // Toggle enabled command
    const toggleEnabledCommand = vscode.commands.registerCommand('aiAlert.toggleEnabled', async () => {
        const config = vscode.workspace.getConfiguration('aiAlert');
        const currentEnabled = config.get<boolean>('enabled', true);
        await config.update('enabled', !currentEnabled, vscode.ConfigurationTarget.Global);
        
        const status = !currentEnabled ? 'enabled' : 'disabled';
        vscode.window.showInformationMessage(`Smart AI Generation Alert ${status}`);
    });

    // Add commands to context for disposal
    context.subscriptions.push(testSoundCommand, toggleEnabledCommand);
}

/**
 * Utility function for logging messages
 */
function logMessage(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] Smart AI Alert: ${message}`;
    
    switch (level) {
        case LogLevel.DEBUG:
        case LogLevel.INFO:
            console.log(logEntry);
            break;
        case LogLevel.WARN:
            console.warn(logEntry);
            break;
        case LogLevel.ERROR:
            console.error(logEntry);
            break;
    }
}
