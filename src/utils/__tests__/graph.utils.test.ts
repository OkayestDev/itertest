import { generateGraph } from "../graph.utils";
import * as fsUtils from "../fs.utils";
import fs from "fs";

describe("graph.utils", () => {
    it("should generate graph", () => {
        const TEST_NAME = "jest-graph-test";
        const testDir = fsUtils.initializeTest(TEST_NAME);
        fsUtils.incrementTest(
            TEST_NAME,
            `${__dirname}/../../__tests__/__fixtures__/json-schema-1.json`,
        );
        fsUtils.incrementTest(
            TEST_NAME,
            `${__dirname}/../../__tests__/__fixtures__/json-schema-2.json`,
        );
        const htmlFilePath = generateGraph(TEST_NAME, {}) as string;
        expect(htmlFilePath).toBeDefined();
        expect(fs.existsSync(htmlFilePath)).toBe(true);
        fs.rmSync(testDir, { recursive: true, force: true });
    });
});
