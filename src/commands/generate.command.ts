import { Command } from "commander";
import { Commands } from "../constants/enums";

export function generateController() {}

export function generate(program: Command) {
    return program
        .command(Commands.Generate)
        .description("Generate test results")
        .action(generateController);
}
