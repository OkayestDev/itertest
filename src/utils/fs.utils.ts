import * as fs from "fs";
import { CONFIG_FILE, TEST_DIR } from "../constants/constants";
import { Config } from "../types/config.type";
import path from "path";
import { peek } from "./array.utils";

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

const isDir = (parentDir: string) => (dirPath: string) => {
    const stats = fs.statSync(path.join(parentDir, dirPath));
    return stats.isDirectory();
};

export function listTests() {
    return fs
        .readdirSync(TEST_DIR)
        .filter(isDir(TEST_DIR))
        .map((test) => test.replace(TEST_DIR, ""));
}

export function getIterationIndex(filePath: string) {
    if (!filePath) {
        return 0;
    }
    const match = filePath.match(/iteration-(\d+)\.json$/);
    return match ? parseInt(match[1], 10) : 0;
}

export function listTestIterations(testName: string) {
    const testDir = createTestDirPath(testName);
    const iterationFiles = fs.readdirSync(testDir);
    const iterations = iterationFiles
        .map((file) => path.join(testDir, file))
        .filter((i) => i.endsWith(".json"));
    const sortedIterations = iterations
        .map((filePath) => {
            const index = getIterationIndex(filePath);
            return { filePath, index };
        })
        .sort((a, b) => a.index - b.index)
        .map(({ filePath }) => filePath);

    return sortedIterations;
}

export function incrementTest(testName: string, jsonFilePath: string): string {
    const testDir = createTestDirPath(testName);
    const testIterations = listTestIterations(testName);
    const nextIteration = getIterationIndex(peek(testIterations)) + 1;
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
