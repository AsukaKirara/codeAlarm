/**
 * Test runner for Smart AI Generation Alert Extension
 * Sets up the test environment and runs all test suites
 */

import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to test runner
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        // Download VS Code, unzip it and run the integration test
        await runTests({ 
            extensionDevelopmentPath, 
            extensionTestsPath,
            launchArgs: [
                '--disable-extensions', // Disable other extensions during testing
                '--disable-workspace-trust' // Disable workspace trust dialog
            ]
        });
    } catch (err) {
        console.error('Failed to run tests:', err);
        process.exit(1);
    }
}

main();
