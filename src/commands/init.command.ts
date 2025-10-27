import { Command } from "commander";
import { initializeTest } from "../utils/fs.utils";

export function init(program: Command) {
    return program
        .command("init <name>")
        .description("Initialize a new iterative test")
        .action((name: string) => {
            initializeTest(name);
            console.log(`Test ${name} initialized`);
            console.log(
                `Begin iterative testing by running \`itertest run ${name} <path-to-json-file>\``,
            );
        });
}
