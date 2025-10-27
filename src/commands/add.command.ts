import { Command } from "commander";
import * as fsUtils from "../utils/fs.utils";
import { Commands } from "../constants/enums";
import { PROGRAM_NAME } from "../constants/constants";
import { generateController } from "./generate.command";

export function add(program: Command) {
    return program
        .command(`${Commands.Add} <jsonFilePath>`)
        .description("Iterate test with json schema")
        .action((jsonFilePath) => {
            const config = fsUtils.readConfig();

            if (!config.testName) {
                throw new Error(
                    `Test name is not set. Initiate/select a test with \`${PROGRAM_NAME} ${Commands.Select} <test-name>\``,
                );
            }

            fsUtils.incrementTest(config.testName, jsonFilePath);
            generateController();
        });
}
