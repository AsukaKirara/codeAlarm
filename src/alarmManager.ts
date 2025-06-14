/**
 * Alarm Manager for Smart AI Generation Alert Extension
 * Handles core alarm logic, state management, and timer operations
 */

import { AlarmState, AlarmConfig } from './types';

/**
 * AlarmManager class handles the core business logic
 * TODO: Implement in subsequent task "Implement Core Alarm Management Logic"
 */
export class AlarmManager {
    private state: AlarmState;
    private config: AlarmConfig;

    constructor(config: AlarmConfig) {
        this.config = config;
        this.state = {
            lastCodeChangeTimestamp: null,
            lastTerminalFocusTimestamp: null,
            alarmTimerId: null,
            isExtensionActive: true
        };
    }

    /**
     * Handle code change events
     */
    public handleCodeChange(): void {
        if (!this.config.enabled) {
            return;
        }

        if (this.state.alarmTimerId) {
            console.log('[AlarmManager] Code change detected - resetting timer');
            this.resetTimer();
        } else {
            console.log('[AlarmManager] Code change detected - activating timer');
            this.activateTimer();
        }
    }

    /**
     * Handle user activity events (cursor movement, additional edits)
     */
    public handleUserActivity(): void {
        if (!this.config.enabled) {
            return;
        }

        if (this.state.alarmTimerId) {
            console.log('[AlarmManager] User activity detected - resetting timer');
            this.resetTimer();
        } else {
            console.log('[AlarmManager] User activity detected - no active timer to reset');
        }
    }

    /**
     * Handle terminal focus events
     */
    public handleTerminalFocus(): void {
        if (!this.config.enabled) {
            return;
        }

        if (this.state.alarmTimerId) {
            console.log('[AlarmManager] Terminal focus detected - resetting timer');
            this.resetTimer();
        } else {
            console.log('[AlarmManager] Terminal focus detected - no active timer to reset');
        }
    }

    /**
     * Activate timer - start countdown (only for code changes)
     */
    private activateTimer(): void {
        // Clear existing timer
        this.clearExistingTimer();

        // Update timestamp
        this.state.lastCodeChangeTimestamp = Date.now();

        // Start new countdown
        this.startAlarmCountdown();
    }

    /**
     * Reset timer - restart countdown (only if already active)
     */
    private resetTimer(): void {
        if (!this.state.alarmTimerId) {
            return; // Don't reset if not active
        }

        // Clear existing timer
        this.clearExistingTimer();

        // Start new countdown (keep same activation state)
        this.startAlarmCountdown();
    }

    /**
     * Start alarm countdown timer
     */
    private startAlarmCountdown(): void {
        const countdownMs = this.config.countdownSeconds * 1000;
        const now = Date.now();

        console.log(`[AlarmManager] Starting ${this.config.countdownSeconds}s countdown at ${new Date(now).toLocaleTimeString()}`);

        this.state.alarmTimerId = setTimeout(() => {
            this.triggerAlarm();
        }, countdownMs);
    }

    /**
     * Clear existing alarm timer
     */
    private clearExistingTimer(): void {
        if (this.state.alarmTimerId) {
            clearTimeout(this.state.alarmTimerId);
            this.state.alarmTimerId = null;
            console.log('[AlarmManager] Timer cleared');
        }
    }





    /**
     * Trigger the alarm
     */
    private triggerAlarm(): void {
        console.log('[AlarmManager] 🚨 ALARM TRIGGERED! 1 minute of inactivity detected');

        // Deactivate timer after alarm
        this.state.alarmTimerId = null;
        console.log('[AlarmManager] Timer deactivated after alarm');

        // Show prominent notification
        import('vscode').then(vscode => {
            vscode.window.showWarningMessage(
                '🚨 AI Code Generation Complete! 🚨',
                'Dismiss',
                'Settings'
            ).then(selection => {
                if (selection === 'Settings') {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'aiAlert');
                }
            });
        });

        // Play multiple system sounds for longer alarm
        this.playExtendedAlarm();
    }

    /**
     * Play extended alarm sound
     */
    private playExtendedAlarm(): void {
        try {
            const { exec } = require('child_process');
            const os = require('os');

            if (os.platform() === 'win32') {
                // Play multiple beeps for Windows
                exec('powershell -c "[console]::beep(800,300); Start-Sleep -Milliseconds 200; [console]::beep(1000,300); Start-Sleep -Milliseconds 200; [console]::beep(800,300)"');
            } else if (os.platform() === 'darwin') {
                // Play system sound multiple times for macOS
                exec('afplay /System/Library/Sounds/Glass.aiff & sleep 0.5 && afplay /System/Library/Sounds/Glass.aiff & sleep 0.5 && afplay /System/Library/Sounds/Glass.aiff');
            } else {
                // Play system sound multiple times for Linux
                exec('(paplay /usr/share/sounds/alsa/Front_Left.wav || aplay /usr/share/sounds/alsa/Front_Left.wav) && sleep 0.5 && (paplay /usr/share/sounds/alsa/Front_Left.wav || aplay /usr/share/sounds/alsa/Front_Left.wav)');
            }

            console.log('[AlarmManager] Extended alarm sound played');
        } catch (error) {
            console.log('[AlarmManager] Could not play extended alarm sound:', error);
        }
    }

    /**
     * Update configuration
     */
    public updateConfiguration(config: AlarmConfig): void {
        this.config = config;
    }

    /**
     * Dispose and cleanup
     */
    public dispose(): void {
        this.clearExistingTimer();
        this.state.isExtensionActive = false;
    }
}
