import { Command } from "commander";

export function run(program: Command) {
    return program
        .command("run <jsonFilePath>")
        .description("Iterate test with json schema")
        .action((jsonFilePath) => {});
}
