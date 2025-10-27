import { generateGraph } from "../graph.utils";
import * as fsUtils from "../fs.utils";
import fs from "fs";

describe("graph.utils", () => {
    it("should generate graph", () => {
        const TEST_NAME = "jest-graph-test";
        fsUtils.initializeTest(TEST_NAME);
        const htmlFilePath = generateGraph(TEST_NAME);
        expect(htmlFilePath).toBeDefined();
        expect(fs.existsSync(htmlFilePath)).toBe(true);
        fs.unlinkSync(htmlFilePath);
    });
});
