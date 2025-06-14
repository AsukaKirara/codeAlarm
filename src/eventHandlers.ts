/**
 * Event Handlers for Smart AI Generation Alert Extension
 * Manages VSCode event listeners and routing
 */

import * as vscode from 'vscode';
import { EventDisposables } from './types';

/**
 * EventHandlers class manages all VSCode event listeners
 * TODO: Implement in subsequent task "Implement Core Event Handling System"
 */
export class EventHandlers {
    private disposables: EventDisposables;
    private alarmManager: any; // Will be properly typed when AlarmManager is implemented

    constructor(alarmManager: any) {
        this.alarmManager = alarmManager;
        this.disposables = {
            textDocumentChange: null,
            editorSelectionChange: null,
            terminalFocusChange: null,
            configurationChange: null
        };
    }

    /**
     * Set up all event listeners
     */
    public setupEventListeners(): void {
        console.log('[EventHandlers] Setting up event listeners');

        // Register text document change listener
        this.disposables.textDocumentChange = vscode.workspace.onDidChangeTextDocument((event) => {
            this.handleTextDocumentChange(event);
        });

        // Register editor selection change listener
        this.disposables.editorSelectionChange = vscode.window.onDidChangeTextEditorSelection((event) => {
            this.handleEditorSelectionChange(event);
        });

        // Register terminal focus change listener
        this.disposables.terminalFocusChange = vscode.window.onDidChangeActiveTerminal((terminal) => {
            this.handleTerminalFocusChange(terminal);
        });

        // Also register terminal open/close events for better detection
        const terminalOpenDisposable = vscode.window.onDidOpenTerminal((terminal) => {
            console.log('[EventHandlers] Terminal opened:', terminal.name);
            this.alarmManager.handleTerminalFocus();
        });

        const terminalCloseDisposable = vscode.window.onDidCloseTerminal((terminal) => {
            console.log('[EventHandlers] Terminal closed:', terminal.name);
        });

        console.log('[EventHandlers] Event listeners registered successfully');
    }

    /**
     * Handle text document change events
     */
    private handleTextDocumentChange(event: vscode.TextDocumentChangeEvent): void {
        console.log(`[EventHandlers] Text document change detected in: ${event.document.fileName}`);
        console.log(`[EventHandlers] Document URI scheme: ${event.document.uri.scheme}`);
        console.log(`[EventHandlers] Content changes count: ${event.contentChanges.length}`);

        // Filter out non-relevant document changes
        if (!this.isRelevantDocumentChange(event.document)) {
            console.log('[EventHandlers] Document change filtered out as non-relevant');
            return;
        }

        // Reset timer on ANY change in relevant documents (even tiny changes)
        console.log('[EventHandlers] Any text change detected - resetting timer');
        this.alarmManager.handleCodeChange();
    }

    /**
     * Handle editor selection change events
     */
    private handleEditorSelectionChange(event: vscode.TextEditorSelectionChangeEvent): void {
        // Only treat as user activity if it's a manual selection change
        if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse ||
            event.kind === vscode.TextEditorSelectionChangeKind.Keyboard) {
            console.log('[EventHandlers] User selection change detected');
            this.alarmManager.handleUserActivity();
        }
    }

    /**
     * Handle terminal focus change events
     */
    private handleTerminalFocusChange(terminal: vscode.Terminal | undefined): void {
        if (terminal) {
            console.log(`[EventHandlers] Terminal focus change detected - Terminal: ${terminal.name}`);
            this.alarmManager.handleTerminalFocus();
        } else {
            console.log('[EventHandlers] Terminal focus lost (no active terminal)');
        }
    }

    /**
     * Filter document changes to exclude non-relevant changes
     */
    private isRelevantDocumentChange(document: vscode.TextDocument): boolean {
        console.log(`[EventHandlers] Checking relevance for: ${document.fileName}`);
        console.log(`[EventHandlers] URI scheme: ${document.uri.scheme}`);

        // Exclude output channels and special documents
        if (document.uri.scheme !== 'file') {
            console.log(`[EventHandlers] Excluded due to URI scheme: ${document.uri.scheme}`);
            return false;
        }

        // Exclude certain file types
        const fileName = document.fileName.toLowerCase();
        const excludePatterns = [
            '.git',
            'node_modules',
            '.vscode',
            'package-lock.json',
            '.log'
        ];

        const excludedPattern = excludePatterns.find(pattern => fileName.includes(pattern));
        if (excludedPattern) {
            console.log(`[EventHandlers] Excluded due to pattern: ${excludedPattern}`);
            return false;
        }

        // Include code files
        const codeExtensions = [
            '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.cs',
            '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala', '.html',
            '.css', '.scss', '.less', '.vue', '.svelte', '.md', '.json', '.xml'
        ];

        const matchingExtension = codeExtensions.find(ext => fileName.endsWith(ext));
        if (matchingExtension) {
            console.log(`[EventHandlers] Included due to extension: ${matchingExtension}`);
            return true;
        } else {
            console.log(`[EventHandlers] Excluded - no matching extension found`);
            return false;
        }
    }

    /**
     * Dispose all event listeners
     */
    public dispose(): void {
        Object.values(this.disposables).forEach(disposable => {
            if (disposable) {
                disposable.dispose();
            }
        });

        // Reset disposables
        this.disposables = {
            textDocumentChange: null,
            editorSelectionChange: null,
            terminalFocusChange: null,
            configurationChange: null
        };
    }
}
