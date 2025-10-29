import { Command } from "commander";
import * as fsUtils from "../utils/fs.utils";
import { Commands } from "../constants/enums";
import { generateController } from "./generate.command";
import { requiredConfigRead } from "../utils/config.utils";

export function add(program: Command) {
    return program
        .command(`${Commands.Add} <jsonFilePath>`)
        .description("Iterate test with json schema")
        .action((jsonFilePath) => {
            const config = requiredConfigRead();
            fsUtils.incrementTest(config.selectedTest, jsonFilePath);
            generateController();
        });
}
