import { program } from "../cli";
import * as fsUtils from "../utils/fs.utils";
import * as fs from "fs";
import jsonFixture1 from "./__fixtures__/json-schema-1.json";
import jsonFixture2 from "./__fixtures__/json-schema-2.json";

const TEST_NAME = "itertest-test";

describe("cli", () => {
    beforeAll(() => {
        fsUtils.conditionallyInitializeTestDir();
    });

    afterEach(() => {
        fs.rmSync(fsUtils.createTestDirPath(TEST_NAME), {
            recursive: true,
            force: true,
        });
    });

    describe("select", () => {
        it("should initialize a new test", () => {
            program.parse(["node", "itertest", "select", TEST_NAME]);
            expect(fs.existsSync(fsUtils.createTestDirPath(TEST_NAME))).toBe(true);
        });

        it("should update config if test exists", () => {
            program.parse(["node", "itertest", "select", TEST_NAME]);
            let config = fsUtils.readConfig();
            expect(config.testName).toBe(TEST_NAME);
            program.parse(["node", "itertest", "select", "test-2"]);
            config = fsUtils.readConfig();
            expect(config.testName).toBe("test-2");
            program.parse(["node", "itertest", "select", TEST_NAME]);
            config = fsUtils.readConfig();
            expect(config.testName).toBe(TEST_NAME);
            fs.rmdirSync(fsUtils.createTestDirPath("test-2"));
        });
    });

    describe("config", () => {
        it("should print current config", () => {
            program.parse(["node", "itertest", "select", TEST_NAME]);
            const logSpy = jest.spyOn(console, "log");
            program.parse(["node", "itertest", "config"]);
            expect(logSpy).toHaveBeenCalledWith(
                JSON.stringify(
                    {
                        testName: TEST_NAME,
                    },
                    null,
                    4,
                ),
            );
        });
    });

    describe("add", () => {
        it("should iterate json file added", () => {
            program.parse(["node", "itertest", "select", TEST_NAME]);
            program.parse([
                "node",
                "itertest",
                "add",
                `${__dirname}/__fixtures__/json-schema-1.json`,
            ]);
            expect(fs.existsSync(`${fsUtils.createTestDirPath(TEST_NAME)}/iteration-1.json`)).toBe(
                true,
            );
            expect(
                JSON.parse(
                    fs.readFileSync(
                        `${fsUtils.createTestDirPath(TEST_NAME)}/iteration-1.json`,
                        "utf-8",
                    ),
                ),
            ).toEqual(jsonFixture1);
            program.parse([
                "node",
                "itertest",
                "add",
                `${__dirname}/__fixtures__/json-schema-2.json`,
            ]);
            expect(fs.existsSync(`${fsUtils.createTestDirPath(TEST_NAME)}/iteration-2.json`)).toBe(
                true,
            );
            expect(
                JSON.parse(
                    fs.readFileSync(
                        `${fsUtils.createTestDirPath(TEST_NAME)}/iteration-2.json`,
                        "utf-8",
                    ),
                ),
            ).toEqual(jsonFixture2);
        });
    });

    describe("generate", () => {
        it("generates graphs from iterations", () => {
            program.parse([
                "node",
                "itertest",
                "select",
                TEST_NAME,
                `${__dirname}/__fixtures__/custom-config.ts`,
            ]);
            program.parse([
                "node",
                "itertest",
                "add",
                `${__dirname}/__fixtures__/json-schema-1.json`,
            ]);
            program.parse([
                "node",
                "itertest",
                "add",
                `${__dirname}/__fixtures__/json-schema-2.json`,
            ]);
            program.parse(["node", "itertest", "generate"]);
            expect(fs.existsSync(`${fsUtils.createTestDirPath(TEST_NAME)}/result.html`)).toBe(true);
        });
    });
});
