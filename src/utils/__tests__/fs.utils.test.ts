import * as fsUtils from "../fs.utils";
import * as fs from "fs";

describe("fs.utils", () => {
    beforeAll(() => {
        fsUtils.conditionallyInitializeTestDir();
    });

    describe("initializeTest", () => {
        it("should create a new test directory", () => {
            const testName = "test";
            fsUtils.initializeTest(testName);
            expect(fs.existsSync(fsUtils.createTestDir(testName))).toBe(true);

            fs.unlinkSync(fsUtils.createTestDir(testName));
        });
    });
});
