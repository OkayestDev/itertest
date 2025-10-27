import * as fs from "fs";
import { TEST_DIR } from "../constants";

export const createTestDir = (testName: string) => `${TEST_DIR}/${testName}`;

export function conditionallyInitializeTestDir() {
    if (!fs.existsSync(TEST_DIR)) {
        fs.mkdirSync(TEST_DIR);
    }
}

export function initializeTest(testName: string): string {
    const testDir = createTestDir(testName);
    if (fs.existsSync(testDir)) {
        throw new Error(`Test ${testName} already exists`);
    }

    fs.mkdirSync(testDir);
    return testDir;
}

export function listTests() {
    return fs.readdirSync(TEST_DIR).map((test) => test.replace(TEST_DIR, ""));
}

export function listTestIterations(testName: string) {
    const testDir = createTestDir(testName);
    return fs.readdirSync(testDir);
}

export function incrementTest(testName: string, jsonFilePath: string): string {
    const testDir = createTestDir(testName);
    const testIterations = listTestIterations(testName);
    const nextIteration = testIterations.length + 1;
    const newIterationFile = `${testDir}/iteration-${nextIteration}`;
    fs.writeFileSync(newIterationFile, jsonFilePath);
    return newIterationFile;
}
