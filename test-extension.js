#!/usr/bin/env node

/**
 * Simple test runner script for Smart AI Generation Alert Extension
 * Provides easy commands for testing the extension
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commands = {
    help: () => {
        console.log(`
🧪 Smart AI Generation Alert Extension - Test Runner

Available commands:
  help          Show this help message
  install       Install all dependencies
  compile       Compile TypeScript files
  test          Run all automated tests
  watch         Start development mode with file watching
  clean         Clean compiled files
  full          Run full test cycle (install + compile + test)

Usage:
  node test-extension.js <command>
  
Examples:
  node test-extension.js install
  node test-extension.js test
  node test-extension.js full
        `);
    },

    install: () => {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully!');
    },

    compile: () => {
        console.log('🔨 Compiling TypeScript...');
        execSync('npm run compile', { stdio: 'inherit' });
        console.log('✅ Compilation completed!');
    },

    test: () => {
        console.log('🧪 Running tests...');
        try {
            execSync('npm test', { stdio: 'inherit' });
            console.log('✅ All tests passed!');
        } catch (error) {
            console.log('❌ Some tests failed. Check output above for details.');
            process.exit(1);
        }
    },

    watch: () => {
        console.log('👀 Starting development mode...');
        console.log('Press Ctrl+C to stop watching');
        execSync('npm run watch', { stdio: 'inherit' });
    },

    clean: () => {
        console.log('🧹 Cleaning compiled files...');
        const outDir = path.join(__dirname, 'out');
        if (fs.existsSync(outDir)) {
            fs.rmSync(outDir, { recursive: true, force: true });
            console.log('✅ Cleaned out/ directory');
        } else {
            console.log('ℹ️  No compiled files to clean');
        }
    },

    full: () => {
        console.log('🚀 Running full test cycle...\n');
        commands.install();
        console.log('');
        commands.compile();
        console.log('');
        commands.test();
        console.log('\n🎉 Full test cycle completed successfully!');
    }
};

// Parse command line arguments
const command = process.argv[2] || 'help';

if (commands[command]) {
    try {
        commands[command]();
    } catch (error) {
        console.error(`❌ Error executing command '${command}':`, error.message);
        process.exit(1);
    }
} else {
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "node test-extension.js help" for available commands');
    process.exit(1);
}
