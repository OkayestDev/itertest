import * as fsUtils from "../fs.utils";
import * as fs from "fs";

const TEST_NAME = "test";

describe("fs.utils", () => {
    beforeAll(() => {
        fsUtils.conditionallyInitializeTestDir();
    });

    afterEach(() => {
        fs.rmSync(fsUtils.createTestDirPath(TEST_NAME), { recursive: true });
    });

    describe("initializeTest", () => {
        it("should create a new test directory", () => {
            const testPath = fsUtils.initializeTest(TEST_NAME);
            expect(fs.existsSync(fsUtils.createTestDirPath(TEST_NAME))).toBe(true);
            expect(testPath).toBe(fsUtils.createTestDirPath(TEST_NAME));
        });
    });

    describe("incrementTest", () => {
        it("should increment the test iteration", () => {
            fsUtils.initializeTest(TEST_NAME);
            const iterationPath = fsUtils.incrementTest(
                TEST_NAME,
                `${__dirname}/../../__tests__/__fixtures__/json-schema-1.json`,
            );
            expect(iterationPath).toBe(`${fsUtils.createTestDirPath(TEST_NAME)}/iteration-1.json`);
        });
    });
});
