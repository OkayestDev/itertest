import * as fs from "fs";
import { CONFIG_FILE, TEST_DIR } from "../constants/constants";
import { Config } from "../types/config";
import path from "path";

export const createTestDirPath = (testName: string): string => `${TEST_DIR}/${testName}`;

export function conditionallyInitializeTestDir() {
    if (!fs.existsSync(TEST_DIR)) {
        fs.mkdirSync(TEST_DIR);
    }
}

export function initializeTest(testName: string): string {
    const testDir = createTestDirPath(testName);
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
    }
    return testDir;
}

export function listTests() {
    return fs.readdirSync(TEST_DIR).map((test) => test.replace(TEST_DIR, ""));
}

export function listTestIterations(testName: string) {
    const testDir = createTestDirPath(testName);
    const iterationFiles = fs.readdirSync(testDir);
    return iterationFiles
        .map((file) => path.join(testDir, file))
        .filter((i) => i.endsWith(".json"));
}

export function incrementTest(testName: string, jsonFilePath: string): string {
    const testDir = createTestDirPath(testName);
    const testIterations = listTestIterations(testName);
    const nextIteration = testIterations.length + 1;
    const newIterationFile = `${testDir}/iteration-${nextIteration}.json`;
    const content = fs.readFileSync(jsonFilePath, "utf-8");
    fs.writeFileSync(newIterationFile, content);
    return newIterationFile;
}

export function readConfig(): Partial<Config> {
    try {
        const config = fs.readFileSync(CONFIG_FILE, "utf-8");
        return JSON.parse(config);
    } catch {
        return {};
    }
}

export function writeConfig(config: Config) {
    const currentConfig = readConfig();
    const mergedConfig = {
        ...currentConfig,
        ...config,
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(mergedConfig, null, 4));
}

export function writeTestResults(testName: string, html: string): string {
    const testDir = createTestDirPath(testName);
    const resultFilePath = `${testDir}/result.html`;
    fs.writeFileSync(resultFilePath, html);
    return resultFilePath;
}
