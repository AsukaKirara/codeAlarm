/**
 * Configuration Manager for Smart AI Generation Alert Extension
 * Handles loading, validation, and monitoring of user settings
 */

import * as vscode from 'vscode';
import { AlarmConfig, DEFAULT_CONFIG, LogLevel } from './types';

/**
 * ConfigManager class handles all configuration-related operations
 * TODO: Implement in subsequent task "Implement Configuration Management System"
 */
export class ConfigManager {
    private config: AlarmConfig;
    private configChangeListener: vscode.Disposable | null = null;

    constructor() {
        this.config = { ...DEFAULT_CONFIG };
        this.loadConfiguration();
    }

    /**
     * Get current configuration
     */
    public getConfiguration(): AlarmConfig {
        this.loadConfiguration();
        return { ...this.config };
    }

    /**
     * Load configuration from VSCode settings
     */
    private loadConfiguration(): void {
        const config = vscode.workspace.getConfiguration('aiAlert');

        this.config = {
            enabled: config.get<boolean>('enabled', DEFAULT_CONFIG.enabled),
            countdownSeconds: config.get<number>('countdownSeconds', DEFAULT_CONFIG.countdownSeconds),
            terminalUseThresholdSeconds: config.get<number>('terminalUseThresholdSeconds', DEFAULT_CONFIG.terminalUseThresholdSeconds),
            recentTerminalThresholdMinutes: config.get<number>('recentTerminalThresholdMinutes', DEFAULT_CONFIG.recentTerminalThresholdMinutes)
        };
    }

    /**
     * Get countdown seconds setting
     * TODO: Implement with validation and fallback
     */
    public getCountdownSeconds(): number {
        return this.config.countdownSeconds;
    }

    /**
     * Get terminal threshold seconds setting
     * TODO: Implement with validation and fallback
     */
    public getTerminalThresholdSeconds(): number {
        return this.config.terminalUseThresholdSeconds;
    }

    /**
     * Get recent terminal threshold minutes setting
     * TODO: Implement with validation and fallback
     */
    public getRecentTerminalThresholdMinutes(): number {
        return this.config.recentTerminalThresholdMinutes;
    }

    /**
     * Check if extension is enabled
     * TODO: Implement with validation and fallback
     */
    public isEnabled(): boolean {
        return this.config.enabled;
    }

    /**
     * Register configuration change listener
     */
    public onConfigurationChanged(callback: () => void): void {
        this.configChangeListener = vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('aiAlert')) {
                this.loadConfiguration();
                callback();
            }
        });
    }

    /**
     * Validate configuration values
     * TODO: Implement configuration validation
     */
    private validateConfiguration(config: Partial<AlarmConfig>): AlarmConfig {
        // TODO: Implement validation logic
        return { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * Dispose configuration change listener
     */
    public dispose(): void {
        if (this.configChangeListener) {
            this.configChangeListener.dispose();
            this.configChangeListener = null;
        }
    }
}
