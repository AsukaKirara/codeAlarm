/**
 * Test suite index for Smart AI Generation Alert Extension
 * Sets up Mocha and runs tests
 */

import * as path from 'path';
import * as fs from 'fs';

// Use require for Mocha to avoid TypeScript issues
const Mocha = require('mocha');

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'bdd',
        color: true,
        timeout: 10000,
        reporter: 'spec'
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((c, e) => {
        try {
            // Find test files manually
            const testFiles = findTestFiles(testsRoot);

            // Add files to the test suite
            testFiles.forEach((f: string) => mocha.addFile(f));

            // Run the mocha test
            mocha.run((failures: number) => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        } catch (err) {
            console.error(err);
            e(err);
        }
    });
}

function findTestFiles(dir: string): string[] {
    const files: string[] = [];

    function searchDir(currentDir: string) {
        try {
            const items = fs.readdirSync(currentDir);

            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    searchDir(fullPath);
                } else if (item.endsWith('.test.js')) {
                    files.push(fullPath);
                }
            }
        } catch (err) {
            // Ignore errors reading directories
        }
    }

    searchDir(dir);
    return files;
}
