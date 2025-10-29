import { Command } from "commander";
import { Commands } from "../constants/enums";
import { PROGRAM_NAME } from "../constants/constants";
import { generateGraph } from "../utils/graph.utils";
import * as fsUtils from "../utils/fs.utils";

export function generateController() {
    const config = fsUtils.readConfig();
    if (!config.selectedTest) {
        throw new Error(
            `Test name is not set. Initiate/select a test with \`${PROGRAM_NAME} ${Commands.Select} <test-name>\``,
        );
    }
    const resultFilePath = generateGraph(config.selectedTest, config);
    console.log(`Test results generated at \`${resultFilePath}\``);
}

export function generate(program: Command) {
    return program
        .command(Commands.Generate)
        .description("Generate test results")
        .action(generateController);
}
