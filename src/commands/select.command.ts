import { Command } from "commander";
import { initializeTest, listTests, writeConfig } from "../utils/fs.utils";
import path from "path";
import fs from "fs";
import { Commands } from "../constants/enums";

function resolveCustomConfigFile(customConfigFile?: string) {
    if (customConfigFile) {
        if (!fs.existsSync(customConfigFile)) {
            throw new Error(`Custom config file "${customConfigFile}" not found`);
        }
        return path.resolve(customConfigFile);
    }
    return undefined;
}

function initializeOrSelectTest(name: string) {
    const tests = listTests();
    if (!tests.includes(name)) {
        console.log(`Test "${name}" initialized`);
        initializeTest(name);
    } else {
        console.log(`Test "${name}" selected`);
    }
}

function selectController(name: string, customConfigFile?: string) {
    initializeOrSelectTest(name);
    const resolvedCustomConfigFile = resolveCustomConfigFile(customConfigFile);
    writeConfig({ testName: name, customConfigFile: resolvedCustomConfigFile });
    console.log(
        `Begin iterative testing by running \`itertest ${Commands.Add} ${name} <path-to-json-file>\``,
    );
}

export function select(program: Command) {
    return program
        .command("select <name> [customConfigFile]")
        .description("select or initialize a new iterative test")
        .action(selectController);
}
