/**
 * Simple test to verify the testing framework works
 */

import * as assert from 'assert';

suite('Simple Test Suite', () => {
    test('Basic assertion test', () => {
        assert.strictEqual(1 + 1, 2, 'Basic math should work');
    });

    test('String test', () => {
        assert.strictEqual('hello'.toUpperCase(), 'HELLO', 'String methods should work');
    });

    test('Array test', () => {
        const arr = [1, 2, 3];
        assert.strictEqual(arr.length, 3, 'Array length should be correct');
    });
});
