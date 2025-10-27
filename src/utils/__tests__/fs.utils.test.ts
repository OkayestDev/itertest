import * as fsUtils from "../fs.utils";
import * as fs from "fs";

describe("fs.utils", () => {
    beforeAll(() => {
        fsUtils.conditionallyInitializeTestDir();
    });

    describe("initializeTest", () => {
        it("should create a new test directory", () => {
            const testName = "test";
            const testPath = fsUtils.initializeTest(testName);
            expect(fs.existsSync(fsUtils.createTestDirPath(testName))).toBe(true);
            expect(testPath).toBe(fsUtils.createTestDirPath(testName));
            fs.rmdirSync(fsUtils.createTestDirPath(testName));
        });
    });

    describe("incrementTest", () => {
        it("should increment the test iteration", () => {
            const testName = "test";
            const testPath = fsUtils.initializeTest(testName);
            const iterationPath = fsUtils.incrementTest(testName, testPath);
            expect(iterationPath).toBe(`${fsUtils.createTestDirPath(testName)}/iteration-1.json`);
            fs.rmSync(fsUtils.createTestDirPath(testName), {
                recursive: true,
                force: true,
            });
        });
    });
});
